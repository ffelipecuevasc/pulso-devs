# Bitácora 05-02 (ajuste) · Directivas heredadas, textos finales y diseño de la integración

- **Fecha:** 2026-10-13
- **Agente:** Claude Code (Sonnet 5.5)
- **Rama:** main
- **Estado final:** **Fase A completada; fase B pendiente** (no se escribió ni aplicó nada en el repositorio fuera de `_planificacion/`)

> **Por qué este archivo se llama distinto.** Ya existe `bitacora-05-02-2026-10-13.md`, entregada y commiteada, y las bitácoras no se editan después de entregadas (`_planificacion/README.md` §2.3). Este ajuste la **complementa**: lo que no menciona sigue valiendo tal como está allí (inventario de orígenes, fuentes, comparación de métodos A, B y C, prueba local de la política y límites de `_headers`). Donde esta bitácora difiere, **prevalece esta**: la integración de verificación es la versión 2 de la de allá (ver «Diseño de la integración»).

## Resumen

1. **Método C aprobado** por el desarrollador el 2026-10-13 (declarado por el desarrollador).
2. **Directivas heredadas de `default-src 'none'`:** no hay nada afectado. El sitio no tiene manifest, ni Service Workers, ni Web Workers, ni `<iframe>`, `<object>`, `<embed>`, medios ni formularios, ni `<link>` de `prefetch`, `modulepreload`, `mask-icon` o `alternate`. Todo lo que el navegador pidió (medido con Chrome por protocolo) lo gobiernan `img-src`, `font-src`, `style-src`, `script-src` y `connect-src`, que ya están en la política. Una prueba de control con un manifest **sintético** mostró que, **si** existiera un manifest, `default-src 'none'` lo bloquearía y `manifest-src 'self'` lo corregiría; como el sitio no lo tiene, **no se agrega**.
3. **Textos (a) y (b): no cambiaron** respecto de la propuesta anterior. Siguen pendientes de tu aprobación.
4. **Integración `verificarCsp`, versión 2:** más estricta que la primera (revisa todas las páginas de `dist/`, exige que exista una política y rechaza `'unsafe-inline'` y `'unsafe-eval'`) y con un mensaje de error que lista hashes esperados y encontrados. Probada en una copia fuera del repositorio; formateada con Prettier y revisada con `astro check` (0 errores, 0 advertencias).

## Estado de Git al empezar (paso 1)

`git status` salió **limpio**: `decisiones.md` y los archivos de 05-02 de la primera pasada ya están commiteados (último commit `153f7f6`). Nada quedó pendiente.

## Directivas heredadas (pasos 2 y 3)

**Cómo se midió.** (1) Lectura de `dist/index.html` y `dist/404.html` y, en producción, de las mismas páginas pedidas con `Accept: text/html` (2026-10-13, `GET`/`HEAD`). (2) Chrome 155.0.8059.40 por protocolo contra el HTML de producción servido desde una máquina local, con la política (a) en solo informe y aplicada (la 404 y la portada, con desplazamiento hasta el final para cargar las imágenes diferidas), registrando **todas** las peticiones (`Network.requestWillBeSent`) y leyendo la consola. (3) Lectura del script de Cloudflare (`beacon.min.js`, 31.679 B, descargado con `GET` desde `static.cloudflareinsights.com`) para ver qué puede pedir. (4) `Page.getAppManifest` y `navigator.serviceWorker.getRegistrations()` en cada página. (5) Control sintético con un `<link rel="manifest">` y un manifest de prueba **inventado para el ensayo** (no es del sitio).

### Lo que existe en el sitio (resultado en la política propuesta)

