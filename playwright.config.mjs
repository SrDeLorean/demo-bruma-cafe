import { defineConfig } from '@playwright/test';
import { resolve } from 'node:path';

// Local al proyecto: tanto la instalación como los tests usan esta carpeta ignorada.
process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('.astro/chromium');

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list'], ['json', { outputFile: 'test-results/resultados.json' }]],
  use: {
    baseURL: 'http://127.0.0.1:4321',
    browserName: 'chromium',
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4321',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: false,
    timeout: 30_000,
    gracefulShutdown: { signal: 'SIGTERM', timeout: 5_000 },
    env: { ASTRO_TELEMETRY_DISABLED: '1' },
  },
  projects: [
    { name: '360-con-js', use: { viewport: { width: 360, height: 640 }, javaScriptEnabled: true } },
    { name: '1280-con-js', use: { viewport: { width: 1280, height: 800 }, javaScriptEnabled: true } },
    { name: '360-sin-js', use: { viewport: { width: 360, height: 640 }, javaScriptEnabled: false } },
    { name: '1280-sin-js', use: { viewport: { width: 1280, height: 800 }, javaScriptEnabled: false } },
  ],
});
