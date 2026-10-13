# Bitácora 05-03 · Verificación final en producción (fase A)

- **Fecha:** 2026-10-13
- **Agente:** Claude Code (Sonnet 5.5)
- **Rama:** main
- **Estado final:** **Fase A completada; fase B pendiente** (la hace el desarrollador con `evidencia-05-03-fase-b.md`). 05-03 sigue `Pendiente`: no se cierra.

## Resumen

Se hicieron las revisiones y mediciones de producción que no necesitan al desarrollador (cabeceras, `www`, 404, `robots.txt` y sitemaps, Lighthouse, LCP, CLS e INP, JSON-LD y etiquetas de vista previa), se clasificaron los hallazgos abiertos y se redactaron las propuestas de texto para `README.md` y `registro-log.md`. **No se editó ningún archivo existente**: solo se crearon esta bitácora y `evidencia-05-03-fase-b.md`.

Los criterios medidos se cumplen: Rendimiento móvil 98 (mediana de cinco alternadas), las otras tres categorías en 100 y escritorio 100 / 100 / 100 / 100; LCP 1.839 ms, CLS 0 e INP 32 a 48 ms; la CSP aplicada es idéntica a `public/_headers` y no hay `content-security-policy-report-only`. **Dos hallazgos nuevos de infraestructura, fuera de los criterios, para que decida el desarrollador:** `http://comunidadpulso.dev/` sirve el sitio sin redirigir a HTTPS y `http://www.comunidadpulso.dev/` responde `522`. `https://www` sí redirige con `301`.

## Cómo se midió

- **Producción:** `curl` con `GET` (y `-I` para cabeceras), `Accept: text/html`, 2026-10-13 entre las 19:40 y las 19:50 (hora de esta máquina; Chile). Ningún `POST` ni petición con efectos.
- **Lighthouse:** 13.5.0 con `pnpm dlx` fuera del proyecto (el `pnpm` global de esta máquina informa 11.28.2; no se ejecutó dentro del repositorio), Chrome 155.0.8059.40 (versión de la carpeta de instalación; el agente de usuario de Lighthouse informa `HeadlessChrome/155.0.0.0`, versión reducida) con `--headless=new`, móvil con el perfil por defecto y escritorio con `--preset=desktop`. **Diez corridas alternadas** (móvil 1, escritorio 1, móvil 2, …) entre las 19:42:57 y las 19:45:36 (registro de Lighthouse: `fetchTime` 22:43 a 22:45 UTC), mediana de cinco por perfil. Misma herramienta y versión de 05-01 y 05-02; el Chrome de 05-01 fue 154.0.8037.98 y el de 05-02, 155.0.8059.40, como hoy. Sin advertencias de ejecución en las diez corridas (`runWarnings` vacío).
- **LCP, CLS e INP por protocolo:** Chrome lanzado por protocolo (DevTools, sin biblioteca; WebSocket nativo de Node), un Chrome limpio por carga, caché desactivada, tres cargas por condición, `PerformanceObserver` de `largest-contentful-paint`, `layout-shift` y `event`; INP = interacción más lenta de **dos clics reales** (`Input.dispatchMouseEvent`) sobre el interruptor de tema visible, esperando 1,7 s tras cada uno. Condiciones: móvil 412 px (factor de píxeles 2,625), escritorio 1280 px y móvil con CPU 4× (`Emulation.setCPUThrottlingRate`, solo como dato aparte). El script de 05-01 y 05-02 no se conservó (vivía en la carpeta temporal de la sesión anterior), así que se **reescribió**; sigue el método descrito en esas bitácoras, pero **no es el mismo archivo**. Su INP usa el mayor `duration` de los eventos de cada interacción y no el cálculo oficial de `web-vitals`.
- **JSON-LD y etiquetas:** `curl` de la portada, extracción con expresiones regulares y `JSON.parse`; la imagen se descargó con `curl` y sus dimensiones se leyeron del encabezado PNG (IHDR).
- **Documentación consultada (2026-10-13):** Google, «Organization structured data» (`https://developers.google.com/search/docs/appearance/structured-data/organization`, «Last updated 2026-09-08 UTC»); schema.org, `https://schema.org/Organization` (pie de página: V30.1, 2026-09-16); LinkedIn, `https://www.linkedin.com/help/linkedin/answer/a521928`; Meta, `https://developers.facebook.com/docs/sharing/webmasters`. Búsquedas web para WhatsApp y para la caché de LinkedIn (sin fuente oficial; ver «No verificado»).
- **Herramientas:** `curl`, `node` 24.16.0, `pnpm dlx lighthouse@13.5.0`. Sin dependencias nuevas y sin tocar el repositorio. Los scripts y los informes JSON de Lighthouse quedaron en la carpeta temporal de la sesión; no se guardaron datos crudos en el repositorio.
- **Incidente menor:** para leer la versión de Chrome se ejecutó `chrome.exe --version`, que abrió una ventana en la sesión de Chrome existente (mensaje «Se está abriendo en una sesión de navegador existente»). No tuvo efecto sobre el sitio ni sobre los archivos.

## Tarea 1 · Revisión de producción (solo lectura)

La CSP se comparó carácter por carácter con la línea `Content-Security-Policy` de `public/_headers`: 524 caracteres en el archivo, en `/` y en la ruta inexistente; `cmp` sin diferencias.