| Recurso | Dónde | Directiva que lo gobierna | Resultado con la política (a) y (b) | Respaldo |
| :------ | :---- | :------------------------ | :---------------------------------- | :------- |
| `<link rel="icon">` ×3 (`favicon.ico`, `icono-32.png`, `icono-192.png`) | portada y 404 | `img-src` | **Permitido** (`'self'`) | Chrome pidió `/icono-32.png` (tipo `Other`): 0 violaciones |
| `<link rel="apple-touch-icon">` | portada y 404 | `img-src` | **Permitido** (`'self'`) | Chrome no lo pide; lo piden Safari e iOS (no probado). Es del propio dominio, así que la política lo cubre |
| `<link rel="preload" as="font" crossorigin>` ×2 | portada y 404 | `font-src` | **Permitido** (`'self'`) | 2 peticiones `Font GET`, 0 violaciones |
| `<link rel="stylesheet">` ×1 | portada y 404 | `style-src` | **Permitido** (`'self'`) | 1 petición `Stylesheet GET`, 0 violaciones |
| `<link rel="canonical">` | solo portada | ninguna | No es una carga; no se pide | 0 peticiones |
| `<img>` y `<source srcset>` (AVIF, WebP, PNG; `<picture>`) | portada y 404 | `img-src` | **Permitido** (`'self'`) | 3 `Image GET` en la portada y 2 en la 404 (con desplazamiento al final), 0 violaciones |
| Script del beacon de Cloudflare | portada y 404 (inyectado) | `script-src` | **Permitido** (host `https://static.cloudflareinsights.com`) | 1 `Script GET`, 0 violaciones |
| `POST /cdn-cgi/rum` (XHR o `sendBeacon`) | portada y 404 | `connect-src` | **Permitido** (`'self'`) | 1 `XHR POST` al mismo origen, 0 violaciones. En el script del beacon hay 3 `sendBeacon` y 1 `XMLHttpRequest` y ningún `fetch`, `Worker`, `serviceWorker`, `createElement` ni `eval` (**leído del código, no ejecutado en producción**): la ruta por defecto es relativa (`/cdn-cgi/rum?…`) y solo cae en `https://cloudflareinsights.com/cdn-cgi/rum` si `window.__cfBeacon.version` no está definida; la etiqueta inyectada hoy sí define `version`, así que debería ir al mismo origen. **A confirmar en producción** |
| `<style>` en línea ×2 (`@font-face`) | portada y 404 | `style-src` | **Permitido** (2 hashes) | Tabla de estilos de la bitácora anterior; 0 violaciones |
| `<script>` en línea ×4 | portada (4) y 404 (3) | `script-src` | **Permitido** (4 hashes) | Tabla de scripts de la bitácora anterior; 0 violaciones |

### Lo que **no** existe (verificado como ausente)

| Recurso | Búsqueda | Directiva que lo gobernaría | Con `default-src 'none'` |
| :------ | :------- | :-------------------------- | :----------------------- |
| `<link rel="manifest">` y archivo de manifest | 0 en `dist/` (portada y 404), 0 en producción; no hay `.webmanifest` ni `manifest.json` en `public/` ni en `dist/`; `/manifest.webmanifest`, `/site.webmanifest` y `/manifest.json` en producción responden `404`; `Page.getAppManifest` devuelve «ninguno» en las dos páginas | `manifest-src` | **Bloquearía** (hereda `default-src 'none'`) |
| `<link rel="prefetch">`, `modulepreload`, `mask-icon`, `alternate`, `preconnect`, `dns-prefetch`, `prerender` | 0 (inventario de `rel`: `apple-touch-icon`, `canonical`, `icon` ×3, `preload` ×2, `stylesheet`) | `default-src` (`prefetch`), `script-src` (`modulepreload`), `img-src` (`mask-icon`), ninguna (`alternate`, `preconnect`) | Bloquearía los de carga; los otros no cargan nada |
| `<meta http-equiv>` | 0 en las dos páginas (las `<meta>` presentes son `charset`, `viewport`, `theme-color`, SEO, Open Graph y Twitter; ninguna carga recursos) | — | — |
| `<iframe>` (y `<frame>`) | 0 | `frame-src` (hereda `child-src` y `default-src`) | Bloquearía |
| `<object>` y `<embed>` | 0 | `object-src` (hereda `default-src`) | Bloquearía |
| `<video>`, `<audio>` y `<track>` | 0 | `media-src` | Bloquearía |
| `<form>` | 0 | `form-action` (**no** hereda de `default-src`) | `form-action 'none'` ya está en la política |
| `<base>` | 0 | `base-uri` (**no** hereda de `default-src`) | `base-uri 'none'` ya está en la política |
| Service Workers | 0 registros (`getRegistrations()` devuelve 0 en portada y 404); sin `serviceWorker` en `src/`, ni en el HTML de producción ni en el script del beacon; `/sw.js` y `/service-worker.js` en producción responden `404` | `worker-src` (hereda `child-src`, `script-src` y `default-src`) | Bloquearía |
| Web Workers (`new Worker`, `SharedWorker`) | 0 en `src/` y en el script del beacon | `worker-src` | Bloquearía |
| Peticiones implícitas | El único pedido por el navegador sin estar en una etiqueta es `/cdn-cgi/rum` (arriba). Chrome por protocolo no pidió otra cosa (ver la lista de tipos: `Document`, `Font`, `Stylesheet`, `Image`, `Script`, `XHR`, `Other` = favicon). `robots.txt` y el sitemap los piden los rastreadores, no el navegador, y la CSP no los restringe | — | — |

### Prueba real del manifest (paso 3)

Chrome 155, política aplicada o en solo informe, en una copia fuera del repositorio. **El sitio real no tiene manifest**; para ver la mecánica se agregó, solo en la prueba, un `<link rel="manifest" href="/manifest-prueba.webmanifest">` con un manifest sintético (`name`, `start_url`, `scope`, `display` e `icons`, inventados).

