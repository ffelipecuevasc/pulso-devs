# Bitácora 05-01 (ajuste de método) · Medición: Cloudflare Web Analytics y Search Console

- **Fecha:** 2026-10-13
- **Agente:** Claude Code (Sonnet 5.5)
- **Rama:** main
- **Estado final:** **Fase A completada; fase B pendiente** (la hace el desarrollador)

> **Por qué este archivo se llama distinto.** Ya existe `bitacora-05-01-2026-10-13.md`, entregada y commiteada en la primera fase A, con el método original («con y sin script»). Las bitácoras no se editan después de entregadas (`_planificacion/README.md` §2.3), así que este ajuste va en un archivo nuevo. **Esta bitácora reemplaza a la anterior en lo que se refiere al método, a la fase B y a las propuestas.** Las mediciones son las mismas (ver «Medición»). Si prefieres otro nombre, se renombra sin cambiar el contenido.

## Resumen

El desarrollador decidió (2026-10-13) **mantener Cloudflare Web Analytics activo**: no se desactiva la inyección en el panel de Cloudflare ni se mide la producción sin el script. RDA-010 se acepta por esa decisión (**declarado por el desarrollador**), sujeta a que la medición con script no muestre regresiones; `decisiones.md` **no se cambió** en esta fase. Se ajustaron `iteracion-05-01-medicion.md`, `definicion-epica-05.md` y `registro-log.md` §6, se documentó cómo inyecta Cloudflare el script y qué habría que permitir en la CSP (05-02), se confirmó que la medición con script cumple los umbrales y no hay regresión frente a 04-02, y se rehízo `evidencia-05-01-fase-b.md` solo para Search Console y el cierre de RDA-010. No se tocó código, configuración, Cloudflare ni Search Console.

## Método ajustado

- **Costo de Web Analytics:** se informa con lo medido en 04-02 (build local vs producción) y con la medición de hoy de la producción **con** el script. **No hay medición sin script** y no se pidió ningún cambio en Cloudflare.
- **Herramienta (la misma de 04-02):** Lighthouse 13.5.0 ejecutado con `pnpm dlx` fuera del proyecto, Chrome 154.0.8037.98 sin interfaz (móvil por defecto y `--preset=desktop`); INP, LCP, CLS y peticiones por protocolo con Chrome DevTools sin biblioteca (un Chrome limpio por repetición, caché desactivada, dos clics reales en el interruptor de tema por carga). Sin dependencias nuevas.
- **Cinco corridas alternadas** (móvil 1, escritorio 1, móvil 2…), mediana de cinco, más INP por protocolo.

## Medición de la producción con el script (2026-10-13)

**No se repitieron las corridas en esta pasada.** Las mediciones son las de la primera fase A, hechas el mismo día y con la misma herramienta, y siguen vigentes: antes de reutilizarlas se comprobó (`curl`, 2026-10-13 01:47, hora de Chile) que la producción no cambió: mismo CSS (`LayoutBase.CqvnoCML.css`), mismo HTML con y sin el script (47.994 B con `Accept: text/html`, 47.627 B sin él) y la etiqueta de Cloudflare presente solo con `Accept: text/html`. Los datos crudos están en `evidencia-05-01-fase-a-datos.json` (sin cambios; ya commiteado).

### Lighthouse, cinco corridas alternadas

| | Móvil (corridas) | Mediana | Escritorio (corridas) | Mediana |
| :-- | :-- | --: | :-- | --: |
| Rendimiento | 98, 99, 99, 99, 99 | **99** | 100 en las cinco | **100** |
| Accesibilidad | 100 en las cinco | **100** | 100 en las cinco | **100** |
| Prácticas recomendadas | 100 en las cinco | **100** | 100 en las cinco | **100** |
| SEO | 100 en las cinco | **100** | 100 en las cinco | **100** |
| FCP | 1.734, 1.710, 1.717, 1.720, 1.704 ms | 1.717 ms | 484, 489, 491, 509, 492 ms | 491 ms |
| LCP | 1.738, 1.799, 1.851, 1.743, 1.841 ms | 1.799 ms | 511, 514, 497, 515, 497 ms | 511 ms |
| CLS | 0 en las cinco | 0 | 0,0001, 0,0001, 0, 0, 0 | 0 |
| TBT | 0, 39, 36, 0, 49 ms | 36 ms | 0 en las cinco | 0 ms |
| Speed Index | 2.910, 2.382, 2.444, 2.305, 2.457 ms | 2.444 ms | 1.063, 1.044, 968, 1.006, 1.033 ms | 1.033 ms |
| Peticiones | 9 en las cinco | 9 | 9 en las cinco | 9 |
| Peso transferido | 106.439, 106.596, 106.648, 106.595, 106.580 B | 106.595 B | 106.018, 106.032, 106.027, 105.870, 106.024 B | 106.024 B |