| URL | Resultado | Cabeceras y notas |
| :-- | :-------- | :---------------- |
| `https://comunidadpulso.dev/` | `200`, `Content-Type: text/html` | `content-security-policy` idéntica a `public/_headers`; **sin** `content-security-policy-report-only`; `x-content-type-options: nosniff`; `referrer-policy: strict-origin-when-cross-origin`; `x-frame-options: DENY`; `Cache-Control: public, max-age=0, must-revalidate`; `CF-Cache-Status: HIT` |
| `https://www.comunidadpulso.dev/` | `301`, `Location: https://comunidadpulso.dev/` | Sin cabeceras de seguridad en la redirección. Con ruta y consulta (`/ruta?x=1`) también redirige y las conserva |
| `https://comunidadpulso.dev/ruta-que-no-existe` | `404`, `text/html` | `<meta name="robots" content="noindex">`; `<title>Página no encontrada · Comunidad Pulso Devs`; mismas cabeceras y misma CSP que la portada; `Cache-Control: public, max-age=0, must-revalidate` |
| `http://comunidadpulso.dev/` | **`200`, sirve el sitio por HTTP, sin redirección a HTTPS** (2 de 2 intentos) | Las mismas cabeceras que por HTTPS. `strict-transport-security` ausente en `https://` (0 coincidencias) |
| `http://www.comunidadpulso.dev/` | **`522`** (3 de 3 intentos, ~19,5 s cada uno) | `Content-Type: text/plain`, cuerpo de 16 B. Cloudflare responde `522` (Connection timed out) y no redirige |
| `https://comunidadpulso.dev/robots.txt` | `200`, `text/plain` | `User-agent: *`, `Allow: /`, `Sitemap: https://comunidadpulso.dev/sitemap-index.xml` |
| `https://comunidadpulso.dev/sitemap-index.xml` | `200`, `application/xml` | Un `<sitemap>` con `https://comunidadpulso.dev/sitemap-0.xml` |
| `https://comunidadpulso.dev/sitemap-0.xml` | `200`, `application/xml` | Un solo `<url>`: `https://comunidadpulso.dev/` (la portada) |

Los dos DNS (`comunidadpulso.dev` y `www`) resuelven a las mismas cuatro direcciones de Cloudflare (`nslookup`).

**Sobre `www`, `http://` y HSTS (no se asume ni se propone cambiar nada).** `www` está configurado y redirige con `301` por HTTPS. Pero `http://` sin `www` no redirige y `http://www` da `522`. Por qué ocurre y si es un ajuste de Cloudflare: **no verificado** (no se miró el panel). Si el desarrollador lo quiere registrar, sería un hallazgo nuevo; no está en la auditoría ni en los criterios de 05-03. La ausencia de `strict-transport-security` es un hecho medido, no un fallo de un criterio de la iteración.

## Tarea 2 · Lighthouse y métricas

### Lighthouse, cinco corridas alternadas por perfil

**Móvil**

| # | Rend. | Acces. | Prácticas | SEO | LCP (ms) | FCP (ms) | CLS | TBT (ms) | Speed Index (ms) | Peticiones | Bytes |
| :- | :---- | :----- | :-------- | :-- | :------- | :------- | :-- | :------- | :--------------- | :--------- | :---- |
| 1 | 98 | 100 | 100 | 100 | 1.762 | 1.726 | 0 | 0 | 2.890 | 9 | 107.345 |
| 2 | 98 | 100 | 100 | 100 | 1.908 | 1.876 | 0 | 0 | 2.451 | 9 | 107.383 |
| 3 | 98 | 100 | 100 | 100 | 1.819 | 1.723 | 0 | 46 | 2.918 | 9 | 107.389 |
| 4 | 98 | 100 | 100 | 100 | 1.888 | 1.798 | 0 | 40 | 2.564 | 9 | 107.364 |
| 5 | 98 | 100 | 100 | 100 | 1.839 | 1.752 | 0 | 37 | 2.944 | 9 | 107.371 |
| **Mediana** | **98** | **100** | **100** | **100** | **1.839** | **1.752** | **0** | **37** | **2.890** | **9** | **107.371** |

**Escritorio**

| # | Rend. | Acces. | Prácticas | SEO | LCP (ms) | FCP (ms) | CLS | TBT (ms) | Speed Index (ms) | Peticiones | Bytes |
| :- | :---- | :----- | :-------- | :-- | :------- | :------- | :-- | :------- | :--------------- | :--------- | :---- |
| 1 | 100 | 100 | 100 | 100 | 537 | 536 | 0 | 0 | 837 | 9 | 106.821 |
| 2 | 100 | 100 | 100 | 100 | 522 | 521 | 0 | 0 | 744 | 9 | 106.812 |
| 3 | 100 | 100 | 100 | 100 | 526 | 501 | 0,0001 | 0 | 751 | 9 | 106.826 |
| 4 | 100 | 100 | 100 | 100 | 507 | 506 | 0 | 0 | 738 | 9 | 106.806 |
| 5 | 100 | 100 | 100 | 100 | 527 | 522 | 0 | 0 | 782 | 9 | 106.839 |
| **Mediana** | **100** | **100** | **100** | **100** | **526** | **521** | **0** | **0** | **751** | **9** | **106.821** |