| Caso | Resultado medido |
| :--- | :--------------- |
| **Sitio real**, política (a), solo informe | `Page.getAppManifest`: sin manifest; **0 violaciones**; 0 Service Workers |
| **Sitio real**, política (b), aplicada | Ídem: **0 violaciones** en portada y 404 |
| **Control sintético (i)**: manifest, política (b) **tal como está** | **Violación**: «Loading a manifest from '…/manifest-prueba.webmanifest' violates the following Content Security Policy directive: "default-src 'none'". Note that 'manifest-src' was not explicitly set, so 'default-src' is used» (`error`, 3 veces en la portada); el manifest **no** se obtiene |
| **Control sintético (i)**: manifest, política (a), solo informe | La misma violación como `info`; el manifest sí se obtiene (solo informe no bloquea) |
| **Control sintético (ii)**: manifest, política (b) **con `manifest-src 'self'`** | **0 violaciones**; el manifest se obtiene y se valida («presente», sin errores) |

**Conclusión:** (i) produce una violación **solo si hay un manifest**; (ii) la corrige. El sitio no tiene manifest, así que `manifest-src 'self'` **no se agrega**: sería una autorización para una función que no existe. Si algún día se agrega un manifest (por ejemplo, para instalar el sitio), la política lo detendrá y el aviso de la consola nombrará la directiva exacta; se agrega entonces `manifest-src 'self'` con su iteración y aprobación.

Directivas heredadas que se probaron con control sintético: solo `manifest-src` (la única con un uso plausible a futuro). Para `worker-src`, `frame-src`, `media-src` y `object-src` no se hizo control: el sitio no usa nada de eso (tabla anterior) y esas directivas se comportan igual (heredan de `default-src`).

## Textos finales (paso 4)

**Qué cambió respecto de la propuesta anterior: nada.** No se agrega ni se quita ninguna directiva. La política sigue con 9 directivas, **524 caracteres**. Líneas más largas de `_headers`: **563** (solo informe) y **551** (aplicada); límite de Cloudflare: 2.000. Reglas: 2 (límite 100).

Las líneas de explicación por directiva siguen siendo las de la bitácora `bitacora-05-02-2026-10-13.md` («Texto propuesto de la política»). Se repiten aquí abajo para aprobar sin saltar entre archivos.

| Directiva | Valor | Por qué | Respaldo |
| :-------- | :---- | :------ | :------- |
| `default-src` | `'none'` | Todo lo que no se nombra queda prohibido | Ver las dos tablas de arriba: nada del sitio depende de las directivas heredadas |
| `base-uri` | `'none'` | Nadie puede fijar un `<base>` | 0 `<base>` |
| `form-action` | `'none'` | El sitio no envía formularios (RDA-006) | 0 `<form>` |
| `frame-ancestors` | `'none'` | Nadie puede incrustar el sitio (ya aplicado hoy) | Cabecera medida en producción |
| `script-src` | 4 hashes y `https://static.cloudflareinsights.com` | Los 4 scripts en línea del sitio y el script de Web Analytics; sin `'unsafe-inline'`, `'unsafe-eval'` ni `'self'` | Tabla de scripts |
| `style-src` | `'self'` y 2 hashes | La hoja de estilos del dominio y los dos `@font-face` en línea; sin `'unsafe-inline'` | Tabla de estilos |
| `img-src` | `'self'` | AVIF, WebP, PNG y favicons del dominio | 0 `data:` |
| `font-src` | `'self'` | Los dos `.woff2` | Tabla de fuentes |
| `connect-src` | `'self'` | El beacon envía a `/cdn-cgi/rum` del propio origen | 05-01 y Chrome local; a confirmar en producción |

### (a) Primer despliegue: `public/_headers` completo, en modo solo informe

```text
# Cabeceras de seguridad básicas (iteración 01-06). Workers Static Assets las aplica
# a los recursos estáticos; no a respuestas generadas por código de un Worker.
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Content-Security-Policy: frame-ancestors 'none'
  Content-Security-Policy-Report-Only: default-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; script-src 'sha256-h/2vF1aGIpynrKup+U0y4UdjUccVza7jUMeVEMLLbl0=' 'sha256-851aDHlfSJm2ydIXYm/xjb9zqg+shmbIx5mxnUhebE0=' 'sha256-HKhVVZuR4nQlaNFrH3ZgfmRaAdVXfgd/JHMp0yls/Ug=' 'sha256-4n2jxXVJdkQWX3vxghpJGru3u8tRbr4YjeB/aLeD/l8=' https://static.cloudflareinsights.com; style-src 'self' 'sha256-efEqBBTmDx23cBukE2XkM2PKDzUd+1rZ8FL0uQQQgsM=' 'sha256-yY2AedDjJ6Wcw74TL9jTKsyjFy0AkGKpgxGoGssDOdQ='; img-src 'self'; font-src 'self'; connect-src 'self'

/_astro/*
  Cache-Control: public, max-age=31536000, immutable
```

