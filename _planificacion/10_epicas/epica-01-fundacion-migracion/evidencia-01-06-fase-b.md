# Evidencia 01-06 · Fase B (desarrollador)

- **Iteración:** 01-06 · Despliegue en Cloudflare Workers y retiro del prototipo
- **Responsable:** desarrollador (el agente no toca Cloudflare, AGENTS.md §5)
- **Estado:** Fase B completada y verificada en producción tras el push de cierre (2026-10-11 00:21 UTC (tarde del 2026-10-10 en Chile)); queda que el desarrollador marque 01-06 como Terminada
- **Fecha de inicio:** 2026-10-10
- **Fecha de cierre de la evidencia:** 2026-10-10

> **Antes de empezar:** desde que Workers Builds quede conectado, **cada push a `main` publica en producción** (RDA-015). Haz el commit de la fase A, comprueba que `pnpm build` pasa sin errores y recién entonces conecta el repositorio.
>
> Las instrucciones de este documento están verificadas contra la documentación oficial de Cloudflare el 2026-10-10 (fuentes en la bitácora 01-06). Si la interfaz del panel cambió, la documentación manda.

**Cómo leer las marcas.** `[x]` solo si hay evidencia: el registro de compilación de Cloudflare (adjunto por el desarrollador), una petición de lectura hecha por el agente (`curl`, 2026-10-10 hacia las 19:43 UTC), una medición local o la confirmación escrita del desarrollador. Sin marca: no medido o no confirmado.

**Importante:** las mediciones contra producción se hicieron con el despliegue **actual** (commit anterior a los cambios de cierre). La 404 con estilos y el apagado de `workers.dev` aún no están publicados; se confirman después del push.

---

## Paso 1 · Crear el Worker y conectar el repositorio (tarea 5)

- [x] **Nombre del proyecto (Worker): `pulso-devs`.** El registro muestra `Uploaded pulso-devs` y la dirección `https://pulso-devs.felipe-cuevas.workers.dev`.
- [ ] **Production branch:** `main`. _Sin confirmar: el registro no muestra la rama._
- [x] **Root directory:** vacío. El registro compila en `/opt/buildhome/repo` (la raíz del repositorio) y lee `dist` de ahí.
- [x] **Build command:** `pnpm build` (`Executing user build command: pnpm build`).
- [x] **Deploy command:** `pnpm exec wrangler deploy` (`Executing user deploy command: pnpm exec wrangler deploy`), con `wrangler 4.149.0`, la versión de `package.json`.
- [ ] **Vistas previas desactivadas** (Settings → Build → Branch control → Enable Preview Builds). _Sin confirmar: el registro no lo muestra. Los avisos de `preview_urls` son otro asunto (ver más abajo)._

Evidencia: registro de compilación (ver «Registro de compilación»).

## Paso 2 · Fijar las versiones de PNPM y Node en Workers Builds (tarea 5)

- [ ] **`PNPM_VERSION` = `12.8.1`** en las variables de compilación. **Sin confirmar:** el desarrollador no confirmó si la definió. El registro dice `Detected the following tools from environment: pnpm@12.8.1, nodejs@24.21.0`, pero no indica si pnpm 12.8.1 vino de la variable o de `devEngines`.
- [x] Compilación revisada: instala con **pnpm 12.8.1** (`Downloading the pnpm 12.8.1 binary`, `Done in 8.1s using pnpm v12.8.1`), **Node 24.21.0** (`Installing nodejs 24.21.0`), `pnpm build` termina con `[build] Complete!` y el despliegue con `Success: Deploy command completed`.
- [x] Sin advertencias de scripts de instalación ignorados: el registro no muestra `ERR_PNPM_IGNORED_BUILDS` y ejecuta los `postinstall` de `esbuild` y `workerd`, ambos con `Done`.
- [x] Cómo instaló las dependencias Workers Builds: `pnpm install --frozen-lockfile`, con verificación del lockfile (`Lockfile passes supply-chain policies (460 entries)`). No falló con el lockfile.

