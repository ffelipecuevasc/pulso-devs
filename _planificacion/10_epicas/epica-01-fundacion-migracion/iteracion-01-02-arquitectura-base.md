# Iteración 01-02 · Arquitectura base, layout y datos de la comunidad

- **Épica:** 01 · Fundación y migración a Astro
- **Estado:** Pendiente
- **Rama:** `main` (RDA-015)
- **Depende de:** 01-01
- **RDA relacionadas:** RDA-006, RDA-007, RDA-008
- **Hallazgos que cierra:** AUD-01-008, AUD-01-016 y AUD-01-017 (parte)

## Objetivo

Establecer la estructura de carpetas, el layout único del sitio y la fuente única de datos de la comunidad.

## Tareas

1. Crear `src/components/`, `src/layouts/`, `src/data/`, `src/scripts/` y `src/assets/` con archivos reales (Git no versiona carpetas vacías).
2. Crear `src/data/comunidad.js` con: nombre, eslogan, URL del sitio, enlace del grupo de WhatsApp (https://chat.whatsapp.com/JejECSvdP4fDCAMh43Ohzs), fundador (nombre y https://felipecuevas.dev), redes sociales (LinkedIn de la comunidad: `https://www.linkedin.com/company/comunidad-pulso-devs/home/`, tomado de `COMMUNITY.linkedin` de `_prototipo/assets/js/config.js`), clave de tema `pulsodevs-theme`, ítems de navegación, temáticas de talleres y áreas, **con los textos idénticos a los del prototipo**. Usar `PENDIENTE_DATO` donde falte información. No incluir datos de formulario ni de fundador más allá del nombre y el enlace.
3. Crear `src/layouts/LayoutBase.astro` con `lang="es"`, `color-scheme: light dark`, el script en línea que aplica el tema antes de pintar (equivalente al del prototipo) y slots para `head` y contenido.
4. Crear `src/components/CabeceraSEO.astro` con título, descripción, `canonical`, Open Graph y Twitter Card con **URL absolutas** generadas desde `site`. El JSON-LD se completa en 04-01.
5. Crear `src/pages/404.astro` en español, con el botón de volver al inicio y el del grupo de WhatsApp.
6. Reemplazar `index.astro` por el layout con las secciones vacías ancladas actuales (`#inicio`, `#comunidad`, `#encontraras`, `#talleres`, `#vision`, `#unete`), cada una con su `h2` (el `h1` va en el hero).
7. Calcular el año del pie en compilación.
8. Agregar una integración mínima en `astro.config.mjs` (con aprobación del desarrollador) que haga fallar `pnpm build` si queda `PENDIENTE_DATO` en los archivos publicados.

## Criterios de aceptación

- [ ] Ningún componente contiene el enlace de WhatsApp ni el del fundador escritos en duro.
- [ ] `pnpm build` genera `index.html` y `404.html`.
- [ ] El HTML resultante tiene `lang="es"`, un único `h1`, `canonical` absoluto y `og:url` y `og:image` absolutos, sin marcadores `[SITE_URL]`.
- [ ] La compilación falla, nombrando el archivo, si se introduce `PENDIENTE_DATO` a propósito, y pasa al quitarlo.
- [ ] Bitácora 01-02 creada.

## Fuera de alcance

- Estilos definitivos (01-03) y componentes de interfaz (01-04).

## Datos requeridos del desarrollador

- Ninguno: el enlace de WhatsApp, el del fundador y el LinkedIn de la comunidad están en el prototipo.
