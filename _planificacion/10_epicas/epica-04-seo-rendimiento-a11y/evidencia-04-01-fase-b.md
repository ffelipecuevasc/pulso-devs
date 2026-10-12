# Evidencia 04-01 · Fase B (desarrollador)

- **Iteración:** 04-01 · SEO técnico y datos estructurados
- **Responsable:** desarrollador (el agente no hace push ni prueba en redes)
- **Estado:** Completada (2026-10-12)
- **Fecha de los resultados:** 2026-10-12

**Cómo leer la tabla.** Todos los resultados son **declarados por el desarrollador** el 2026-10-12, con capturas revisadas por el desarrollador y su asistente. No son mediciones del agente: el agente no vio las capturas ni hizo peticiones a producción.

## Pasos

1. Hacer el commit y el push de la fase A a `main` y esperar a que Workers Builds termine de publicar.
2. Abrir `https://comunidadpulso.dev/robots.txt`: debe mostrar las líneas `User-agent: *`, `Allow: /` y `Sitemap: https://comunidadpulso.dev/sitemap-index.xml`.
3. Abrir `https://comunidadpulso.dev/sitemap-index.xml`: debe cargar y apuntar a `https://comunidadpulso.dev/sitemap-0.xml`.
4. En `https://validator.schema.org/`, pegar `https://comunidadpulso.dev/` y ejecutar la prueba: debe detectar un elemento `Organization` sin errores.
5. En la prueba de resultados enriquecidos de Google (`https://search.google.com/test/rich-results`), probar `https://comunidadpulso.dev/` y anotar qué detecta y si informa errores o advertencias.
6. Compartir `https://comunidadpulso.dev/` en un chat de WhatsApp y tomar una captura de la vista previa (imagen, título y descripción).
7. Pegar `https://comunidadpulso.dev/` en una publicación nueva de LinkedIn (sin publicarla, basta con que cargue la vista previa) y tomar una captura. Si LinkedIn muestra una vista previa antigua, se puede refrescar con su inspector de publicaciones (`https://www.linkedin.com/post-inspector/`).
8. Entregar los resultados y las capturas al agente.

## Resultados

| N.º | Comprobación | Resultado | Evidencia | Fecha |
| :-- | :----------- | :-------- | :-------- | :---- |
| 1 | `https://comunidadpulso.dev/robots.txt` | Responde y muestra exactamente «User-agent: *», «Allow: /» y «Sitemap: https://comunidadpulso.dev/sitemap-index.xml» | Captura; capturas revisadas por el desarrollador y su asistente | 2026-10-12 |
| 2 | `https://comunidadpulso.dev/sitemap-index.xml` | Responde; contiene un único `<sitemap>` con `https://comunidadpulso.dev/sitemap-0.xml` | Captura; capturas revisadas por el desarrollador y su asistente | 2026-10-12 |
| 3 | `validator.schema.org` sobre `https://comunidadpulso.dev/` | Un solo elemento, «Organization», con **0 errores y 0 advertencias**. Campos mostrados: `@type` Organization, `name` «Comunidad Pulso Devs», `url` `https://comunidadpulso.dev/`, `logo` `https://comunidadpulso.dev/icono-192.png`, `description` (la de `seo.descripcion`) y `sameAs` con el LinkedIn de la comunidad (`https://www.linkedin.com/company/comunidad-pulso-devs/home/`) | Captura; capturas revisadas por el desarrollador y su asistente | 2026-10-12 |
| 4 | Prueba de resultados enriquecidos de Google sobre `https://comunidadpulso.dev/` | «Rastreado correctamente el 12 oct 2026, 0:11:07» y el mensaje «No se ha detectado ningún elemento». **Interpretación aprobada por el desarrollador:** no es un fallo; esa herramienta solo muestra tipos que generan resultados visuales especiales en Google y `Organization` no es uno de ellos. **No es una validación de Google del JSON-LD:** solo indica que Google rastreó la página sin errores | Captura; capturas revisadas por el desarrollador y su asistente | 2026-10-12 |
| 5 | Vista previa en WhatsApp | Tarjeta grande con la imagen nueva (fondo oscuro, logotipo y «Pulso Devs»), título «Comunidad Pulso Devs», descripción «Una comunidad para desarrolladores junior que quieren aprender, construir y crecer juntos. Abierta a toda» y dominio `comunidadpulso.dev`. Se ve bien. **Observación:** en la pantalla del desarrollador la descripción se corta antes de «Latinoamérica»; el desarrollador decidió no ajustar `seo.descripcionOg` | Captura; capturas revisadas por el desarrollador y su asistente | 2026-10-12 |
| 6 | Vista previa en LinkedIn | Vista previa del **compositor de publicaciones** (no una publicación ya publicada): tarjeta compacta con la imagen nueva en miniatura, el título «Comunidad Pulso Devs» y el dominio `comunidadpulso.dev`. Se ve bien. No se comprobó cómo se ve una publicación ya publicada | Captura; capturas revisadas por el desarrollador y su asistente | 2026-10-12 |
| 7 | Ícono de la pestaña | Observado en una captura: en las capturas de `robots.txt` y del sitemap, la pestaña del navegador muestra el logotipo nuevo. **No se probó** el `apple-touch-icon` en un iPhone ni el ícono de 192 px en un teléfono | Captura; capturas revisadas por el desarrollador y su asistente | 2026-10-12 |