La cabecera `Content-Security-Policy: frame-ancestors 'none'` se conserva sin cambios. Solo informe y sin endpoint de reportes. Frase de aprobación: «Aprobado el texto (CSP informe)».

### (b) Segundo despliegue: `public/_headers` completo, política aplicada

```text
# Cabeceras de seguridad básicas (iteración 01-06). Workers Static Assets las aplica
# a los recursos estáticos; no a respuestas generadas por código de un Worker.
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Content-Security-Policy: default-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; script-src 'sha256-h/2vF1aGIpynrKup+U0y4UdjUccVza7jUMeVEMLLbl0=' 'sha256-851aDHlfSJm2ydIXYm/xjb9zqg+shmbIx5mxnUhebE0=' 'sha256-HKhVVZuR4nQlaNFrH3ZgfmRaAdVXfgd/JHMp0yls/Ug=' 'sha256-4n2jxXVJdkQWX3vxghpJGru3u8tRbr4YjeB/aLeD/l8=' https://static.cloudflareinsights.com; style-src 'self' 'sha256-efEqBBTmDx23cBukE2XkM2PKDzUd+1rZ8FL0uQQQgsM=' 'sha256-yY2AedDjJ6Wcw74TL9jTKsyjFy0AkGKpgxGoGssDOdQ='; img-src 'self'; font-src 'self'; connect-src 'self'

/_astro/*
  Cache-Control: public, max-age=31536000, immutable
```

Reemplaza la línea `Content-Security-Policy: frame-ancestors 'none'` y quita la de solo informe. Frase de aprobación: «Aprobado el texto (CSP aplicada)».

**Qué NO se permite** (sin cambios): scripts en línea sin hash, `eval`, manejadores `on*`, `javascript:`, scripts externos salvo `static.cloudflareinsights.com`, estilos en línea sin hash y atributos `style=""`, recursos de otros dominios, `data:` y `blob:`, marcos, formularios, `<base>`, plugins, medios, workers y **manifests** (mientras no exista uno y se apruebe `manifest-src`).

## Diseño de la integración `verificarCsp` (paso 5; método C, **sin escribir en el repositorio**)

### Archivo y cambio en la configuración

- **Archivo nuevo:** `src/integraciones/verificarCsp.js` (junto a `bloquearPendientes.js`, con el mismo patrón: un hook `astro:build:done` que lee `dist/` y lanza un `Error` para hacer fallar el build). 137 líneas.
- **Diff propuesto de `astro.config.mjs`** (solo esa adición; archivo de configuración de la raíz: exige tu aprobación expresa):

```diff
 import bloquearPendientes from './src/integraciones/bloquearPendientes.js';
+import verificarCsp from './src/integraciones/verificarCsp.js';
@@
     bloquearPendientes(),
+    verificarCsp(),
   ],
```

- **Sin dependencias nuevas:** usa solo módulos de Node (`node:fs/promises`, `node:crypto`, `node:url`, `node:path`); no cambia `package.json` ni `pnpm-lock.yaml`. Requiere Node 20 o más por `readdir(..., { recursive: true })`; el proyecto exige 22.12 (`engines`).
- **No escribe nada:** solo lee `dist/`. No genera la política ni la modifica.

### Qué compara exactamente

1. **De dónde saca la política:** lee `dist/_headers` (la copia de `public/_headers`) y toma **cada** línea `Content-Security-Policy:` o `Content-Security-Policy-Report-Only:` que contenga `script-src` (la línea `frame-ancestors 'none'` sola no cuenta). Si no hay ninguna, **falla** (la integración la exige: no deja pasar el sitio sin política en silencio).
2. **De dónde saca la realidad:** recorre **todos** los `.html` de `dist/` (hoy `index.html` y `404.html`; si algún día hay más páginas, se incluyen solas) y calcula el SHA-256 en base64, sobre el contenido exacto, de:
   - cada `<script>` en línea sin `src` (incluye los `type="module"`), **excepto** `application/ld+json` (no se ejecuta);
   - cada `<style>` en línea.
   Los `<script src>` externos no se hashean (la política los gobierna por origen). El script de Cloudflare no está en `dist/`: lo inyecta el borde.
3. **Comparación en las dos direcciones, por directiva (`script-src` y `style-src`) y por cada cabecera de política:**
   - **«falta en la política»:** hay un bloque en línea en `dist/` cuyo hash no está en la política.
   - **«sobra en la política»:** hay un hash en la política que ningún bloque de `dist/` tiene (hash desactualizado o bloque borrado).
   - **«NO permitido»:** la directiva contiene `'unsafe-inline'` o `'unsafe-eval'`. Nunca se acepta, ni siquiera acompañado de hashes.
