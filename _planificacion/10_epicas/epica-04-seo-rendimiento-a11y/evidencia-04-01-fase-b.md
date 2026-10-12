# Evidencia 04-01 · Fase B (desarrollador)

- **Iteración:** 04-01 · SEO técnico y datos estructurados
- **Responsable:** desarrollador (el agente no hace push ni prueba en redes)
- **Estado:** Pendiente (se completa después del push de la fase A)

**Cómo leer la tabla.** El agente anota cada resultado recién cuando el desarrollador lo entrega. Los criterios de la fase B de `iteracion-04-01-seo-tecnico.md` no se marcan antes.

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

| Paso | Comprobación | Resultado | Evidencia | Fecha |
| :--- | :----------- | :-------- | :-------- | :---- |
| 2 | `robots.txt` responde `200` con el texto esperado | | | |
| 3 | `sitemap-index.xml` responde `200` | | | |
| 4 | JSON-LD válido en Schema.org | | | |
| 5 | Prueba de resultados enriquecidos de Google | | | |
| 6 | Vista previa en WhatsApp | | | |
| 7 | Vista previa en LinkedIn | | | |
