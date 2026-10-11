# Iteración 01-06 · Despliegue en Cloudflare Workers y retiro del prototipo

- **Épica:** 01 · Fundación y migración a Astro
- **Estado:** En revisión (fases A y B hechas; falta el push de cierre y su verificación posterior)
- **Rama:** `main` (RDA-015)
- **Depende de:** 01-05
- **RDA relacionadas:** RDA-001, RDA-008, RDA-013
- **Hallazgos que cierra:** —

## Objetivo

Publicar el sitio migrado en `https://comunidadpulso.dev` con Workers Builds conectado a GitHub, redirigir `www` y retirar el prototipo.

## Tareas

**Fase A (agente):**

1. Preparar `wrangler.jsonc` (nombre del Worker, `compatibility_date`, `assets.directory` apuntando a `./dist` y manejo del 404 con la página `404.html`). Verificar la sintaxis vigente en la documentación de Cloudflare.
2. Preparar `public/_headers` con cabeceras básicas de seguridad (`X-Content-Type-Options`, `Referrer-Policy` y protección contra enmarcado). Verificar que Workers las entregue.
3. Si el desarrollador lo aprueba, agregar `wrangler` como dependencia de desarrollo para usarlo con `pnpm exec`. Nunca `npx`.
4. Dejar documentados en el `README.md` (con aprobación) los comandos de compilación y despliegue.

**Fase B (desarrollador; el agente no toca Cloudflare):**

5. Conectar el repositorio de GitHub con Workers Builds: comando de compilación `pnpm build` y comando de despliegue con `pnpm exec wrangler …`. Registrar cómo se fija la versión de PNPM (variable de entorno o `devEngines`).
6. Asociar el dominio `comunidadpulso.dev` al Worker y crear la redirección de `www.comunidadpulso.dev` a `comunidadpulso.dev`.
7. Confirmar que Workers Builds publica solo desde `main` y que no hay ramas ni vistas previas (RDA-015).
8. Con el sitio publicado y verificado, aprobar la eliminación de `_prototipo/` (los logotipos ya están copiados en `src/icons/` desde 01-03).

Evidencia de la fase B en `evidencia-01-06-fase-b.md`.

## Criterios de aceptación

- [x] `https://comunidadpulso.dev` responde `200` y sirve el sitio migrado por HTTPS.
- [x] `https://www.comunidadpulso.dev` redirige (`301`) a `https://comunidadpulso.dev`.
- [x] Una ruta inexistente muestra la página 404 propia. _Medido con el despliegue actual; la versión con estilos se verifica tras el push._
- [x] El registro de compilación en Cloudflare usa PNPM y la versión fijada, sin errores. _`PNPM_VERSION`: sin confirmar._
- [x] Las cabeceras de `_headers` llegan en la respuesta (`curl -I`). _En `/` y en la 404._
- [x] El desarrollador confirma el sitio en un teléfono real, en claro y oscuro. _Con observaciones de diseño móvil por entregar (02-02)._
- [x] `_prototipo/` eliminado, y `AGENTS.md` y `README.md` sin menciones al prototipo (con aprobación). _Medido con búsqueda el 2026-10-10: 0 menciones en `AGENTS.md`, `DESIGN.md`, `README.md` ni `src/`._

## Fuera de alcance

- Web Analytics y Search Console (Épica 05).

## Datos requeridos del desarrollador

- Ninguno: `comunidadpulso.dev` no tiene despliegue previo (confirmado el 2026-10-09), así que este es el primer despliegue.