Las 9 peticiones van a dos orígenes: `comunidadpulso.dev` y `static.cloudflareinsights.com` (script de Web Analytics, aceptado en RDA-010). Lighthouse 13.5.0 agrega una categoría que antes no se anotaba, «agentic-browsing» (puntaje 100 en las diez corridas); no forma parte de los criterios. La auditoría `csp-xss` (informativa) sale con puntaje 1 en las diez corridas.

### Comparación con la línea base y con los criterios

| Medición | Línea base 05-01 (Chrome 154, producción con script, sin CSP aplicada) | 05-02, despliegue 2 (Chrome 155, CSP aplicada) | **05-03 (hoy, Chrome 155, CSP aplicada)** | Criterio 05-03 | Veredicto |
| :------- | :-------------------------------------------- | :--------------------------------------------- | :------------------------------------------ | :------------- | :-------- |
| Rendimiento móvil (mediana de cinco) | 99 | 95 | **98** | 95 o más | **Cumple** |
| Accesibilidad / Prácticas / SEO móvil | 100 / 100 / 100 | 100 / 100 / 100 | **100 / 100 / 100** | 100 | **Cumple** |
| Escritorio (cuatro categorías) | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | **100 / 100 / 100 / 100** | 95 o más y 100 | **Cumple** |
| LCP móvil, Lighthouse (mediana) | 1.799 ms | 1.933 ms | **1.839 ms** | < 2.500 ms | **Cumple** |
| LCP escritorio, Lighthouse (mediana) | 511 ms | 543 ms | **526 ms** | < 2.500 ms | **Cumple** |
| CLS (Lighthouse, móvil y escritorio) | 0 | 0 | **0** (escritorio, máximo 0,0001) | < 0,05 | **Cumple** |
| TBT móvil (mediana) | 36 ms | 73 ms | **37 ms** | (sin criterio) | — |
| Speed Index móvil (mediana) | 2.444 ms | 4.546 ms | **2.890 ms** | (sin criterio) | — |
| INP por protocolo, sin estrés | 32 a 48 ms | máximo 56 (móvil) y 64 (escritorio) | **32 a 48 ms** | < 200 ms | **Cumple** |
| Peso y peticiones, móvil | 9 y 106.595 B | 9 y 107.419 B | **9 y 107.371 B** | (sin criterio) | — |

**Sobre el 95 de 05-02.** Hoy el Rendimiento móvil dio 98 en las cinco corridas, con la misma CSP aplicada que cuando dio 95. La baja de 05-02 vino del Speed Index (4.546 ms entonces y 2.890 ms hoy; la línea base fue 2.444 ms). En 04-02 ya se había anotado que el Speed Index de este build sale en dos modos (~1,2 s y ~4,1 s). Lo que **no** se puede afirmar con estas mediciones es la causa de la baja de 05-02: no se midió producción sin CSP con Chrome 155 y la producción incluye el script de Cloudflare. Lo medido hoy sí indica que la CSP aplicada no deja el Rendimiento móvil en 95 de forma estable, y el criterio de 95 o más se cumple con holgura de 3 puntos.

### LCP, CLS e INP por protocolo (tres cargas por condición)

| Condición | LCP (ms) | Elemento del LCP | CLS | INP máximo por carga (ms) |
| :-------- | :------- | :--------------- | :-- | :------------------------ |
| Móvil 412 px | 1.332, 788, 600 | `p.hero__sub` | 0, 0, 0 | 40, 48, 48 |
| Escritorio 1280 px | 508, 1.292, 1.432 | `span.hero__wordmark` | 0, 0, 0,0016 | 48, 32, 40 |
| Móvil 412 px, CPU 4× (**estrés, dato aparte, no es el criterio**) | 2.368, 2.600, 2.532 | `p.hero__sub` | 0, 0, 0 | 88, 96, 112 |

Sin estrés: LCP < 2,5 s (máximo 1.432 ms), CLS < 0,05 (máximo 0,0016) e INP < 200 ms (máximo 48 ms) se cumplen. Con CPU 4×, dos de las tres cargas superan 2,5 s de LCP (2.600 y 2.532 ms) y el INP máximo es 112 ms. Es el mismo comportamiento ruidoso que 04-02 y 05-02 documentaron para esta condición (en 05-02: LCP 1.512 a 3.484 ms con CPU 4×); no se usa como criterio. El LCP por protocolo varía entre cargas (600 a 1.432 ms) por la red y la máquina; el criterio se evalúa con Lighthouse y con las cargas sin estrés.

El tema quedó en «light» al final de cada carga (dos clics: claro → oscuro → claro), y en todas se registraron las dos interacciones, así que los dos clics llegaron a la página.

## Tarea 3 · JSON-LD y vista previa al compartir

### JSON-LD de la portada