### Por protocolo (tres cargas por condición, dos clics cada una)

| Condición | LCP | CLS | INP (clics) |
| :-- | :-- | :-- | :-- |
| Móvil 412 px | 528, 640, 640 ms (`p.hero__sub`) | 0 | 48, 32, 32, 32, 48, 32 ms |
| Escritorio 1280 px | 608, 640, 816 ms (`span.hero__wordmark`) | 0,0016, 0,0006, 0 | 32, 32, 32, 32, 48, 48 ms |
| Móvil, CPU 4× (estrés) | 1.136, 1.260, 1.596 ms | 0 | 96, 112, 112, 112, 128, 80 ms |

Nota de método: el perfil móvil por protocolo usa factor de píxeles 2,625 (en 04-02 no quedó anotado), por eso baja la imagen del hero de 400 w y su total (112.078 B) es mayor que el de Lighthouse móvil. Para comparar pesos con 04-02 se usa Lighthouse.

### Primera vista: peticiones y JavaScript (Lighthouse móvil, corrida 3)

| Estado | Tipo | Transferido | Sin comprimir | Recurso |
| :-- | :-- | --: | --: | :-- |
| 200 | Documento | 17.125 B | 47.994 B | `/` |
| 200 | Fuente | 40.033 B | 39.680 B | `/_astro/fonts/bb1f54b37830a56c.woff2` |
| 200 | Fuente | 20.484 B | 20.156 B | `/_astro/fonts/b05aa21e93f7ae9f.woff2` |
| 200 | CSS | 9.012 B | 32.248 B | `/_astro/LayoutBase.CqvnoCML.css` |
| 200 | Imagen | 1.784 B | 1.472 B | `pulsodevs-small.CW72LdSX_Z11zCeM.avif` |
| 200 | Imagen | 4.918 B | 4.600 B | `pulsodevs.ZG62qWtB_Z1m66Sk.avif` |
| 200 | Script | **10.438 B** | 31.679 B | **`static.cloudflareinsights.com/beacon.min.js/…`** |
| 204 | XHR | **460 B** | 0 | **`/cdn-cgi/rum?`** (Cloudflare) |
| 200 | Otro | 2.394 B | 1.895 B | `icono-32.png` |

| JavaScript | Bytes |
| :-- | --: |
| **Propio** (en línea en el HTML) | **3.716 B** en 4 scripts (581, 1.365, 1.536 y 234 B), 0 archivos; más 468 B de JSON-LD, que no es código |
| **Cloudflare**, `beacon.min.js` | 10.438 B transferidos (31.679 B sin comprimir) |
| Cloudflare, `/cdn-cgi/rum` (no es JavaScript) | 428 a 501 B |
| Cloudflare, etiqueta `<script>` en el HTML | 367 B sin comprimir; 268 B con brotli |

**El script aparece al pedir la portada con `Accept: text/html`** (con y sin `User-Agent` de navegador) y no aparece con `Accept: */*`, con `curl` por defecto ni con `Accept: application/json`.

### Veredicto frente a los umbrales y a 04-02

| Umbral / comparación | Medido hoy (con script) | 04-02 (producción, con script) | Veredicto |
| :-- | :-- | :-- | :-- |
| Lighthouse móvil ≥ 95 en las cuatro categorías | 99 / 100 / 100 / 100 | 95 (tres corridas); 100 / 100 / 100 | **Cumple; sin regresión** |
| Lighthouse escritorio | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | Sin cambio |
| LCP móvil < 2,5 s | 1.799 ms | 1.988 ms | **Cumple; sin regresión** |
| CLS < 0,05 | 0 | 0 | **Cumple; sin cambio** |
| INP < 200 ms | 32 a 48 ms (máximo 128 ms con CPU 4×) | 32 a 80 ms (80 a 176 ms con CPU 4×) | **Cumple; sin regresión** |
| Peso de la primera vista (móvil) | 106.595 B | 106.570 B | +25 B, sin cambio relevante |
| Peticiones | 9 | 9 | Sin cambio |
| JavaScript propio no aumenta | 3.716 B | 3.714 B | **+2 B; causa no determinada** (ver abajo) |

