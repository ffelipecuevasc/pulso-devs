# Iteración 01-01 · Andamiaje del proyecto

- **Épica:** 01 · Fundación y migración a Astro
- **Estado:** Pendiente (la implementa Claude Code)
- **Rama:** `main` (RDA-015)
- **Depende de:** —
- **RDA relacionadas:** RDA-001, RDA-002, RDA-003, RDA-005, RDA-012, RDA-013
- **Hallazgos que cierra:** AUD-01-011, AUD-01-019

## Objetivo

Crear el proyecto Astro 7 en el repositorio existente, con el stack definido y la documentación en su lugar, dejando el sitio actual intacto en `_prototipo/`.

## Tareas

1. Mover `index.html` y `assets/` (incluidas `assets/icons/`, con los 29 logotipos oficiales) a `_prototipo/` (RDA-013).. El prototipo de referencia es el del commit `d60c55e`.
2. `pnpm init`; fijar PNPM 12.8.1 en `devEngines.packageManager` (`onFail: download`); definir `type: module`, `engines`, `license: MIT` y los scripts de `AGENTS.md` §4. No usar el campo `packageManager` ni Corepack.
3. Instalar `astro`, `tailwindcss`, `@tailwindcss/vite`, `@astrojs/sitemap`, `astro-icon`, `@iconify-json/material-symbols-light` y, como dependencias de desarrollo, `prettier`, `prettier-plugin-astro`, `prettier-plugin-tailwindcss`, `@astrojs/check` y `typescript@6` (no 7: `astro check` aún no lo soporta). Verificar la compatibilidad de `astro-icon` con Astro 7.
4. Declarar en `pnpm-workspace.yaml` (`allowBuilds`) los scripts de instalación necesarios (por ejemplo `esbuild`).
5. Agregar `astro.config.mjs` (con `site: 'https://comunidadpulso.dev'`, el plugin de Tailwind, el sitemap y `astro-icon`), `tsconfig.json`, `.nvmrc` (24), `.prettierrc.json`, `.prettierignore` (incluye `_prototipo/`, `_planificacion/` y `dist/`), `src/styles/global.css` inicial y `src/pages/index.astro` inicial.
6. Reemplazar `.gitignore`: quitar lo obsoleto (`_site/`, `scripts/stage-site.mjs`, Cloudflare Pages) y agregar `dist/`, `.astro/`, `.wrangler/`, `.env*` y `.dev.vars` (`node_modules/` ya está).
7. ~~Copiar `README.md`, `AGENTS.md`, `DESIGN.md`, `LICENSE`, `.claude/settings.json` y `_planificacion/`~~: ya están en el repositorio (commit `d60c55e`).

## Criterios de aceptación

- [ ] `pnpm dev` muestra la página inicial en `http://localhost:4321`.
- [ ] `pnpm build` termina sin errores y genera `sitemap-index.xml`.
- [ ] `pnpm format:check` y `pnpm check` pasan.
- [ ] `package.json` fija PNPM 12.8.1 en `devEngines.packageManager`, no contiene el campo `packageManager` y no existe `package-lock.json` ni `yarn.lock`.
- [ ] `_prototipo/index.html` abre en el navegador igual que antes.
- [ ] `.gitignore` sin entradas obsoletas e incluye `dist/`, `.astro/`, `.wrangler/`, `.env*` y `.dev.vars`.

## Fuera de alcance

- Diseño, componentes y contenido.

## Datos requeridos del desarrollador

- Ninguno.
