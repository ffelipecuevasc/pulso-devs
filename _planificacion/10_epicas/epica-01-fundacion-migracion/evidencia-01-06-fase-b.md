# Evidencia 01-06 · Fase B (desarrollador)

- **Iteración:** 01-06 · Despliegue en Cloudflare Workers y retiro del prototipo
- **Responsable:** desarrollador (el agente no toca Cloudflare, AGENTS.md §5)
- **Estado:** En curso (compilación y primer despliegue en `workers.dev` correctos; dominio, `www`, cabeceras, 404 y teléfono pendientes)
- **Fecha de inicio:** 2026-10-10

> **Antes de empezar:** desde que Workers Builds quede conectado, **cada push a `main` publica en producción** (RDA-015). Haz el commit de la fase A, comprueba que `pnpm build` pasa sin errores y recién entonces conecta el repositorio.
>
> Las instrucciones de este documento están verificadas contra la documentación oficial de Cloudflare el 2026-10-10 (fuentes en la bitácora 01-06). Si la interfaz del panel cambió, la documentación manda.

---

## Paso 1 · Crear el Worker y conectar el repositorio (tarea 5)

Panel de Cloudflare → **Workers & Pages** → **Create application** → **Import a repository** (Workers Builds) → conectar GitHub y elegir `ffelipecuevasc/pulso-devs`.

- [x] **Nombre del proyecto (Worker): `pulso-devs`.** Debe coincidir exactamente con `name` de `wrangler.jsonc`. Si no coincide, la compilación falla. _La compilación terminó bien y la dirección es `pulso-devs.felipe-cuevas.workers.dev`, con el nombre esperado._
- [ ] **Production branch:** `main` (es el valor por defecto). _Sin confirmar: no consta en lo informado._
- [ ] **Root directory:** vacío (la raíz del repositorio). _Sin confirmar._
- [ ] **Build command:** `pnpm build` _(la compilación corrió bien; el comando configurado no está transcrito)._
- [ ] **Deploy command:** `pnpm exec wrangler deploy` (reemplaza el valor por defecto `npx wrangler deploy`; `npx` está prohibido en este proyecto). Workers Builds usa la versión de `wrangler` que está en `package.json` (4.x). _El despliegue terminó bien, pero el comando configurado y la versión de Wrangler no están transcritos: sin confirmar._
- [ ] **Preview command / vistas previas:** en **Settings → Build → Branch control**, desmarcar **Enable Preview Builds**. No hay ramas ni vistas previas (RDA-015); así ningún push a otra rama dispara una compilación. _Sin confirmar. Ver el aviso de `preview_urls` más abajo._

Evidencia: _captura o texto de la configuración de Build (sin tokens)._

## Paso 2 · Fijar las versiones de PNPM y Node en Workers Builds (tarea 5)

La imagen de compilación trae por defecto **pnpm 10.11.1** y **Node.js 24.18.0**. El proyecto necesita **PNPM 12.8.1** (`allowBuilds` en `pnpm-workspace.yaml` y `devEngines` en `package.json`).

La documentación de Workers Builds (página «Build image») solo describe estas dos formas de fijar versiones:

| Qué | Cómo |
| :-- | :-- |
| **PNPM** | Variable de compilación `PNPM_VERSION`. |
| **Node.js** | Variable `NODE_VERSION` o archivo `.nvmrc` / `.node-version` en la raíz. El repositorio ya tiene `.nvmrc` (`24`), así que Node queda fijado sin hacer nada. |

La documentación **no** menciona `devEngines` ni el campo `packageManager`, así que no se puede dar por hecho que Workers Builds los respete.

- [ ] En **Settings → Build → Build variables and secrets**, agregar la variable **`PNPM_VERSION` = `12.8.1`** (visible, no es secreta). Es el mismo valor de `devEngines.packageManager.version`: si cambias uno, cambia el otro. _**Pendiente de confirmar por el desarrollador** si la variable se definió. La compilación usó pnpm 12.8.1; con lo informado no se sabe si fue por la variable o porque Workers Builds respetó `devEngines`, así que sigue abierto._
- [x] Lanzar una compilación y revisar el registro. Debe mostrar, en este orden: instalación con **pnpm 12.8.1** (no 10.11.1), Node 24.x, `pnpm build` terminando con `Complete!` y el despliegue.
- [ ] Revisar en el registro que no aparezcan advertencias de scripts de instalación ignorados (`ERR_PNPM_IGNORED_BUILDS`): `esbuild` y `workerd` están permitidos en `allowBuilds`. _Sin confirmar: lo informado no dice si aparecieron o no._
- [x] Anotar cómo instaló las dependencias Workers Builds (la documentación no indica el comando de instalación; debe detectar `pnpm-lock.yaml`). Si no usa pnpm o falla con el lockfile, **detenerse** y avisar antes de cambiar nada. _Instaló con pnpm 12.8.1 y la compilación no falló con el lockfile. El comando exacto de instalación no está transcrito._

Evidencia: ver «Registro de avance» más abajo (versiones, `pnpm build` y despliegue, según lo informado por el desarrollador).

## Paso 3 · Asociar el dominio y redirigir `www` (tarea 6)