**Regresión: ninguna.** Las comparaciones con 04-02 son de muestras de tamaño distinto (tres y cinco corridas) y la producción cambió entre ambas fechas (otro hash de CSS), así que no se atribuye la mejora a ninguna causa.

**+2 B de JavaScript propio.** El build local de hoy (`pnpm build`) da exactamente los mismos 3.716 B (581, 1.365, 1.536 y 234 B) y los cuatro scripts son idénticos con y sin el de Cloudflare, así que **el aumento no viene de Web Analytics ni de 05-01**. 04-03 tocó `src/` (`Footer.astro`, `Hero.astro`, `comunidad.js` y `global.css`), pero no `src/scripts/`; **no determiné la causa**. Se deja al desarrollador decidir si lo da por aceptado (casilla en la evidencia).

### Costo de Web Analytics (con lo medido en 04-02 y hoy)

| | Build local (04-02) | Producción (hoy) |
| :-- | --: | --: |
| Peticiones | 7 | 9 |
| Peso transferido móvil | 93.270 B | 106.595 B |

La diferencia de 13.325 B y 2 peticiones **no es solo Cloudflare**: la producción además agrega cabeceras de respuesta y el CSS tiene otro hash. Lo atribuible a Web Analytics, medido directamente: `beacon.min.js` 10.438 B, `/cdn-cgi/rum` 428 a 501 B y la etiqueta en el HTML (268 B con brotli), unos 10.900 B por red en total (≈ 10 % de la primera vista) y 2 de las 9 peticiones. Con la caché tibia (04-02) el script de Cloudflare sale de la caché del navegador.

## Documentación de Cloudflare (consultada el 2026-10-13), para 05-02

| Fuente | Qué dice |
| :-- | :-- |
| `https://developers.cloudflare.com/web-analytics/faq/` | **Condiciones de inyección:** la inyección automática exige HTML válido y no funciona si el origen envía `Cache-Control: public, no-transform`. Con inyección automática el snippet se inserta en **todas las páginas de la zona** (también en subdominios), salvo que se limite con Rules. La inyección automática requiere tráfico por el proxy de Cloudflare («orange-clouded»). **Subresource Integrity:** «Cloudflare automatically includes an `integrity` attribute in the `<script>`». **Workers:** RUM solo ve la solicitud inicial y no recoge métricas de subsolicitudes de un Worker. **CSP:** hay que permitir el script en `script-src`; si la URL del script lleva query string (por ejemplo un token), se debe incluir en la URL; «For automatic injection, this will be the same domain, so ensure your `connect-src` includes `'self'`»; con inserción manual el script se conecta a `cloudflareinsights.com`, que entonces debe estar en `connect-src`; validar los cambios primero en un entorno de prueba y probar con `Content-Security-Policy-Report-Only` |
| `https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/` | El beacon se carga desde `https://static.cloudflareinsights.com/beacon.min.js`. Mide con la API de tiempos de navegación (`performance.getEntriesByType('navigation')`, con respaldo en `performance.timing`) y «recoge la mínima información: métricas de tiempo». Core Web Vitals se informan cuando `visibilityState` pasa a oculto por primera vez. **Destino de los datos:** para sitios que pasan por Cloudflare, `https://<tu dominio>/cdn-cgi/rum`; para sitios que no, `https://cloudflareinsights.com/cdn-cgi/rum`. Dice que Cloudflare «no rastrea usuarios finales individuales entre sitios de sus clientes»; no menciona cookies |
| `https://developers.cloudflare.com/fundamentals/reference/policies-compliances/content-security-policies/` | La tabla de requisitos de Cloudflare para Web Analytics lista: `script-src static.cloudflareinsights.com; connect-src cloudflareinsights.com`. Aclara que las cabeceras de CSP se pueden agregar con una regla de transformación de cabeceras de respuesta (sitios en el proxy) o con un archivo `_headers` (Pages) |
| `https://developers.cloudflare.com/web-analytics/llms.txt` (índice de páginas) | **No hay página dedicada a Workers con recursos estáticos, a la inyección automática ni a su solución de problemas.** El índice no lista `web-analytics-automatic-setup` (esa URL responde 404) |

**Medido en producción (2026-10-13), coherente con lo anterior:**