4. **La 404:** se compara igual que la portada y se **suma** al conjunto esperado. La política es una sola para toda la regla `/*`, así que el conjunto esperado es la **unión** de las dos páginas: hoy 4 hashes de script (la 404 usa 3; el cuarto, `pulso-logo.js`, solo lo usa la portada) y 2 de estilo. Un hash que ninguna página usa se marca «sobra»; un bloque de cualquier página que no esté en la política, «falta».

### Mensaje de error exacto

Impreso con `throw new Error(...)`, es decir, el build termina en error y Astro muestra el mensaje. Ejemplo **real**, generado en la copia al agregar un comentario `// x` al script del tema (los hashes son los de esa prueba):

```text
La política Content-Security-Policy de public/_headers no coincide con los scripts y estilos en línea de dist/.

Content-Security-Policy-Report-Only · script-src
  esperados en dist/ (4):    'sha256-0E3dnyzP2XFwgwHBhK5EWSKbfp4bvv4Ub+KKLUDp7VM=' 'sha256-851aDHlfSJm2ydIXYm/xjb9zqg+shmbIx5mxnUhebE0=' 'sha256-HKhVVZuR4nQlaNFrH3ZgfmRaAdVXfgd/JHMp0yls/Ug=' 'sha256-4n2jxXVJdkQWX3vxghpJGru3u8tRbr4YjeB/aLeD/l8='
  encontrados en public/_headers (4): 'sha256-h/2vF1aGIpynrKup+U0y4UdjUccVza7jUMeVEMLLbl0=' 'sha256-851aDHlfSJm2ydIXYm/xjb9zqg+shmbIx5mxnUhebE0=' 'sha256-HKhVVZuR4nQlaNFrH3ZgfmRaAdVXfgd/JHMp0yls/Ug=' 'sha256-4n2jxXVJdkQWX3vxghpJGru3u8tRbr4YjeB/aLeD/l8='
  - falta en la política: 'sha256-0E3dnyzP2XFwgwHBhK5EWSKbfp4bvv4Ub+KKLUDp7VM='
      bloque en dist/ (404.html, index.html): 586 B, empieza con «(function(){const claveTema = "pulsodevs»
  - sobra en la política: 'sha256-h/2vF1aGIpynrKup+U0y4UdjUccVza7jUMeVEMLLbl0='
      ningún bloque de dist/ tiene este hash

Qué hacer: si el cambio de un script o de un estilo en línea es intencional, pide la aprobación del texto nuevo, pega los hashes en public/_headers y vuelve a compilar. Si no lo es, revierte el cambio. 'unsafe-inline' y 'unsafe-eval' no se aceptan nunca.
```

Cuando todo coincide, imprime: `[verificar-csp] OK: 4 scripts y 2 estilos en línea de 2 páginas coinciden con public/_headers.`

### Cómo falla ante un script en línea nuevo

Se probó agregando `<script is:inline>console.log('nuevo');</script>` al `<head>` en la copia. El build **falló** con: «falta en la política: 'sha256-mIIqP4R…' · bloque en dist/ (404.html, index.html): 21 B, empieza con «console.log('nuevo');»», y los hashes esperados (5) frente a los encontrados (4). No depende de `'unsafe-inline'`: el único camino para permitirlo es pegar su hash en la política, que tú apruebas. En el navegador, sin esa aprobación, la política lo bloquearía igual.

### Procedimiento para actualizar los hashes (cuando apruebes un cambio de script)

1. **Quién calcula:** la integración, al compilar. El agente cambia el script y corre `pnpm build`; el build falla y **el mensaje entrega los hashes nuevos listos** (`'sha256-…'`), con el tamaño y el comienzo de cada bloque.
2. **Qué apruebas tú:** el cambio del script (el diff) **y** el texto nuevo de la política (la misma línea con los hashes cambiados), que el agente te muestra completo antes de escribirlo. No se aprueba un hash opaco sin ver el script al que corresponde.
3. **Dónde se pega:** solo en `public/_headers`, en la línea de la política (en las dos si coexisten la de solo informe y la aplicada).
4. **Cuándo:** después de tu aprobación del texto, nunca antes. El agente vuelve a compilar; con `[verificar-csp] OK` el commit queda listo y lo haces tú.
5. **En producción:** cada push compila en Workers Builds con la misma integración; si los hashes de `public/_headers` no coincidieran, el build fallaría allí también. Que un build fallido **no reemplace** el despliegue activo **no está documentado** en las páginas de Workers Builds consultadas (ver «No se pudo medir o verificar»).

### Pruebas de la integración (en la copia, 2026-10-13)