## Paso 3 · Asociar el dominio y redirigir `www` (tarea 6)

- [x] **Dominio principal:** `https://comunidadpulso.dev/` responde `200` por HTTPS con el sitio (ver mediciones del paso 5).
- [x] **`www`:** `https://www.comunidadpulso.dev/` responde `301` con `Location: https://comunidadpulso.dev/` (`curl -I`). La regla la aplica Cloudflare; no se inspeccionó cómo está configurada (registro DNS ni Redirect Rule).
- [x] Sin conflicto con despliegues o registros previos: el desarrollador confirmó el 2026-10-09 que no había despliegue anterior y el dominio sirve el sitio sin errores.

## Paso 4 · Comprobar que solo `main` publica (tarea 7)

- [ ] **Branch control:** rama de producción `main` y vistas previas desactivadas. _Sin confirmar._
- [ ] El historial de despliegues del Worker muestra solo versiones salidas de `main`. _Sin confirmar._
- [ ] El repositorio sigue sin ramas distintas de `main` en GitHub. _Sin medir: `git ls-remote` falló desde esta máquina con `SSL certificate problem: unable to get local issuer certificate`. La rama local es `main`._

## Paso 5 · Comprobar el sitio publicado (criterios de aceptación)

Mediciones del agente, solo lectura (`curl -I` y `curl -s`), 2026-10-10 hacia las 19:43 UTC, con el despliegue actual:

| Petición | Resultado |
| :------- | :-------- |
| `GET https://comunidadpulso.dev/` | `HTTP/1.1 200 OK`, `Content-Type: text/html`, título «Comunidad Pulso Devs · Desarrolladores junior de Latinoamérica» |
| `GET https://www.comunidadpulso.dev/` | `HTTP/1.1 301 Moved Permanently`, `Location: https://comunidadpulso.dev/` |
| `GET https://comunidadpulso.dev/ruta-que-no-existe` | `HTTP/1.1 404 Not Found`, cuerpo con `<title>Página no encontrada · Comunidad Pulso Devs</title>`, `<h1>` «Esta página no existe» y `<meta name="robots" content="noindex">` |
| `HEAD https://comunidadpulso.dev/index.html` | `307 Temporary Redirect`, `Location: /` |
| `HEAD https://comunidadpulso.dev/404.html` | `307 Temporary Redirect`, `Location: /404` |
| `HEAD https://pulso-devs.felipe-cuevas.workers.dev/` | `200 OK` (todavía activa: el apagado llega con el push de cierre) |

Cabeceras de `public/_headers`, presentes en la respuesta de `/` **y** en la del 404:

| Cabecera | `/` | 404 |
| :------- | :-: | :-: |
| `x-content-type-options: nosniff` | sí | sí |
| `referrer-policy: strict-origin-when-cross-origin` | sí | sí |
| `x-frame-options: DENY` | sí | sí |
| `content-security-policy: frame-ancestors 'none'` | sí | sí |

- [x] `https://comunidadpulso.dev/` responde **`200`** por HTTPS y sirve el sitio migrado.
- [x] `https://www.comunidadpulso.dev/` responde **`301`** con `location: https://comunidadpulso.dev/`.
- [x] Una ruta inexistente responde **`404`** y sirve la página 404 propia (medido con el despliegue anterior, sin estilos; la versión con estilos se midió tras el push, ver «Verificación posterior al push»).
- [x] Las cuatro cabeceras de `public/_headers` llegan en la respuesta de `/`.
- [x] **Las mismas cuatro cabeceras llegan también en la respuesta 404.** La duda de la documentación queda resuelta: `_headers` sí se aplica a la 404 estática.
- [x] `/index.html` y `/404.html` con `html_handling: auto-trailing-slash`: ambos responden `307` a `/` y a `/404`, respectivamente.
- [x] El sitio abre en un **teléfono real**, en modo claro y oscuro: **confirmado por el desarrollador**. Reportó «pequeñas observaciones de diseño en la versión móvil» que quiere mejorar; no las entregó todavía y no se suponen (van a la lista de ajustes de 02-02).

