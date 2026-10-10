# Iteración 04-01 · SEO técnico y datos estructurados

- **Épica:** 04 · SEO, rendimiento y accesibilidad
- **Estado:** Pendiente
- **Rama:** `main` (RDA-015)
- **Depende de:** 03-01
- **RDA relacionadas:** RDA-007
- **Hallazgos que cierra:** AUD-01-016 y AUD-01-017 (parte), AUD-01-018

## Objetivo

Completar la información que Google y las redes necesitan para entender y mostrar la página.

## Tareas

1. Revisar `CabeceraSEO`: título, descripción y `canonical` de la portada (la 404 con `noindex`); Open Graph con URL absolutas, `og:image:alt`, `og:locale`; Twitter Card `summary_large_image` si hay imagen adecuada.
2. Imagen de vista previa de 1200 × 630 px, liviana, que el desarrollador entrega o aprueba, sin deformar ni recolorear el logotipo.
3. JSON-LD de `Organization` (nombre, URL, logotipo y `sameAs` con LinkedIn si existe), sin datos no respaldados. Sin `AggregateRating` ni `Review`.
4. `robots.txt` con el sitemap, y el sitemap generado verificado con la portada.
5. Conjunto de íconos derivado del logotipo oficial: favicon, 32 y 192 px y `apple-touch-icon`.

## Criterios de aceptación

- [ ] La portada de `dist/` tiene título, descripción y `canonical` absolutos; la 404 no se indexa.
- [ ] El JSON-LD valida en Schema.org y en la prueba de resultados enriquecidos (evidencia del desarrollador).
- [ ] La vista previa al compartir en WhatsApp y LinkedIn se ve bien (captura del desarrollador).
- [ ] `robots.txt` y `sitemap-index.xml` accesibles.
- [ ] SEO 100 en Lighthouse.
- [ ] Bitácora 04-01 creada.

## Fuera de alcance

- Campañas, backlinks y posicionamiento por palabras clave.

## Datos requeridos del desarrollador

- Imagen de vista previa o aprobación de la propuesta.