Un solo bloque `<script type="application/ld+json">` (467 B), **JSON válido** (`JSON.parse` sin errores). La 404 no lo lleva (medido en 04-01).

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Comunidad Pulso Devs",
  "url": "https://comunidadpulso.dev/",
  "logo": "https://comunidadpulso.dev/icono-192.png",
  "description": "Pulso Devs es una comunidad latinoamericana para desarrolladores junior de frontend, backend, fullstack e ingeniería de IA. Talleres gratuitos en vivo, apoyo para tus proyectos y oportunidades para crecer.",
  "sameAs": ["https://www.linkedin.com/company/comunidad-pulso-devs/home/"]
}
```

| Revisión | Resultado | Fuente |
| :------- | :-------- | :----- |
| `@type: Organization` existe en schema.org | Cumple | `https://schema.org/Organization`, consultada el 2026-10-13 (V30.1, 2026-09-16) |
| `name`, `url`, `description`, `sameAs` existen (heredadas de `Thing`) y `logo` está definida en `Organization` con tipo `ImageObject` o URL | Cumple (`logo` como URL) | Ídem |
| Google: «There are no required properties» para `Organization` | Cumple (no falta ninguna propiedad obligatoria) | `https://developers.google.com/search/docs/appearance/structured-data/organization`, consultada el 2026-10-13 (última actualización de la página: 2026-09-08 UTC) |
| Google: `name`, `url`, `description`, `sameAs` y `logo` figuran entre las propiedades recomendadas | Cumple; las cinco están presentes | Ídem |
| Google, logo: «The image must be 112x112px, at minimum»; la URL debe poder rastrearse e indexarse; formato compatible con Google Images | Cumple: `icono-192.png` es PNG de 192 × 192 px (11.253 B), responde `200`, `image/png`, y `robots.txt` permite `/` | Ídem + medición propia |
| Google: el nombre debe coincidir con el nombre del sitio | `name` = «Comunidad Pulso Devs» y `og:site_name` = «Comunidad Pulso Devs»: coinciden | Ídem + medición propia |
| Google, logo: «check how the logo looks on a plain white background» | **No verificado** (no se miró el ícono sobre fondo blanco en una vista de resultados) | Ídem |
| Propiedades recomendadas ausentes: `alternateName`, `legalName`, `foundingDate`, `email`, `telephone`, `address`, `contactPoint`, entre otras | **No «sobran» ni «faltan»**: son opcionales y no hay datos entregados por escrito; no se deben inventar (AGENTS §6.2) | Ídem |
| Propiedades que sobran o no existen | Ninguna: las cinco existen en schema.org | `https://schema.org/Organization` |
| Resultado en las herramientas públicas | **No verificado por el agente** (no se usó ninguna herramienta web). En 04-01 el desarrollador declaró: `validator.schema.org` 0 errores y 0 advertencias y la prueba de Google sin errores y sin elementos detectados | Parte 1 de `evidencia-05-03-fase-b.md` |

### Etiquetas Open Graph y de Twitter de la portada

| Etiqueta | Valor medido | Observación |
| :------- | :----------- | :---------- |
| `og:title` | «Comunidad Pulso Devs» | Presente |
| `og:description` | «Una comunidad para desarrolladores junior que quieren aprender, construir y crecer juntos. Abierta a toda Latinoamérica.» | Presente |
| `og:url` | `https://comunidadpulso.dev/` | URL absoluta; coincide con `canonical` |
| `og:type` | `website` | |
| `og:site_name`, `og:locale` | «Comunidad Pulso Devs» y `es_LA` | |
| `og:image` | `https://comunidadpulso.dev/_astro/pulsodevs-vista-previa.BfXakkEY.png` | URL absoluta; `200`; `Content-Type: image/png`; `Cache-Control: public, max-age=31536000, immutable`; **1200 × 630 px** (IHDR); **25.676 B** |
| `og:image:width` / `og:image:height` / `og:image:alt` | `1200` / `630` / «Logotipo y nombre de Pulso Devs» | Coinciden con las dimensiones reales |
| `twitter:card` | `summary_large_image` | |
| `twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt` | Los mismos valores que Open Graph | Presentes |

**Requisitos de imagen según documentación oficial (consultada el 2026-10-13):**

- **LinkedIn** (`https://www.linkedin.com/help/linkedin/answer/a521928`): etiquetas `og:title`, `og:image`, `og:description` y `og:url` obligatorias; imagen de hasta 5 MB, mínimo 1.200 × 627 px, proporción recomendada 1,91:1; las imágenes de menos de 401 px de ancho se muestran como miniatura. La imagen del sitio (1.200 × 630 px, 25.676 B, proporción 1,905:1) **cumple**.
- **Meta / Open Graph** (`https://developers.facebook.com/docs/sharing/webmasters`): `og:image:type` debe ser `image/jpeg`, `image/gif` o `image/png`, y conviene indicar ancho y alto. La página **no da** tamaños mínimos ni máximos de imagen (remite a otra guía que no se consultó). La imagen es PNG y trae ancho y alto.
- **WhatsApp:** **no verificado.** No se encontró documentación oficial de WhatsApp o de Meta sobre requisitos de imagen para vistas previas. Las guías de terceros que aparecen se contradicen (hablan de límites de 300 KB y de tamaños pequeños) y **no se citan como requisitos**. Lo observable es que la imagen pesa 25.676 B y mide 1200 × 630 px; cómo la muestra WhatsApp lo confirma el desarrollador en la parte 2 de la evidencia.
- **Caché de LinkedIn:** no se encontró una fuente oficial que dé la duración de la caché de la vista previa ni confirme el procedimiento del Post Inspector; las guías de terceros dicen que la guarda y hablan de unos días. **No verificado**; la evidencia pide anotar si se ve una versión anterior.

