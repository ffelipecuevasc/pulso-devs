# Iteración 04-01 · SEO técnico y datos estructurados

- **Épica:** 04 · SEO, rendimiento y accesibilidad
- **Estado:** Terminada (2026-10-12)
- **Rama:** `main` (RDA-015)
- **Depende de:** 04-00
- **RDA relacionadas:** RDA-007, RDA-009, RDA-011
- **Hallazgos que cierra:** AUD-01-014 (imagen de vista previa), AUD-01-016, AUD-01-017 (salvo lo asignado a 05-01), AUD-01-018

## Objetivo

Completar la información que Google y las redes necesitan para entender y mostrar la página.

## Decisiones del desarrollador (2026-10-11)

1. La imagen de vista previa de 1200 × 630 px se hace en esta iteración (antes figuraba en 04-02 según AUD-01-014).
2. La política `Content-Security-Policy` completa **no** va aquí: pasa a 05-01.
3. LinkedIn es la única red de la comunidad (03-02 `Descartada`).

## Tareas

1. Revisar `CabeceraSEO`: título, descripción y `canonical` absolutos de la portada (la 404 con `noindex`); Open Graph con URL absolutas, `og:image` con ancho y alto, `og:image:alt` y `og:locale`; Twitter Card `summary_large_image` con la imagen nueva. Los textos salen de `src/data/comunidad.js`; cualquier texto visible o de metadatos nuevo se aprueba con `AskUserQuestion`.
2. **Imagen de vista previa** de 1200 × 630 px, liviana (objetivo: menos de 100 KB), con el logotipo oficial sin deformar ni recolorear. Se propone con `AskUserQuestion` (captura o composición) y se usa solo con la aprobación del desarrollador, o se usa la que él entregue.
3. JSON-LD de `Organization`: nombre, URL, logotipo y `sameAs` con el LinkedIn de `comunidad.js`. Sin `AggregateRating`, `Review` ni datos no respaldados; el fundador no aparece (RDA-009).
4. `robots.txt` con la URL del sitemap, y el sitemap generado verificado: solo la portada, sin la 404. Si se crea `public/robots.txt`, proponer el texto exacto para la línea de `public/` de `README.md` (pendiente de `registro-log.md` §4); se edita solo con aprobación.
5. Conjunto de íconos derivado del logotipo oficial, sin deformarlo: favicon (SVG o ICO), PNG de 32 y 192 px y `apple-touch-icon` de 180 px. Si el logotipo no se lee a 32 px, preguntar antes de simplificarlo.

## Criterios de aceptación

- [x] La portada de `dist/` tiene título, descripción y `canonical` absolutos; la 404 tiene `noindex` y no está en el sitemap.
- [x] Open Graph y Twitter Card completos, con URL absolutas y la imagen nueva (`og:image:width` 1200 y `og:image:height` 630), medido en el HTML compilado.
- [x] La imagen de vista previa pesa menos de 100 KB y fue aprobada por el desarrollador. _Medido: 25.676 B; composición A aprobada con `AskUserQuestion`._
- [x] El JSON-LD valida en Schema.org (0 errores y 0 advertencias) y Google rastrea la página sin errores; la prueba de resultados enriquecidos no detecta elementos porque Organization no es un tipo que esa herramienta muestre (evidencia del desarrollador). _Criterio reformulado por decisión del desarrollador (2026-10-12); la redacción original está en la bitácora 04-01. Declarado por el desarrollador, 2026-10-12 (evidencia de la fase B, puntos 3 y 4)._
- [x] La vista previa al compartir en WhatsApp y LinkedIn se ve bien (captura del desarrollador). _Declarado por el desarrollador, 2026-10-12 (puntos 5 y 6): en WhatsApp la descripción se corta antes de «Latinoamérica» en su pantalla; en LinkedIn es la vista previa del compositor, no una publicación ya publicada._
- [x] `robots.txt` y `sitemap-index.xml` responden `200` en producción tras el push (verificación de solo lectura). _Declarado por el desarrollador, 2026-10-12 (puntos 1 y 2): ambos responden y muestran el contenido esperado en el navegador; el agente no midió el código de estado._
- [x] Los íconos de 32, 192 y 180 px y el favicon existen en `dist/` y están enlazados en el `<head>`.
- [x] SEO 100 en Lighthouse (mediana de tres, móvil). _Medido en `pnpm preview`: 100, 100 y 100._
- [x] Sin desbordes a 320, 360 y 1280 px, claro y oscuro; `pnpm check` y `pnpm build` sin errores; sin `PENDIENTE_DATO`.
- [x] Bitácora 04-01 creada.

Los tres criterios de la fase B se marcaron el 2026-10-12 con los resultados declarados por el desarrollador (`evidencia-04-01-fase-b.md`); no son mediciones del agente.

## Fuera de alcance

- Campañas, backlinks y posicionamiento por palabras clave.
- Política `Content-Security-Policy` completa (05-01).
- Search Console y Web Analytics (05-01).

## Datos requeridos del desarrollador

- Imagen de vista previa o aprobación de la propuesta.
- Capturas de la vista previa en WhatsApp y LinkedIn, y la evidencia de validación del JSON-LD (fase de verificación tras el push).