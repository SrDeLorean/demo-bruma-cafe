# Bruma Café · Demo 2 de 3

Proyecto propio de portafolio: una web para una **cafetería ficticia**. No representa un cliente ni un negocio real.

**Estado: DBC-1 (HU-01), portada estática local.** Incluye propuesta ficticia, aviso de demo y acceso a una carta pendiente de DBC-2. Sin despliegue. Las secciones de contexto siguientes conservan el resumen inicial; el estado ejecutable de este incremento se describe aquí.

## Cómo ejecutar DBC-1

Requiere Node.js 24.20.0 o superior y npm (verificado con 11.19.0). Astro y las herramientas usan versiones exactas en `package.json` y `package-lock.json`.

```powershell
# Variables solo para esta sesión; cachés y navegador dentro del proyecto.
$env:ASTRO_TELEMETRY_DISABLED = '1'
$env:npm_config_cache = Join-Path $PWD '.astro/npm-cache'
$env:PLAYWRIGHT_BROWSERS_PATH = Join-Path $PWD '.astro/chromium'
npm ci
npx playwright install chromium
npm run dev
```

Abrir la URL local indicada por Astro. Para verificar el mismo build estático:

```powershell
npm run check
npm run build
npm test
npm run test:e2e
```

Vitest lee `dist/`. Playwright arranca `astro preview` en `127.0.0.1:4321`, lo cierra al terminar y requiere ese puerto libre. No reconstruye el sitio: ejecutar `build` antes de ambas suites. Comprueba 360×640 y 1280×800, con y sin JavaScript, teclado y axe; los contextos sin JS omiten únicamente la inyección de axe. Los resultados y capturas quedan en `test-results/` (ignorado). El umbral automatizado de axe es cero violaciones serious/critical; no sustituye una revisión completa de accesibilidad.

La salida publicable queda en `dist/`, ignorada por Git. Este incremento no distribuye JavaScript de cliente, fotografías, productos ni precios; `#carta` explica el pendiente de DBC-2. No incluye CI ni despliegue.

## Contexto vigente

El [informe técnico y contexto global en Confluence](https://xebaelvemgador-1793986210245.atlassian.net/wiki/spaces/DDS/pages/458753) es la fuente vigente para alcance, tecnología propuesta, decisiones, historias y aceptación. Versión inicial: **v0.1, 6 de noviembre de 2026**; primera versión de página: 1.

Este README es un resumen de entrada de esa versión, no una segunda especificación editable. Revisar la versión actual en Confluence antes de planificar; actualizar allí las decisiones y mantener aquí su referencia. Confluence requiere acceso a la cuenta autorizada.

## Qué buscamos resolver

Una persona debería poder entender qué ofrece la cafetería, consultar la carta y los precios, localizar horarios y ubicación y comprender cómo contactar desde su teléfono. La demo permitirá mostrar diseño, accesibilidad, contenido y validación técnica dentro del portafolio.

Son hipótesis iniciales derivadas del encargo. No se realizaron entrevistas, no existe demanda comercial validada y no hay métricas de un sitio implementado.

## Alcance propuesto

- Presentación, carta por categorías, fotografías con licencia comprobada y precios en CLP.
- Horarios y ubicación demostrativos identificados como ficticios.
- Contacto de demostración: sin mensajes reales ni números inventados como destinatarios.
- Navegación responsive, teclado, foco visible, contenido semántico y metadatos básicos.
- Contenido versionado que pueda actualizarse sin introducir un CMS.

Fuera de alcance: pagos, pedidos, delivery, reservas confirmadas, cuentas, backend, base de datos, panel administrativo, datos personales y analítica de seguimiento.

## Tecnología propuesta, todavía no instalada

| Área | Propuesta |
| --- | --- |
| Sitio | Astro con salida estática |
| Datos y lógica | TypeScript; JavaScript nativo solo donde aporte interacción |
| Presentación | HTML semántico y CSS propio |
| Contenido | Archivos tipados versionados e imágenes locales con procedencia |
| Ejecución | Node.js compatible con Astro y npm con lockfile al comenzar la implementación |
| Pruebas futuras | Vitest para lógica y Playwright para recorridos críticos |

Astro se propone por el predominio de contenido y la posibilidad de limitar JavaScript. No añadir React, backend u otros servicios sin una necesidad concreta. Se fijarán versiones y presupuestos de rendimiento al autorizar el primer incremento; aún no hay mediciones. Alternativa a revisar: HTML/CSS/JavaScript sin framework si el alcance final no requiere más estructura.

## Historias iniciales

El detalle y los criterios observables están en Confluence. Son backlog propuesto, no historias ya creadas en Jira ni órdenes de construcción.

| ID | Prioridad | Necesidad |
| --- | --- | --- |
| HU-01 | P0 | Entender la propuesta y llegar a la carta |
| HU-02 | P0 | Consultar productos, categorías y precios coherentes |
| HU-03 | P0 | Localizar horarios y ubicación sin confundir datos ficticios con reales |
| HU-04 | P0 | Explorar el contacto por WhatsApp sin enviar a un destinatario inventado |
| HU-05 | P0 | Usar el sitio desde móvil o teclado sin obstáculos |
| HU-06 | P1 | Reconocer la demo y evaluar su alcance y calidad |
| HU-07 | P1 | Actualizar el contenido desde datos versionados coherentes |

## Retomar con el sistema nuevo

1. Abrir esta carpeta como proyecto en T3 y leer [AGENTS.md](AGENTS.md), [coordination.config.json](coordination.config.json) y la versión vigente de Confluence.
2. Cargar las conexiones MCP del proveedor. GitHub reutiliza `../pulpo/src/github-mcp.mjs`: se necesita el coordinador privado como carpeta hermana `pulpo/`, sus dependencias y una sesión `gh` autorizada. No se incluye su código ni credenciales en esta demo pública.
3. Los alias `atlassian` y `atlassian_confluence` apuntan a Jira y Confluence respectivamente. Cada proveedor debe completar su autenticación; la configuración no inyecta herramientas automáticamente en este hilo.
4. Confirmar el contenedor Jira y el GitHub Project antes de crear o vincular trabajo. Sus campos permanecen en `null`; no elegir el primer resultado ni duplicar el backlog.
5. Preparar diseño, plan por pasos, revisión semántica y sondas. Esperar una nueva orden antes de construir la web.

La pausa ante correcciones es una regla de trabajo; no sustituye un sandbox ni acredita identidad del agente. Ante fallos, preparar el arreglo y esperar una orden vinculada al alcance y versión. Las ramas, commits de aplicación, subidas y despliegues requieren autorización aplicable.

## Verificación de este encargo

Solo corresponde revisar documentos, JSON/TOML, referencias y contenido del repositorio. No hay `package.json`, dependencias, código de aplicación, CI ejecutable ni resultados de pruebas funcionales.

Fuentes de la propuesta: [Astro](https://docs.astro.build/en/concepts/why-astro/), [TypeScript](https://docs.astro.build/en/guides/typescript/) y [pruebas](https://docs.astro.build/en/guides/testing/).