## Tarea 6 · Propuesta de clasificación de hallazgos (sin editar `auditoria-tecnica.md`)

Leídos los 31 hallazgos (AUD-01-001 a 020 y AUD-02-001 a 011). **Ninguno de severidad Alta sigue abierto:** los tres Alta (AUD-01-005, AUD-01-012 y AUD-01-016) figuran resueltos con su evidencia.

**Hallazgos con estado «abierto» o «parcial», o resueltos con una parte sin verificar:**

| ID | Severidad | Estado actual en el archivo | Propuesta | Evidencia o motivo | ¿Requiere decisión del desarrollador? |
| :- | :-------- | :-------------------------- | :-------- | :----------------- | :------------------------------------ |
| AUD-02-005 | Baja | Parcial: verificado en Chrome y Firefox; falta Safari | **Riesgo aceptado** (solo la parte de Safari y iPhone) | Declaración del desarrollador, 2026-10-12: no hay equipo Apple. Verificado en Chrome 154 (medido, 02-03) y declarado en Firefox 155 y en el Galaxy A52 con Chrome 154 (04-03) | Sí: aprobar |
| AUD-02-008 | Media | Parcial: verificado en Chrome y Firefox; falta Safari | **Riesgo aceptado** (solo la parte de Safari y iPhone). La limitación conocida de Chrome de escritorio (clics perdidos ~1 s, RDA-016 y `DESIGN.md` §6) no cambia | Declaración del desarrollador, 2026-10-12. En Firefox 155 el clic llega y en el Galaxy A52 el toque responde (declarado, 04-03) | Sí: aprobar |
| AUD-01-019 | Media | Parcial: `wrangler.jsonc` «pendiente de comprobar en producción, fase B» | **Resuelto en 01-06 (2026-10-10)** | El texto del estado quedó atrás: 01-06 está `Terminada` y su fase B comprobó producción. Hoy: `package.json`, `pnpm-lock.yaml`, `LICENSE`, `wrangler.jsonc`, `.claude/settings.json` y `_planificacion/` existen en el repositorio (listados); producción sirve las cabeceras de `public/_headers` (medido hoy) | Sí: confirmar que el texto «parcial» es solo una etiqueta atrasada |
| AUD-02-010 | Media | Etiqueta «**Parcial** (abierto en 04-03)», pero el mismo texto dice «Resuelto el resto en 04-03, medido» | **Resuelto en 04-00 y 04-03** (corregir la etiqueta; el contenido no cambia) | Medido en 04-00 y 04-03: ningún objetivo interactivo bajo 44 × 44 px a 320, 360, 560, 768, 1100 y 1280 px | Sí: aprobar el cambio de etiqueta |
| AUD-01-015 | Media | Resuelto en 04-03, «sin cubrir» VoiceOver y Narrador de Windows | **Resuelto**, con **riesgo aceptado** para VoiceOver y Narrador | Declaración del desarrollador, 2026-10-12 (TalkBack y NVDA probados, declarado en 04-03; contraste, teclado, foco y objetivos medidos) | Sí: aprobar |
| AUD-01-018 | Baja | Resuelto en 04-01; `apple-touch-icon` no probado en iPhone e ícono de 192 px no probado en un teléfono | **Resuelto**, con **riesgo aceptado** para `apple-touch-icon` en iPhone. El ícono de 192 px queda según el resultado de la parte 4 de la evidencia (Android real) | Declaración del desarrollador, 2026-10-12. Hoy: `apple-touch-icon.png` 180 × 180 px, `icono-192.png` 192 × 192 px, `icono-32.png` 32 × 32 px y `favicon.ico` 32 × 32 px, todos `200` (medido) | Sí: aprobar; el 192 px depende de la fase B |
| AUD-02-009 | Media | Resuelto en 04-03; verificación cruzada en Safari (C2.6) no probada | **Resuelto**, con **riesgo aceptado** para la verificación en Safari | Declaración del desarrollador, 2026-10-12. Medido: mínimo 3,32:1 en los 8 usos. La excepción del hover del chip del fundador (2,22:1) sigue explícita | Sí: aprobar |

**El resto está resuelto y no cambia** (con su evidencia en el archivo): AUD-01-001 a 018 salvo los de arriba, AUD-01-020 y AUD-02-001 a 004, 006, 007 y 011. AUD-01-014, 016 y 017 tienen verificación en producción declarada por el desarrollador el 2026-10-12; hoy el agente midió las mismas etiquetas, la imagen, `robots.txt` y el sitemap (ver arriba) y coinciden.

**Cierre de la Auditoría 01 (propuesta):** con AUD-01-019 resuelto, los 20 hallazgos de la Auditoría 01 quedan resueltos (dos de ellos con una parte en «riesgo aceptado»: AUD-01-015 y AUD-01-018). Texto propuesto para agregar bajo la tabla de «Hallazgos abiertos por iteración» de la Auditoría 01, y una fila análoga en la de la Auditoría 02:

