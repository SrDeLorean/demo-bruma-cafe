import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const buildPath = new URL('../../dist/', import.meta.url);
const indexPath = new URL('index.html', buildPath);
const html = existsSync(indexPath) ? readFileSync(indexPath, 'utf8') : '';
const text = (value) => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

describe('S2 — contratos del HTML construido', () => {
  it('presenta un único h1 con el nombre y una propuesta que ofrece café y repostería', () => {
    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
    expect(headings).toHaveLength(1);
    expect(text(headings[0][1])).toBe('Bruma Café');
    const proposal = html.match(/<p\b[^>]*id="propuesta"[^>]*>([\s\S]*?)<\/p>/i);
    expect(proposal, 'La propuesta debe existir en el HTML estático').not.toBeNull();
    expect(text(proposal[1])).toMatch(/caf[eé]/i);
    expect(text(proposal[1])).toMatch(/reposter[ií]a/i);
  });

  it('identifica el proyecto ficticio y el idioma en el HTML sin depender del cliente', () => {
    expect(html).toMatch(/<html\b[^>]*lang="es"/i);
    expect(text(html)).toContain('proyecto de portafolio; cafetería ficticia');
    expect(html).toMatch(/<meta\b[^>]*charset="utf-8"/i);
  });

  it('ofrece Ver la carta hacia un destino enfocable con el pendiente DBC-2 explícito', () => {
    const link = html.match(/<a\b[^>]*href="#carta"[^>]*>([\s\S]*?)<\/a>/i);
    expect(link).not.toBeNull();
    expect(text(link[1])).toBe('Ver la carta');
    const section = html.match(/<section\b(?=[^>]*id="carta")(?=[^>]*tabindex="-1")[^>]*>([\s\S]*?)<\/section>/i);
    expect(section).not.toBeNull();
    expect(text(section[1])).toMatch(/carta.*pendiente/i);
    expect(text(section[1])).toContain('DBC-2');
  });

  it('excluye patrones de prueba social y datos de negocio real, incluso en metadatos', () => {
    const forbidden = [
      /\b(?:reseñas?|testimonios?|valoraciones?|valoración|clientes?)\b/gi,
      /aggregateRating|ratingValue|reviewCount|"review"|LocalBusiness/gi,
      /whatsapp|wa\.me|tel:|mailto:/gi,
      /\b(?:direcci[oó]n|calle|avenida|tel[eé]fono)\b/gi,
      /\+\d[\d\s()-]{7,}\d/g,
    ];
    for (const pattern of forbidden) {
      expect([...html.matchAll(pattern)], pattern.source).toHaveLength(0);
    }
  });
});

describe('S5 — distribución sin JavaScript de cliente', () => {
  it('no emite etiquetas script en ningún HTML de dist', () => {
    expect(existsSync(indexPath), 'Primero ejecutar npm run build').toBe(true);
    const htmlFiles = readdirSync(buildPath, { recursive: true, encoding: 'utf8' })
      .filter((path) => path.endsWith('.html'));
    expect(htmlFiles.length).toBeGreaterThan(0);
    for (const path of htmlFiles) {
      const output = readFileSync(join(fileURLToPath(buildPath), path), 'utf8');
      expect(output.match(/<script\b/gi) ?? [], path).toHaveLength(0);
    }
  });
});
