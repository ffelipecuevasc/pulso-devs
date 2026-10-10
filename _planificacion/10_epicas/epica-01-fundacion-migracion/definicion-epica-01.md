# Épica 01 · Fundación y migración a Astro

- **Estado:** Pendiente
- **Hitos del desarrollador:** 1 (Astro) y 2 (Tailwind con compilación local)
- **Objetivo:** dejar el sitio actual migrado, sin cambios visibles, a un proyecto Astro 7 con Tailwind CSS 4 compilado localmente, PNPM y Node.js, desplegado en `https://comunidadpulso.dev` mediante Cloudflare Workers.

## Alcance

1. Proyecto Astro 7 con Tailwind 4, `astro-icon`, sitemap y Prettier, usando PNPM de forma estricta.
2. Documentación raíz (`README.md`, `AGENTS.md`, `DESIGN.md`, `LICENSE`), permisos de Claude Code y `_planificacion/`: **ya están en el repositorio** (commit `d60c55e`); la épica solo los mantiene al día.
3. Logotipos oficiales de tecnologías: los 29 SVG entregados en `assets/icons/` pasan a `src/icons/` con el prefijo `tec-` (01-03). **No se usan en las temáticas de talleres** (decisión del desarrollador, 2026-10-10).
4. Layout base, datos de la comunidad en `src/data/comunidad.js` y página 404.
5. Tokens de diseño en `@theme`, fuentes autoalojadas e íconos como SVG en línea.
6. Migración de la interfaz del prototipo a componentes Astro, **con paridad visual y de contenido**: lo que cambie de aspecto o de texto pertenece a las épicas 02 y 03. La referencia es el prototipo en el commit `d60c55e`.
7. Despliegue con Workers Builds, dominio `comunidadpulso.dev` y redirección de `www`.
8. Corrección de los hallazgos de la Auditoría 01 que son de migración (enlaces rotos, código muerto, Google Fonts, `.gitignore`).

## Iteraciones

| Iteración | Nombre                                                  |
| :-------- | :------------------------------------------------------ |
| 01-01     | Andamiaje del proyecto                                  |
| 01-02     | Arquitectura base, layout y datos de la comunidad       |
| 01-03     | Tailwind local, fuentes autoalojadas e íconos           |
| 01-04     | Header, tema, hero y pie de página                      |
| 01-05     | Secciones de contenido                                  |
| 01-06     | Despliegue en Cloudflare Workers y retiro del prototipo |

## Fuera de alcance

- Cambios estéticos, nueva fuente de lectura y cambios de texto (épicas 02 y 03).
- Páginas nuevas y navegación entre páginas (Épica 06, en evaluación).
- Medición con Web Analytics y Search Console (Épica 05).

## Criterio de término

- `pnpm build` genera `dist/` sin errores ni advertencias.
- El sitio migrado es equivalente al prototipo en aspecto y contenido, en 360 px y en escritorio, en modo claro y oscuro.
- No hay recursos de terceros en la carga (sin Google Fonts ni CDN).
- `https://comunidadpulso.dev` sirve el sitio migrado y `www` redirige al dominio principal.
- `_prototipo/` eliminado.

## Ejecución

Claude Code implementa **todas** las iteraciones, incluida la 01-01, con un solo prompt, pero **iteración por iteración**, directamente sobre `main` y sin ramas (RDA-015). Al final de cada una se detiene para que el desarrollador revise y haga commit y push. La iteración 01-06 tiene una parada obligatoria antes de la fase B, que despliega.