> **Cierre de la Auditoría 01 (05-03, AAAA-MM-DD):** los 20 hallazgos están resueltos. Quedan como «no verificado, riesgo aceptado por el desarrollador» (declaración del 2026-10-12, sin equipo Apple): VoiceOver y Narrador de Windows (AUD-01-015) y `apple-touch-icon` en iPhone (AUD-01-018). Si más adelante hay acceso a un equipo Apple, se reabre como hallazgo nuevo.
>
> | 05-03 | AUD-01-015, AUD-01-018, AUD-01-019, AUD-02-005, AUD-02-008, AUD-02-009, AUD-02-010 (clasificados; Safari, iPhone, VoiceOver, Narrador de Windows y `apple-touch-icon`: riesgo aceptado, 2026-10-12) |

**Sin clasificar: requiere una decisión tuya.** Las observaciones nuevas de la Tarea 1 (`http://` sin redirección a HTTPS, `http://www` con `522` y ausencia de `strict-transport-security`) no están en la auditoría. No les asigno severidad ni ID. Si decides registrarlas, serían una Auditoría 03 aparte (el criterio «todo hallazgo abierto» de 05-03 se refiere a los hallazgos que ya existen). Los textos «borde del chip del fundador en hover» y «`--muted` sobre el patrón de puntos de Talleres» están anotados como excepciones, no como hallazgos abiertos.

## Tarea 7 · Propuestas de documentación (sin editar `README.md` ni `registro-log.md`)

Los textos asumen que la fase B se completa y que el desarrollador aprueba el cierre; los espacios `AAAA-MM-DD` y `[…]` se llenan con sus resultados. Si la fase B encuentra algo, se ajustan.

### `README.md`

**R1 · Sección «¿Qué es este proyecto?», al final de la sección.** Texto actual: termina en «…para ver cómo se construye un sitio real, de principio a fin, con herramientas modernas.»

Texto propuesto (párrafo nuevo después):