- [ ] **Dominio principal:** Worker `pulso-devs` → **Settings → Domains & Routes → Add → Custom Domain** → `comunidadpulso.dev`. Cloudflare crea el registro DNS y el certificado. El nombre no puede tener un registro CNAME previo.
- [ ] **`www`:** un Custom Domain exige el nombre exacto, así que `www` no llega al Worker. Para redirigir:
  1. Crear un registro DNS de `www` con proxy activado (nube naranja): `A` a `192.0.2.0` o `AAAA` a `100::` (direcciones de relleno; Cloudflare intercepta la petición).
  2. Crear una **Redirect Rule** de `https://www.comunidadpulso.dev/*` a `https://comunidadpulso.dev/${1}`, código **301**, conservando la ruta y la cadena de consulta.
- [ ] Comprobar que el dominio no tenga el despliegue de Pages ni registros antiguos que choquen (confirmado: no hay despliegue previo).

Evidencia: _resultado de `curl -I https://www.comunidadpulso.dev/`: `301` y `location: https://comunidadpulso.dev/`._

## Paso 4 · Comprobar que solo `main` publica (tarea 7)

- [ ] **Branch control:** rama de producción `main` y vistas previas desactivadas (paso 1).
- [ ] El historial de despliegues del Worker (**Deployments**) muestra solo versiones salidas de `main`.
- [ ] El repositorio sigue sin ramas distintas de `main` en GitHub.

Evidencia: _captura de Branch control y de Deployments._

## Paso 5 · Comprobar el sitio publicado (criterios de aceptación)

Ejecutar desde un terminal (reemplaza solo lo que haga falta):

```bash
curl -I https://comunidadpulso.dev/
curl -I https://www.comunidadpulso.dev/
curl -I https://comunidadpulso.dev/ruta-que-no-existe
```

- [ ] `https://comunidadpulso.dev/` responde **`200`** por HTTPS y sirve el sitio migrado.
- [ ] `https://www.comunidadpulso.dev/` responde **`301`** con `location: https://comunidadpulso.dev/`.
- [ ] Una ruta inexistente responde **`404`** y muestra la página 404 propia (no un cuerpo vacío).
- [ ] Las cabeceras de `public/_headers` llegan en la respuesta de `/`: `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin`, `x-frame-options: DENY` y `content-security-policy: frame-ancestors 'none'`.
- [ ] **Las mismas cabeceras llegan también en la respuesta 404.** La documentación de Cloudflare no aclara si `_headers` se aplica a la página 404; esto hay que medirlo. Si no llegan, anotarlo y avisar (no es motivo para bloquear).
- [ ] `https://comunidadpulso.dev/index.html` y `https://comunidadpulso.dev/404.html` se comportan como se espera con `html_handling: auto-trailing-slash` (anotar el código y el destino).
- [ ] El sitio abre en un **teléfono real**, en modo claro y oscuro, y el botón de WhatsApp abre el grupo.

Evidencia: _salida de cada `curl -I` y nota de la prueba en el teléfono._

## Paso 6 · Retiro del prototipo (tarea 8)

Solo con el sitio publicado y verificado:

- [ ] El desarrollador aprueba por escrito la eliminación de `_prototipo/`.
- [ ] Se elimina `_prototipo/` (los logotipos ya están copiados en `src/icons/` desde 01-03). Limpiar sus referencias en `.prettierignore` y en cualquier otro archivo.
- [ ] `AGENTS.md` y `README.md` sin menciones al prototipo (con aprobación; texto propuesto en la bitácora 01-06).
- [ ] Actualizar `registro-log.md` y marcar 01-06 como `Terminada`.

---

## Registro de avance (2026-10-10)

Primer despliegue de Workers Builds, informado por el desarrollador a partir del registro de compilación. **Las líneas literales del registro no están transcritas aquí**; lo que sigue resume lo informado, sin citar texto del log.

| Dato | Valor informado |
| :--- | :-------------- |
| Compilación y despliegue | Correctos |
| PNPM usado en la compilación | 12.8.1 (la versión fijada; la imagen trae 10.11.1 por defecto) |
| Node.js usado | 24.21.0 (resuelto desde `.nvmrc`, que dice `24`) |
| Archivos subidos | 29 |
| Dirección publicada | `https://pulso-devs.felipe-cuevas.workers.dev` (responde con el sitio, según el desarrollador) |
| Avisos | Dos: uno sobre `workers_dev` y otro sobre `preview_urls` |

### Avisos de `workers_dev` y `preview_urls`

El texto exacto de los avisos no está transcrito. Lo más probable es que se deban a que `wrangler.jsonc` no define ninguno de los dos campos (hoy solo tiene `name`, `compatibility_date` y `assets`), pero **eso es una hipótesis**: falta cotejarla con el registro y con la documentación de Wrangler. Son avisos, no errores. **No se modificó `wrangler.jsonc`**: definirlos de forma explícita queda como propuesta en `registro-log.md` §4, a decidir por el desarrollador antes de la fase de dominio. Hay que decidirlo con el criterio de RDA-015 (sin vistas previas) y de si la dirección `workers.dev` debe seguir activa una vez asociado `comunidadpulso.dev`.

### Lo que sigue sin demostrar

Dominio `comunidadpulso.dev`, redirección de `www`, cabeceras de `_headers` (también en la 404), página 404 propia, comportamiento de `index.html` y `404.html`, branch control y vistas previas, y la prueba en el teléfono. Los pasos 3 a 6 y las casillas del paso 5 siguen sin marcar. La respuesta correcta de `workers.dev` no sustituye las pruebas del dominio ni se marca como tal.

---

## Resultado

- **Estado final:** _por completar_
- **Fecha de término:** _por completar_
- **Problemas encontrados y cómo se resolvieron:** _por completar_
