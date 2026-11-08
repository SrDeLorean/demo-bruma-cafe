import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Locator } from '@playwright/test';

async function expectVisibleFocus(locator: Locator, surface: Locator) {
  await expect(locator).toBeFocused();
  const outline = await locator.evaluate((element) => {
    const style = getComputedStyle(element);
    return { style: style.outlineStyle, width: parseFloat(style.outlineWidth), color: style.outlineColor };
  });
  expect(outline.style).toBe('solid');
  expect(outline.width).toBeGreaterThanOrEqual(2);
  expect(outline.color).not.toBe('rgba(0, 0, 0, 0)');
  const background = await surface.evaluate((element) => getComputedStyle(element).backgroundColor);
  const luminance = (color: string) => {
    const channels = color.match(/[\d.]+/g);
    if (!channels || channels.length < 3) throw new Error(`Color RGB no reconocido: ${color}`);
    const values = channels.slice(0, 3).map(Number).map((value) => {
      const normalized = value / 255;
      return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
    });
    return values[0]! * 0.2126 + values[1]! * 0.7152 + values[2]! * 0.0722;
  };
  const foregroundLuminance = luminance(outline.color);
  const backgroundLuminance = luminance(background);
  const contrast = (Math.max(foregroundLuminance, backgroundLuminance) + 0.05)
    / (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
  expect(contrast, 'El contorno debe contrastar al menos 3:1 con su superficie adyacente').toBeGreaterThanOrEqual(3);
}

test('S3/S5 — primera pantalla íntegra y recorrido de teclado hasta la carta', async ({ page, browser }, testInfo) => {
  console.log('NAVEGADOR', browser.version(), testInfo.project.name);
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  const name = page.getByRole('heading', { level: 1, name: 'Bruma Café', exact: true });
  const proposal = page.locator('#propuesta');
  const notice = page.getByText('Demo: proyecto de portafolio; cafetería ficticia.', { exact: true });
  const menuLink = page.getByRole('link', { name: 'Ver la carta', exact: true });
  await expect(proposal).toContainText(/café/i);
  await expect(proposal).toContainText(/repostería/i);
  for (const element of [name, proposal, notice, menuLink]) {
    await expect(element).toBeVisible();
    await expect(element).toBeInViewport({ ratio: 1 });
    const appearance = await element.evaluate((node) => {
      const style = getComputedStyle(node);
      return { fontSize: parseFloat(style.fontSize), opacity: style.opacity };
    });
    expect(appearance.fontSize).toBeGreaterThanOrEqual(16);
    expect(appearance.opacity).toBe('1');
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('primera-pantalla.png') });

  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Saltar al contenido', exact: true });
  await expectVisibleFocus(skip, page.locator('.demo-notice'));
  await expect(skip).toBeInViewport({ ratio: 1 });
  await page.screenshot({ path: testInfo.outputPath('foco-salto.png') });
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  await page.keyboard.press('Tab');
  await expectVisibleFocus(menuLink, page.locator('html'));
  await page.screenshot({ path: testInfo.outputPath('foco-carta.png') });
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#carta$/);
  const menu = page.locator('#carta');
  await expect(menu).toHaveAttribute('tabindex', '-1');
  await expect(menu).toBeVisible();
  await expect(menu).toBeInViewport({ ratio: 1 });
  await expect(menu).toBeFocused();
  await expect(menu).toContainText(/carta.*pendiente/i);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('destino-carta.png') });
});

test('S4 — axe sin serious/critical; registra todas las demás violaciones e incompletos', async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.javaScriptEnabled === false, 'axe necesita inyección; S5 prueba navegación sin JS por separado');
  await page.goto('/');
  const result = await new AxeBuilder({ page }).analyze();
  await testInfo.attach('axe-completo', {
    body: JSON.stringify(result, null, 2),
    contentType: 'application/json',
  });
  const summary = {
    viewport: testInfo.project.use.viewport,
    violations: result.violations.map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map(({ target }) => target) })),
    incomplete: result.incomplete.map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map(({ target }) => target) })),
  };
  console.log('AXE_RESULTADO', JSON.stringify(summary));
  expect(result.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical')).toEqual([]);
});