> **Estado del proyecto.** El ciclo inicial está terminado: el sitio está publicado en [comunidadpulso.dev](https://comunidadpulso.dev) con diseño en modo claro y oscuro, SEO técnico, accesibilidad medida y una política de seguridad de contenido (CSP). Una posible navegación con varias páginas está en evaluación y no está comprometida.

**R2 · Sección «Tecnologías», fila nueva al final de la tabla.** Texto actual: la tabla termina en la fila de Cloudflare Workers.

Texto propuesto:

> | [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) | Mide las visitas al sitio. Cloudflare lo agrega al publicar, por eso su script no está en este repositorio. |

(La dirección del producto no se consultó en esta fase; si prefieres, se deja sin enlace.)

**R3 · Sección «Cómo se publica», párrafo nuevo al final.** Texto actual: termina en «Por eso `main` siempre refleja la versión que está en línea.»

Texto propuesto:

> Las cabeceras de seguridad, incluida la política de seguridad de contenido (CSP), están en `public/_headers`. Como esa política usa «hashes» fijos para el código en línea, el proyecto trae una integración propia (`src/integraciones/verificarCsp.js`) que hace fallar `pnpm build` si un hash no coincide con lo compilado, para no publicar una política desactualizada.

**R4 · Sección «Cómo ejecutarlo en tu computador», tabla de comandos (opcional).** Texto actual: tres comandos (`pnpm dev`, `pnpm build`, `pnpm preview`). Propuesta: agregar `pnpm check` («Revisa el código con `astro check`»), `pnpm format` («Da formato al código con Prettier») y `pnpm format:check` («Comprueba el formato sin cambiar archivos»), los tres de `AGENTS.md` §4.

No se propone cambiar nada más. Observación sin propuesta: la frase de «¿Qué es este proyecto?» menciona «oportunidades de becas, certificaciones y empleo»; no se tocó porque el contenido del sitio es decisión del desarrollador (AGENTS §6).

### `registro-log.md`

**L1 · Cabecera, línea 5.** Actual: «**Última actualización:** 2026-10-12». Propuesto: «**Última actualización:** AAAA-MM-DD».

**L2 · Cabecera, «Iteración activa» (línea 6).** Actual (inicio): «**Ninguna:** **05-02** (Política Content-Security-Policy) quedó `Terminada` el 2026-10-13 …». Propuesto (inicio, el resto de la línea se conserva como historia):

> **Ninguna:** **05-03** (Verificación final en producción) quedó `Terminada` el AAAA-MM-DD y con ella **la Épica 05 y el ciclo inicial del proyecto** (criterios en §5). Antes: **05-02** (Política Content-Security-Policy) quedó `Terminada` el 2026-10-13 …

Y se quita del final de la línea la frase «sigue 05-03 (ver arriba)».

**L3 · Cabecera, «Próximo hito» (línea 8).** Actual (final): «Sigue la Épica 05 (05-01 … y 05-03, verificación final en producción, la siguiente, donde AUD-02-005 y AUD-02-008 quedan como riesgo aceptado por Safari). El hito 4 (navegación multipágina, Épica 06) se evalúa después.» Propuesto (final):

> La Épica 05 (publicación y medición) quedó `Terminada` el AAAA-MM-DD, con AUD-02-005 y AUD-02-008 como riesgo aceptado por Safari. **El ciclo inicial está cerrado.** El hito 4 (navegación multipágina, Épica 06) sigue en evaluación: no tiene iteraciones y lo decide el desarrollador.

**L4 · §1, fila de 05-03.** Actual: «| 05-03 | Verificación final en producción | 05 | Pendiente | 05-02 | — |». Propuesto:

> | 05-03 | Verificación final en producción | 05 | Terminada (AAAA-MM-DD) | 05-02 | [bitacora-05-03-fase-a-2026-10-13](../99_bitacora/bitacora-05-03-fase-a-2026-10-13.md) · [bitacora-05-03-AAAA-MM-DD](../99_bitacora/bitacora-05-03-AAAA-MM-DD.md) · [evidencia fase B](../10_epicas/epica-05-publicacion-medicion/evidencia-05-03-fase-b.md) |

**L5 · §1, párrafo de la Épica 06.** Existe (línea 42): «**Épica en evaluación:** la Épica 06 (navegación multipágina) no tiene iteraciones ni está comprometida; el desarrollador decide después de que el sitio esté desplegado y funcionando (`definicion-epica-06.md`).» **No hay que crearla**; propuesta opcional de cambio: sustituir «después de que el sitio esté desplegado y funcionando» por «ahora que el sitio está desplegado y verificado (Épica 05)».

**L6 · §4, fila «Clics bloqueados durante el efecto de cambio de tema».** Actual (parte final): «… **Parcial**, abierto hasta 05-03, riesgo aceptado por el desarrollador, 2026-10-12 (04-03: …; falta Safari), junto con AUD-02-005; …». Propuesto (parte final):

> … **Parcial** hasta 05-03; clasificado como **riesgo aceptado** (Safari y iPhone) por el desarrollador el AAAA-MM-DD, junto con AUD-02-005 (declaración del 2026-10-12). Verificado en Chrome y Firefox; la limitación conocida de Chrome de escritorio se mantiene (RDA-016).

**L7 · §4, fila de Search Console.** Actual (final): «El estado de indexación se vuelve a registrar con fecha en 05-03». Propuesto (final): «Estado de indexación en 05-03 (declarado por el desarrollador, AAAA-MM-DD): […] (`evidencia-05-03-fase-b.md`, parte 3)».

**L8 · §4, filas nuevas (solo si el desarrollador decide registrarlas).**

> | `http://comunidadpulso.dev/` sirve el sitio sin redirigir a HTTPS, `http://www` responde `522` y `strict-transport-security` no está presente (medido en 05-03, sin verificar la causa ni la configuración de Cloudflare); decisión del desarrollador: […] | Bitácora 05-03 (fase A) | 2026-10-13 |

**L9 · §5, bloque nuevo al final (después del de la Épica 04).**

> **Épica 05 · Publicación y medición: Terminada el AAAA-MM-DD** (05-01, 05-02 y 05-03, todas `Terminada`). Cloudflare Web Analytics se mantiene (RDA-010 Aceptada), Search Console tiene la propiedad verificada y el sitemap procesado, la `Content-Security-Policy` completa está aplicada en producción y el sitio publicado cumple los criterios de la Épica 04.
>
> Criterios de término de `definicion-epica-05.md` (medido = lo midió el agente; declarado = lo declaró el desarrollador; detalle en `bitacora-05-03-fase-a-2026-10-13` y `evidencia-05-03-fase-b.md`):
>
> | Criterio | Estado |
> | :------- | :----- |
> | RDA-010 «Aceptada» con mediciones con el script que confirmen que no hay regresiones | **Cumple** (RDA-010 Aceptada el 2026-10-13; 05-01) |
> | Search Console con propiedad verificada, sitemap procesado y estado de indexación con fecha | **Declarado** (05-01 y 05-03, AAAA-MM-DD: […]) |
> | CSP aplicada, sin violaciones en consola y con Lighthouse sin regresiones | **Medido** (05-02: 0 violaciones, control positivo bloqueado; 05-03: cabecera idéntica a `public/_headers`, sin `report-only`, Rendimiento móvil 98) |
> | El sitio en producción cumple los criterios de la Épica 04 | **Medido** (2026-10-13, mediana de cinco alternadas): móvil 98 / 100 / 100 / 100, escritorio 100 / 100 / 100 / 100, LCP 1.839 ms, CLS 0, INP 32 a 48 ms |
> | Sin hallazgos Alta abiertos; los no verificados, «riesgo aceptado» con fecha | **Cumple** (AUD-01-005, 012 y 016 resueltos; Safari, iPhone, VoiceOver, Narrador de Windows y `apple-touch-icon`, riesgo aceptado, 2026-10-12) |
>
> **Ciclo inicial cerrado.** Las Épicas 01 a 05 están `Terminada`. Queda abierta solo la Épica 06 (navegación multipágina), en evaluación.

**L10 · §5, Épica 04, «Abiertos tras el cierre» (línea 173).** Actual: «… Cloudflare Web Analytics (05-01) y la `Content-Security-Policy` completa (05-02). …». Propuesto: agregar al final de ese párrafo «(Web Analytics y la CSP se resolvieron en 05-01 y 05-02; AUD-02-005 y AUD-02-008 se cerraron en 05-03 como riesgo aceptado.)»

**L11 · §6, fila nueva al final.**

> | AAAA-MM-DD | 05-03 terminada: verificación final en producción (Lighthouse móvil 98, escritorio 100, LCP 1.839 ms, CLS 0, INP 32 a 48 ms); hallazgos clasificados (Safari, iPhone, VoiceOver, Narrador de Windows y `apple-touch-icon`: riesgo aceptado); Épica 05 y ciclo inicial terminados; queda la Épica 06 en evaluación. |

### Menciones desactualizadas que conviene alinear

| Archivo | Dónde | Texto actual | Qué conviene |
| :------ | :---- | :----------- | :----------- |
| `registro-log.md` | Línea 5 | «Última actualización: 2026-10-12» | Fecha del cierre (L1); la fila de §6 del 2026-10-13 ya existe |
| `registro-log.md` | Líneas 6 y 8 | «sigue 05-03 (ver arriba)» y «05-03 … la siguiente» | L2 y L3 |
| `registro-log.md` | §1, 05-03 | `Pendiente` y bitácora «—» | L4 |
| `registro-log.md` | §4, clics bloqueados | «abierto hasta 05-03» | L6 |
| `registro-log.md` | §4, Search Console | «se vuelve a registrar con fecha en 05-03» | L7 |
| `registro-log.md` | §5, Épica 04, líneas 170 y 173 | AUD-02-005 y 008 «abiertos hasta 05-03»; «Cloudflare Web Analytics (05-01) y la CSP (05-02)» como abiertos | L10 (son un resumen histórico; solo agregar la nota) |
| `auditoria-tecnica.md` | AUD-01-019 | «Parcial … pendiente de comprobar en producción, fase B» | «Resuelto en 01-06» |
| `auditoria-tecnica.md` | AUD-02-010 | Etiqueta «Parcial (abierto en 04-03)» | «Resuelto en 04-00 y 04-03» |
| `auditoria-tecnica.md` | AUD-01-015, AUD-02-005, AUD-02-008, AUD-02-009 | «se traslada a 05-03» | Reemplazar por el cierre como riesgo aceptado, con fecha |
| `auditoria-tecnica.md` | Tablas «Hallazgos abiertos por iteración» | Sin fila de 05-03 | Agregar la fila propuesta arriba |
| `iteracion-05-02-csp.md` | Línea 8 | «el de la política `Content-Security-Policy` en `auditoria-tecnica.md`, si existe (el agente lo confirma y lo enlaza)» | **El hallazgo no existe** (búsqueda de «Content-Security-Policy» y «CSP» en `auditoria-tecnica.md`: 0 coincidencias). Cambiar a «Hallazgos que cierra: ninguno (la auditoría no tiene un hallazgo de CSP)» |
| `iteracion-05-03-verificacion-final.md` | Línea 4 y tareas 1, 3 y 4 | `Estado: Pendiente` y tareas en futuro | Al cerrar: `Terminada` y criterios marcados con su evidencia |
| `definicion-epica-05.md` | Línea 3 y línea 9 | «Estado: En curso» y «RDA-010 sigue «Propuesta»» | `Terminada`; RDA-010 está «Aceptada» desde 2026-10-13. La línea 10 («la política hoy es solo `frame-ancestors 'none'`») es contexto de partida y puede conservarse con la nota «(antes de 05-02)» |
| `definicion-epica-05.md` | Tabla de iteraciones | «05-02 … (terminada, 2026-10-13)» está dentro de la columna «Depende de» | Mover el estado a una columna o a una nota (formato) |

## No medido o no verificado

- **`www`, `http://` y `522`:** causa y configuración de Cloudflare no verificadas (no se miró el panel).
- **Rendimiento móvil de 05-02 (95):** la causa de la baja no se atribuyó ni se descartó; hoy dio 98 con la misma CSP.
- **Chrome:** versión completa (155.0.8059.40) leída de la carpeta de instalación; el informe de Lighthouse solo trae `155.0.0.0`.
- **Script de INP:** reescrito; no es el de 05-01 y 05-02 (se perdió con la carpeta temporal), y su INP es el mayor `duration` de la interacción, no el cálculo de `web-vitals`.
- **JSON-LD en validadores públicos y logo sobre fondo blanco:** no verificados por el agente (herramientas web fuera de esta fase; el desarrollador las usa en la parte 1 de la evidencia).
- **Requisitos de imagen de WhatsApp y duración de la caché de LinkedIn:** sin documentación oficial encontrada.
- **Dirección del Post Inspector de LinkedIn y del producto de Cloudflare Web Analytics en el README:** no consultadas en esta fase.
- **Meta, tamaños de imagen:** la página consultada no los indica.
- **Indexación en Search Console, vista previa en WhatsApp y LinkedIn, teléfono Android real (claro, oscuro e ícono de 192 px):** pendientes del desarrollador (fase B).
- **Safari, iPhone, VoiceOver, Narrador de Windows y `apple-touch-icon`:** no verificados; riesgo aceptado por el desarrollador (2026-10-12).
- **Producción sin CSP con Chrome 155, y Lighthouse del despliegue 1 (solo informe):** no medidos (heredado de 05-02).

## Archivos

- Creados: `_planificacion/99_bitacora/bitacora-05-03-fase-a-2026-10-13.md` (esta bitácora) y `_planificacion/10_epicas/epica-05-publicacion-medicion/evidencia-05-03-fase-b.md`.
- No se modificó ningún otro archivo. `git status` y `git diff --stat` al cierre de la fase A: ver la entrega.

## Commit sugerido

`Épica 05 - Iteración 05-03: fase A, verificación en producción (Lighthouse móvil 98, CSP idéntica), propuestas de hallazgos y documentación, y evidencia de fase B, solo documentación.`