| # | Caso | Resultado |
| :- | :--- | :-------- |
| 1 | Política (a) en `public/_headers`, sin cambios en `src/` | `[verificar-csp] OK: 4 scripts y 2 estilos en línea de 2 páginas…`, build termina bien |
| 2 | Comentario `// x` en el script del tema | **Falla**: falta `…0E3dnyz…`, sobra `…h/2vF1a…` |
| 3 | Dos líneas nuevas en `src/scripts/pulso-logo.js` (versión 1) | **Falla** (falta el hash nuevo; sobra `…4n2jxXV…`) |
| 4 | `<script is:inline>` nuevo en el `<head>` | **Falla**: falta `…mIIqP4R…` (21 B) |
| 5 | `<style is:inline>` nuevo | **Falla** en `style-src`: falta `…6tnv1Ng…` |
| 6 | `'unsafe-inline'` agregado a `script-src` | **Falla**: «NO permitido: 'unsafe-inline' en script-src» |
| 7 | `public/_headers` actual (solo `frame-ancestors 'none'`) | **Falla**: «No hay ninguna política Content-Security-Policy con script-src…» |
| 8 | Se deshacen los cambios | Vuelve a pasar |
| 9 | `prettier --check` (con la configuración del repositorio) y `astro check` en la copia | Sin diferencias de formato; 0 errores y 0 advertencias |

**Sobre el código de salida en esta máquina:** al fallar, Astro termina con un código distinto de cero (127 en Git Bash) y muestra además `Assertion failed: !(handle->flags & UV_HANDLE_CLOSING)` de libuv, el mismo ruido de Windows que ya se anotó con `bloquearPendientes` en la bitácora 01-02. El mensaje se ve completo. En Linux (Workers Builds) no se probó.

### Código propuesto de `src/integraciones/verificarCsp.js` (no escrito en el repositorio)

```js
import { readdir, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const CABECERAS = ['content-security-policy', 'content-security-policy-report-only'];
const PROHIBIDOS = ["'unsafe-inline'", "'unsafe-eval'"];

/** Hash `'sha256-…'` (base64) del contenido exacto de un bloque en línea. */
const hash = (contenido) =>
  `'sha256-${createHash('sha256').update(contenido, 'utf8').digest('base64')}'`;

/** Resumen de un bloque para el mensaje de error: tamaño y primeros caracteres. */
const resumen = (contenido) =>
  `${Buffer.byteLength(contenido, 'utf8')} B, empieza con «${contenido.trim().slice(0, 40).replace(/\s+/g, ' ')}»`;

/** Registra en `mapa` el hash de un bloque y en qué páginas aparece. */
function anotar(mapa, contenido, pagina) {
  const clave = hash(contenido);
  const previo = mapa.get(clave) ?? { paginas: new Set(), descripcion: resumen(contenido) };
  previo.paginas.add(pagina);
  mapa.set(clave, previo);
}

/** Scripts y estilos en línea de un HTML. El JSON-LD no se ejecuta y no cuenta. */
function bloquesEnLinea(html) {
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(
      ([, atributos]) => !/\bsrc=/i.test(atributos) && !/application\/ld\+json/i.test(atributos),
    )
    .map(([, , contenido]) => contenido);
  const estilos = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map(([, c]) => c);
  return { scripts, estilos };
}

/** Valores `'sha256-…'` y presencia de `'unsafe-*'` de una directiva de la política. */
function leerDirectiva(politica, nombre) {
  const parte =
    politica
      .split(';')
      .map((d) => d.trim())
      .find((d) => d.startsWith(`${nombre} `)) ?? '';
  return {
    hashes: parte.match(/'sha256-[^']+'/g) ?? [],
    prohibidos: PROHIBIDOS.filter((p) => parte.includes(p)),
  };
}

/**
 * Integración de Astro que hace fallar `pnpm build` si la política `Content-Security-Policy`
 * de `public/_headers` no coincide con los scripts y estilos en línea de `dist/` (RDA-010, 05-02).
 * Compara hashes en las dos direcciones, así que un hash desactualizado o un bloque nuevo sin
 * aprobar se notan antes de desplegar. Solo lee `dist/`; no escribe nada.
 *
 * @returns {import('astro').AstroIntegration}
 */
export default function verificarCsp() {
  return {
    name: 'verificar-csp',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const carpeta = fileURLToPath(dir);

        // 1. Políticas con script-src declaradas en dist/_headers (la copia de public/_headers).
        const encabezados = await readFile(path.join(carpeta, '_headers'), 'utf8');
        const politicas = encabezados
          .split(/\r?\n/)
          .map((linea) => linea.trim())
          .filter((linea) => CABECERAS.some((c) => linea.toLowerCase().startsWith(`${c}:`)))
          .map((linea) => ({
            cabecera: linea.slice(0, linea.indexOf(':')),
            texto: linea.slice(linea.indexOf(':') + 1),
          }))
          .filter(({ texto }) => texto.includes('script-src'));
        if (politicas.length === 0) {
          throw new Error(
            'No hay ninguna política Content-Security-Policy con script-src en public/_headers.\n' +
              'La integración verificar-csp la exige: agrega la política aprobada o quita la integración de astro.config.mjs.',
          );
        }

        // 2. Bloques en línea reales de todas las páginas de dist/.
        const reales = { 'script-src': new Map(), 'style-src': new Map() };
        const paginas = (await readdir(carpeta, { recursive: true })).filter((r) =>
          r.endsWith('.html'),
        );
        for (const pagina of paginas) {
          const html = await readFile(path.join(carpeta, pagina), 'utf8');
          const { scripts, estilos } = bloquesEnLinea(html);
          scripts.forEach((c) => anotar(reales['script-src'], c, pagina.replaceAll('\\', '/')));
          estilos.forEach((c) => anotar(reales['style-src'], c, pagina.replaceAll('\\', '/')));
        }

        // 3. Comparación en las dos direcciones.
        const problemas = [];
        for (const { cabecera, texto } of politicas) {
          for (const directiva of ['script-src', 'style-src']) {
            const { hashes, prohibidos } = leerDirectiva(texto, directiva);
            const esperados = reales[directiva];
            const lineas = [];
            prohibidos.forEach((p) => lineas.push(`  - NO permitido: ${p} en ${directiva}`));
            for (const [h, info] of esperados)
              if (!hashes.includes(h))
                lineas.push(
                  `  - falta en la política: ${h}\n      bloque en dist/ (${[...info.paginas].join(', ')}): ${info.descripcion}`,
                );
            for (const h of hashes)
              if (!esperados.has(h))
                lineas.push(
                  `  - sobra en la política: ${h}\n      ningún bloque de dist/ tiene este hash`,
                );
            if (lineas.length > 0) {
              problemas.push(
                `${cabecera} · ${directiva}\n` +
                  `  esperados en dist/ (${esperados.size}):    ${[...esperados.keys()].join(' ') || '(ninguno)'}\n` +
                  `  encontrados en public/_headers (${hashes.length}): ${hashes.join(' ') || '(ninguno)'}\n` +
                  lineas.join('\n'),
              );
            }
          }
        }
        if (problemas.length > 0) {
          throw new Error(
            'La política Content-Security-Policy de public/_headers no coincide con los scripts y estilos en línea de dist/.\n\n' +
              problemas.join('\n\n') +
              '\n\nQué hacer: si el cambio de un script o de un estilo en línea es intencional, pide la aprobación del texto ' +
              'nuevo, pega los hashes en public/_headers y vuelve a compilar. Si no lo es, revierte el cambio. ' +
              "'unsafe-inline' y 'unsafe-eval' no se aceptan nunca.",
          );
        }
        console.log(
          `[verificar-csp] OK: ${reales['script-src'].size} scripts y ${reales['style-src'].size} estilos en línea de ${paginas.length} páginas coinciden con public/_headers.`,
        );
      },
    },
  };
}
```