## Paso 6 · Retiro del prototipo (tarea 8)

- [x] El desarrollador aprobó por escrito la eliminación de `_prototipo/` (cierre de 01-06, 2026-10-10).
- [x] Antes de borrar: ninguna referencia a `_prototipo/` leía archivos desde `src/`, `astro.config.mjs`, `package.json` ni `public/` (solo había comentarios en `src/` y la entrada `exclude` de `tsconfig.json`). Los 29 `tec-*.svg` y los 3 PNG de `src/assets/img/` son idénticos (SHA-256) a los originales del prototipo.
- [x] `_prototipo/` eliminada con `git rm -r` (el árbol de trabajo ya no la tiene; la eliminación queda en el commit del desarrollador). Quitada la referencia en `.prettierignore` y en `tsconfig.json`.
- [x] `README.md` sin menciones al prototipo (búsqueda con `grep -i prototipo`: 0 coincidencias).
- [x] `AGENTS.md` sin menciones al prototipo. _Quedaba una en §3 «Tipografía»; se reescribió con aprobación el 2026-10-10 y `grep -i prototipo` sobre `AGENTS.md`, `DESIGN.md`, `README.md` y `src/` da 0 coincidencias._
- [ ] Marcar 01-06 como `Terminada`: lo hace el desarrollador tras su commit y la verificación posterior al push.

---

## Verificación posterior al push (2026-10-11 00:21 UTC (tarde del 2026-10-10 en Chile))

Solo lectura, con `curl`:

- [x] `GET https://comunidadpulso.dev/ruta-que-no-existe` responde `404`; el HTML trae `.pagina-404`, `.pagina-404__acciones` y `.pagina-404__nota`, y enlaza `/_astro/LayoutBase.DF2RJESO.css`, que responde `200 text/css` y contiene esas reglas.
- [x] `https://comunidadpulso.dev/` sigue respondiendo `200`.
- [x] `https://pulso-devs.felipe-cuevas.workers.dev/` **dejó de servir el sitio**: `404 Not Found`, `text/plain`, cuerpo `error code: 1042`.
- No medido: captura visual de la 404 en producción (se midió el HTML y el CSS publicados; la verificación visual fue sobre `dist/404.html` antes del push).

## Cambios de cierre (medidos localmente antes del push)

Estos cambios están en el árbol de trabajo y no en producción:

1. **404 con estilos** (`src/pages/404.astro`, `src/styles/global.css`). Medido localmente sobre `dist/404.html` con Chrome headless (154), servido con estado 404 para una ruta inexistente. Capturas en la carpeta temporal de la sesión del agente, fuera del repositorio.

   | Medición | Resultado |
   | :------- | :-------- |
   | Desbordamiento horizontal (`scrollWidth` − `clientWidth`) | 0 px a 320, 360, 768, 1280 y 1536 px, en claro y oscuro |
   | Tema real | `data-theme` resolvió `light` y `dark` según `prefers-color-scheme` |
   | Alto de botones | 50 px (mínimo exigido: 44 px) |
   | Ancho de botones a 360 px | 320 px los dos (ancho completo, el texto de WhatsApp se parte en dos líneas sin desbordar) |
   | Un solo `h1`; `lang="es"`; `noindex` | sí |
   | Pie al final con contenido corto (ventanas de 1280 × 1400 y 360 × 1600) | `footer.bottom` = alto de la ventana (1400 y 1600) |
   | Foco por teclado en el botón de WhatsApp (360 px) | `outline: 3px solid`; `rgb(0, 150, 199)` en claro y `rgb(93, 201, 255)` en oscuro; `:focus-visible` verdadero |
   | Sin recursos de terceros en `dist/` | 0 coincidencias de Google Fonts, `gstatic`, CDN de Tailwind u otros CDN |

   Se verificó a 360 y 1280 px en claro y oscuro con capturas (más 320, 768 y 1536). La verificación visual de la 404 **en producción** queda para después del push.
