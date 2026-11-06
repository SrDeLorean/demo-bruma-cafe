# Bruma Café · Demo 2 de 3

Proyecto propio de portafolio: una web para una **cafetería ficticia**. No representa un cliente ni un negocio real.

**Estado: repositorio y contexto inicial preparados. La aplicación todavía no está construida.** Este encargo no incluye instalar dependencias, generar una aplicación, ejecutar pruebas funcionales ni desplegarla.

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