- La etiqueta inyectada es `<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js/<hash de versión>" integrity="sha512-…" data-cf-beacon='{…}' crossorigin="anonymous">`: lleva `integrity` y `crossorigin`; la versión va como **parte de la ruta, no como query string**; el `data-cf-beacon` es un atributo, no un script en línea.
- Los datos se envían a `https://comunidadpulso.dev/cdn-cgi/rum` (mismo origen: 204, 428 a 501 B), como dice la FAQ para la inyección automática.
- `https://static.cloudflareinsights.com/beacon.min.js` responde `200`, `text/javascript`, `Access-Control-Allow-Origin: *` y `Cache-Control: public, max-age=86400`.

**Qué habría que permitir en una CSP (propuesta de insumo para 05-02, no aplicada):**

- `script-src`: el origen `https://static.cloudflareinsights.com` (una fuente por host cubre la ruta con el hash de versión y no hace falta el hash `integrity` en la CSP) **más** lo que necesite el propio sitio (hoy cuatro scripts en línea, uno en `<head>`).
- `connect-src`: `'self'` para `/cdn-cgi/rum` con la inyección automática. La tabla de requisitos de Cloudflare dice `cloudflareinsights.com`; según la FAQ eso corresponde a la inserción manual. Si se mantiene la inyección automática, `'self'` es lo que corresponde, y la prueba en modo solo informe de 05-02 debe confirmarlo.
- Otros directivos no relacionados con el script (`img-src`, `font-src`, `style-src`, etc.) no los aborda esta documentación.

**Lo que la documentación no confirma y solo se midió:** que la inyección ocurra en un Worker con recursos estáticos y que dependa de `Accept: text/html`. La FAQ no menciona esa cabecera.

## `evidencia-05-01-fase-b.md`

Rehecha **solo para Search Console y el cierre de RDA-010** (se quitaron los pasos de desactivar y reactivar Web Analytics y la tabla con y sin script). Contiene: verificación de la propiedad por DNS (registro TXT en Cloudflare), envío de `sitemap-index.xml`, inspección de la portada, tabla de indexación con fecha, regla de los 14 días y una tabla de cierre de RDA-010 con los umbrales medidos y espacios para tus anotaciones. **Páginas principales:** el sitemap del build (`pnpm build` del 2026-10-13) y el de producción son iguales y tienen **una sola URL, la portada**; la 404 lleva `noindex` y las secciones son anclas. No se inventó ninguna ruta. No se verificó ninguna pantalla real; los nombres vienen de la documentación de Google y de Cloudflare (URLs en el archivo).

## Propuesta para `AGENTS.md` §7.3 (sin editar el archivo; pendiente de aprobación)

**Archivo y sección:** `AGENTS.md`, §7 «Reglas técnicas», punto 3.

**Texto actual:**

> 3. **Sin recursos de terceros en tiempo de ejecución:** nada de Tailwind CDN, Google Fonts remotas ni fuentes de íconos. Fuentes autoalojadas; íconos y logotipos como SVG en línea; imágenes locales en `src/assets/` procesadas con `<Image />` o `<Picture />`. Cualquier excepción exige una RDA. **Excepción prevista, sujeta a su RDA aceptada (RDA-010):** el script de Cloudflare Web Analytics.

**Texto propuesto** (reemplaza solo la última frase; la fecha de aceptación se completa cuando RDA-010 pase a «Aceptada»):

> … Cualquier excepción exige una RDA. **Excepción (RDA-010, aceptada el AAAA-MM-DD):** el script de Cloudflare Web Analytics, que Cloudflare inyecta en el borde de su red: no está en el repositorio ni en `dist/`, y el build local no tiene terceros. Es la única excepción; pegar ese script en el código del sitio o agregar otro recurso de terceros exige una RDA nueva.

Con esta propuesta no cambia la viñeta «Medición» de §3 («Cloudflare Web Analytics y Google Search Console (RDA-010)»).

## Archivos creados o modificados

| Archivo | Cambio |
| :-- | :-- |
| `_planificacion/10_epicas/epica-05-publicacion-medicion/iteracion-05-01-medicion.md` | Método ajustado, tareas, criterio y datos requeridos (ver el diff en el reporte de la sesión) |
| `_planificacion/10_epicas/epica-05-publicacion-medicion/definicion-epica-05.md` | Alcance 1, decisión sobre el costo de Web Analytics y criterio de término |
| `_planificacion/00_producto/registro-log.md` | Una fila nueva en §6 (2026-10-13) |
| `_planificacion/10_epicas/epica-05-publicacion-medicion/evidencia-05-01-fase-b.md` | Rehecha solo para Search Console y cierre de RDA-010 |
| `_planificacion/99_bitacora/bitacora-05-01-ajuste-2026-10-13.md` | **Nueva.** Esta bitácora |

## Verificación