### Límites de la integración (honestos)

- Solo verifica scripts y estilos **en línea**. Un `<script src>` o una hoja externa nueva de un origen no autorizado **no** se detecta en el build: la CSP lo bloquearía y se vería en la consola.
- Lo que Cloudflare inyecta en el borde no está en `dist/` y no se verifica; si Cloudflare empieza a inyectar otro script, la CSP lo bloqueará y se verá en las pruebas de producción.
- Un script cargado dinámicamente por otro script (`createElement('script')`) no se ve desde el HTML; hoy el sitio no lo hace (búsqueda de hoy en `src/`: 0 coincidencias de `createElement`, `innerHTML`, `insertAdjacent`, `eval(` y `new Function`).
- Las expresiones regulares leen el HTML que genera Astro; no es un analizador completo de HTML. Si Astro cambiara la forma de emitir scripts, las pruebas 1 a 8 de arriba se repetirían en la fase B.

## Archivos creados o modificados en este ajuste

| Archivo | Cambio |
| :------ | :----- |
| `_planificacion/99_bitacora/bitacora-05-02-ajuste-2026-10-13.md` | **Nuevo.** Esta bitácora |
| `_planificacion/10_epicas/epica-05-publicacion-medicion/iteracion-05-02-csp.md` | Una línea nueva en «Diagnóstico de partida» con el método C |
| `_planificacion/10_epicas/epica-05-publicacion-medicion/evidencia-05-02-fase-b.md` | Se registra el método C como aprobado (declarado por el desarrollador, 2026-10-13); la frase «Aprobado el método (CSP)» ahora aprueba el diseño concreto de la integración. Los textos (a) y (b) **no** se reemplazaron porque no cambiaron |
| `_planificacion/00_producto/registro-log.md` | Una fila nueva en §6 (2026-10-13) |

## Verificación