2. **`wrangler.jsonc`:** `"workers_dev": false` y `"preview_urls": false`. Tras el próximo despliegue, `https://pulso-devs.felipe-cuevas.workers.dev` dejará de responder; se confirma con `curl -I` después del push.

---

## Registro de compilación (Workers Builds)

Primer despliegue, 2026-10-10 entre las 18:29:57 y las 18:30:43 UTC, resumido del registro que adjuntó el desarrollador:

| Dato | Valor en el registro |
| :--- | :------------------- |
| Herramientas detectadas | `pnpm@12.8.1`, `nodejs@24.21.0` |
| Instalación | `pnpm install --frozen-lockfile` (331 paquetes), `Done in 8.1s using pnpm v12.8.1` |
| `postinstall` | `esbuild` y `workerd`: `Done` |
| Compilación | `astro build`: 2 páginas (`/404.html` y `/index.html`), `[build] Complete!`, `Success: Build command completed` |
| Despliegue | `pnpm exec wrangler deploy` con `wrangler 4.149.0`; `Read 32 files from the assets directory`; `Found 29 new or modified static assets`; `Success! Uploaded 29 files` |
| Versión | `Current Version ID: 2368560b-8da4-4238-b369-4c8d01439616` |
| Dirección | `https://pulso-devs.felipe-cuevas.workers.dev` |
| Resultado final | `Success! Build completed.` |

### Avisos de `workers_dev` y `preview_urls`

El registro trae dos avisos (no errores):

- `Because 'workers_dev' is not in your Wrangler file, it will be enabled for this deployment by default.` Se resuelve con `workers_dev = false`.
- `Because your 'workers.dev' route is enabled and your 'preview_urls' setting is not in your Wrangler file, Preview URLs will be enabled for this deployment by default.` Se resuelve con `preview_urls = false`.

Queda confirmada la causa: `wrangler.jsonc` no definía ninguno de los dos campos, como se suponía. **Resuelto en el cierre** (decisión B del desarrollador): `wrangler.jsonc` los declara en `false`. Fuente de la sintaxis: documentación de configuración de Wrangler, <https://developers.cloudflare.com/workers/wrangler/configuration/> (`"workers_dev": false` en JSON/JSONC; por defecto es `true` si no hay `route` ni `routes`), y el esquema que instala el propio paquete (`node_modules/wrangler/config-schema.json`, ambos tipo `boolean`; `preview_urls` por defecto `false`). La página de configuración no muestra un ejemplo JSONC de `preview_urls`; se usa la misma forma que `workers_dev` y la valida el esquema.

---

## Resultado

- **Estado final:** fase B completada. Sitio publicado en `https://comunidadpulso.dev` (200), `www` redirige (301), 404 propia con las cuatro cabeceras de seguridad, teléfono confirmado por el desarrollador. Quedan sin confirmar: rama de producción y vistas previas en Branch control, `PNPM_VERSION`, la mención restante de `AGENTS.md` y, tras el push, la 404 con estilos en producción y el apagado de `workers.dev`.
- **Fecha de término:** pendiente de la verificación posterior al push (la fija el desarrollador).
- **Problemas encontrados y cómo se resolvieron:**
  - La 404 desplegada era HTML plano sin estilos (vacío de planificación, el prototipo no tenía 404): corregida con el diseño sobrio de `.pagina-404`, pendiente de publicar.
  - `workers.dev` y las vistas previas quedaron activas por defecto: declarados en `false`, pendiente de publicar.
  - `git ls-remote` falla desde esta máquina por el certificado SSL (`unable to get local issuer certificate`); no afecta al sitio.