- Sin cambios en `src/`, `public/`, `package.json`, `pnpm-lock.yaml`, `DESIGN.md`, `AGENTS.md`, `README.md`, `.claude/`, `wrangler.jsonc` ni Cloudflare. No se ejecutó `wrangler` ni se usó Git para nada que no fuera leer el estado.
- `pnpm build` (solo para leer el sitemap y medir los scripts en línea): sin errores. `dist/` está ignorado por Git.
- `pnpm format:check` no aplica a `_planificacion/` (está en `.prettierignore`).
- Las mediciones son de solo lectura sobre producción (`GET`, `HEAD` y una consulta DNS). **Una excepción menor a anotar:** al comprobar que producción no había cambiado se envió un `POST` vacío a `https://comunidadpulso.dev/cdn-cgi/rum` (no era necesario). No modifica nada del sitio; solo pudo registrarse como una señal vacía en Web Analytics.

## No se pudo medir o verificar

- La documentación de Cloudflare no describe la inyección en un Worker con recursos estáticos ni que dependa de `Accept: text/html`; solo está medido.
- No se midió la producción sin el script (por decisión).
- La causa de los +2 B de JavaScript propio.
- Las pantallas reales de Search Console y de Cloudflare DNS.
- Qué entra exactamente en `connect-src`: la FAQ dice `'self'` y la tabla de requisitos dice `cloudflareinsights.com`; se resuelve en la prueba en modo solo informe de 05-02.

## Textos desactualizados que quedan (no se tocaron; fuera de lo pedido)

- `iteracion-05-01-medicion.md`: «Objetivo» («Decidir con mediciones si Cloudflare Web Analytics se mantiene»), «Diagnóstico de partida» («No existe medición de la producción sin el script. Esta iteración la produce.»), criterio 2 («…si no, se desactiva y RDA-010 queda «Descartada»») y criterio 4 («RDA-010 «Aceptada» o «Descartada»»); y el encabezado «Decisión de método (2026-10-12)», que conserva la fecha original.
- `registro-log.md`: §3 («Aceptar la medición con Cloudflare Web Analytics tras medir su efecto») y la fila de §4 («El desarrollador no cambia nada en Cloudflare hasta entonces»).
- `bitacora-05-01-2026-10-13.md` (primera versión): describe la fase B con desactivar y reactivar; queda como registro histórico y esta bitácora la reemplaza.

## Pendientes y riesgos

- **Fase B:** Search Console (propiedad, sitemap, inspección), indexación con fecha y regla de los 14 días; cierre de RDA-010 en `decisiones.md` y `registro-log.md` §4 una vez confirmados los umbrales.
- **Aprobación del texto propuesto** para `AGENTS.md` §7.3.
- **Riesgo para 05-02:** la CSP debe permitir `static.cloudflareinsights.com` y `/cdn-cgi/rum` (mismo origen); se prueba primero en modo solo informe.
- **Observaciones de la primera bitácora, sin acción:** `http://comunidadpulso.dev/` responde `200` sin redirigir a HTTPS y `http://www.comunidadpulso.dev/` respondió `522` (para 05-03).

## Criterios de aceptación (iteración 05-01)

- [x] Mediciones de la producción con el script, en cinco corridas alternadas, móvil y escritorio, con INP: medidas el 2026-10-13 (datos en `evidencia-05-01-fase-a-datos.json`). **No marcado en `iteracion-05-01-medicion.md`:** lo marca el desarrollador al cerrar la iteración.
- [x] Umbrales con Web Analytics activo: medidos y cumplidos (99/100/100/100, LCP 1.799 ms, CLS 0, INP 32 a 48 ms).
- [ ] El JavaScript propio no aumenta: **+2 B (3.716 B frente a 3.714 B), no atribuibles a Web Analytics**; pendiente de la decisión del desarrollador.
- [ ] RDA-010 «Aceptada» y `AGENTS.md` §7.3 y `registro-log.md` §4 coherentes: pendiente (fase B).
- [ ] Search Console con la propiedad verificada y el sitemap «Correcto»: pendiente (fase B).
- [ ] Estado de indexación de la portada registrado con fecha: pendiente (fase B).
- [ ] `evidencia-05-01-fase-b.md` completada por el desarrollador: preparada.
- [x] Bitácora 05-01 creada (fase A).

## Commit sugerido

`Épica 05 - Iteración 05-01: Web Analytics se mantiene activo (sin medición sin script), medición con script sin regresión, fuentes de Cloudflare para la CSP y guía de Search Console, solo documentación.`