- Sin cambios en `src/`, `public/` (incluido `public/_headers`), `astro.config.mjs`, `package.json`, `pnpm-lock.yaml`, `DESIGN.md`, `AGENTS.md`, `README.md`, `.claude/`, `wrangler.jsonc` ni Cloudflare. No se ejecutó `wrangler`; Git solo para leer el estado. No se instalaron dependencias.
- Todas las pruebas se hicieron en la carpeta temporal de la sesión (copia del proyecto con `node_modules` enlazado, servidor local y scripts de Chrome por protocolo). El repositorio no recibió ningún archivo de prueba.
- Contra producción: `GET` y `HEAD` solamente (portada, una ruta inexistente, cinco rutas de manifest o Service Worker inexistentes, un CSS y `beacon.min.js`). **Ningún `POST`**: los envíos del beacon de las pruebas fueron a `127.0.0.1`.
- El token del sitio de Web Analytics, que aparece en el HTML público, no se copió a ningún archivo del repositorio.
- `pnpm format:check` no aplica a `_planificacion/` (`.prettierignore`).

## No se pudo medir o verificar

- **Que un build fallido de Workers Builds no reemplace el despliegue activo.** Las páginas de Cloudflare consultadas el 2026-10-13 (`/workers/ci-cd/builds/` y `/workers/ci-cd/builds/configuration/`) **no lo dicen**: describen el comando de build y el de deploy en ese orden, pero no qué pasa si el primero falla. Es el comportamiento esperable y `AGENTS.md` §8 ya lo supone, pero **no está verificado**. La mitigación real es que el build local falle antes del commit.
- **La salida de error en Linux** (Workers Builds): solo se probó en Windows.
- **Si el hash sigue siendo reproducible entre Windows y Linux ante cambios futuros de los scripts.** Hoy lo es (los 6 hashes de producción y del build local coinciden, medido); Git guarda `LF` y el árbol de trabajo también (`git ls-files --eol`: `i/lf w/lf`, sin `.gitattributes`). Si un archivo llegara a tener `CRLF` en el árbol de trabajo, el hash local difiere del de Linux y el build local falla (visible), no el de producción.
- **Safari y Firefox:** `apple-touch-icon` y el resto de las peticiones solo se midieron con Chrome. Safari está como riesgo aceptado (decisión del 2026-10-12); Firefox no se midió.
- **Qué origen usa el beacon en producción** y que no pida nada más en un navegador real: leído del script (`beacon.min.js`) y medido en el Chrome local, a confirmar en la fase B (W2 y W3 de la evidencia).
- **Que ningún script inserte código dinámicamente:** se buscaron `createElement`, `innerHTML`, `insertAdjacent`, `eval(` y `new Function` en `src/` (0 coincidencias hoy), pero no se hizo una revisión línea por línea de cada script.
- **Las demás directivas heredadas** (`worker-src`, `frame-src`, `media-src`, `object-src`) no tienen control sintético, por lo explicado arriba.
- Lo ya listado como no verificado en `bitacora-05-02-2026-10-13.md` sigue vigente (producción real, transición visual de 1 s, tiempos de Workers Builds, Firefox, auditoría de CSP de Lighthouse, etc.).

## Criterios de aceptación (iteración 05-02)

Ninguno se marca en esta fase: todos corresponden a la fase B.

- [ ] Política completa aplicada en `public/_headers`, sin `'unsafe-inline'` en `script-src`.
- [ ] Sin violaciones en la consola, en portada y 404, claro y oscuro, menú móvil y cambio de tema.
- [ ] El tema guardado se mantiene tras recargar y la transición de tema funciona.
- [ ] Lighthouse móvil y escritorio sin regresión.
- [ ] Un cambio en el script del tema no puede dejar un hash desactualizado sin que se note antes del despliegue (diseñado y probado en una copia; se implementa en la fase B).
- [ ] Procedimiento de reversa probado o documentado (documentado en la evidencia).
- [ ] `evidencia-05-02-fase-b.md` completada y bitácora 05-02 creada.

## Pendientes y riesgos

- **Decisiones tuyas:** aprobar el diseño de la integración y el cambio en `astro.config.mjs` («Aprobado el método (CSP)»), y los textos (a) y, más adelante, (b).
- **Riesgo:** la integración exige una política con `script-src` en `public/_headers`; si se quita la política sin quitar la integración, el build falla (es lo buscado).
- **Riesgo de mantenimiento:** cada cambio en un script o en un bloque `<style>` en línea obliga a actualizar los hashes, con tu aprobación.
- **Sin acción:** `AGENTS.md` y `registro-log.md` (salvo la fila de §6) no cambian en esta pasada. La fila de §4 sobre la CSP la sincronizas tú.

## Commit sugerido

`Épica 05 - Iteración 05-02: método C aprobado, directivas heredadas de default-src verificadas (sin manifest ni workers), textos de política sin cambios y diseño de la integración de verificación, solo documentación.`
