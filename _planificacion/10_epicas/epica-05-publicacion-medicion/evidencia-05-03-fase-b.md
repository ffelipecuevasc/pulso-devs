# Evidencia 05-03 · Fase B (desarrollador)

- **Iteración:** 05-03 · Verificación final en producción
- **Responsable:** desarrollador. El agente no ejecuta `git commit`, `git push` ni `wrangler`, y contra producción solo hace `GET` y `HEAD`.
- **Estado:** Completada
- **Fecha de la fase A:** 13-10-2026 (`bitacora-05-03-fase-a-2026-10-13.md`)
- **Fecha de tus resultados:** 13-10-2026

**Cómo usar este archivo.** Cada parte tiene una tabla con una columna «Anotación» para lo que realmente veas, con fecha y hora. No supongo pantallas de herramientas ni de tu teléfono que no haya verificado: donde no sé cómo se ve algo, la instrucción dice qué anotar y no cómo se ve. Lo que el agente midió en la fase A está resumido en la parte 0; si algo de lo que ves no coincide, anótalo y avisa antes de seguir.

Lo que **no** necesitas hacer: probar en Safari, iPhone, VoiceOver, Narrador de Windows ni `apple-touch-icon`. Quedan como «no verificado, riesgo aceptado por el desarrollador» (declaración del 2026-10-12, en `iteracion-05-03-verificacion-final.md`).

---

## Parte 0 · Lo que midió el agente (resumen, 2026-10-13)

Todo es de solo lectura contra `https://comunidadpulso.dev/` y está detallado en la bitácora de la fase A. Chrome 155.0.8059.40 (headless) y Lighthouse 13.5.0 (`pnpm dlx`, fuera del proyecto).

| Tema | Resultado medido |
| :--- | :--------------- |
| Portada | `200`; `content-security-policy` idéntica a `public/_headers` (524 caracteres); sin `content-security-policy-report-only`; `x-content-type-options`, `referrer-policy` y `x-frame-options` presentes; `Cache-Control: public, max-age=0, must-revalidate` |
| Ruta inexistente | `404` con `<meta name="robots" content="noindex">` y las mismas cabeceras |
| `robots.txt`, `sitemap-index.xml`, `sitemap-0.xml` | `200` los tres; el sitemap lista solo `https://comunidadpulso.dev/` |
| `https://www.comunidadpulso.dev/` | `301` con `Location: https://comunidadpulso.dev/` (conserva ruta y consulta) |
| `http://comunidadpulso.dev/` | `200` **sin redirigir a HTTPS** (2 de 2 intentos) |
| `http://www.comunidadpulso.dev/` | `522` tras ~19,5 s (3 de 3 intentos) |
| Lighthouse móvil (mediana de cinco alternadas) | 98 / 100 / 100 / 100 (las cinco corridas dieron 98); LCP 1.839 ms; CLS 0; TBT 37 ms |
| Lighthouse escritorio (mediana de cinco) | 100 / 100 / 100 / 100; LCP 526 ms; CLS 0; TBT 0 ms |
| INP por protocolo (sin estrés) | 32 a 48 ms (móvil 412 px y escritorio 1280 px) |
| JSON-LD | Un bloque `Organization`, JSON válido |
| Imagen de vista previa | `200`, `image/png`, 1200 × 630 px, 25.676 B; coincide con `og:image:width` y `og:image:height` |

---

## Parte 1 · Validar el JSON-LD con herramientas públicas

Pega la dirección `https://comunidadpulso.dev/` (o el código) en cada herramienta y anota lo que informa. Si una herramienta pide iniciar sesión, anótalo y sigue con la otra.

| Herramienta | Dirección | Qué anotar | Anotación (fecha y hora) |
| :---------- | :-------- | :--------- | :----------------------- |
| Validador de Schema.org | https://validator.schema.org/ | Tipo detectado, cantidad de errores y de advertencias | **2026-10-13, 20:58 hrs:** Detecta 1 elemento de tipo `Organization` (`0 ERRORES`, `0 ADVERTENCIAS`) con las propiedades `@type` (`Organization`), `name` (`Comunidad Pulso Devs`), `url` (`https://comunidadpulso.dev/`), `logo` (`https://comunidadpulso.dev/icono-192.png`), `description` (`Pulso Devs es una comunidad latinoamericana para desarrolladores junior de frontend, backend, fullstack e ingeniería de IA. Talleres gratuitos en vivo, apoyo para tus proyectos y oportunidades para crecer.`) y `sameAs` (`https://www.linkedin.com/company/comunidad-pulso-devs/home/`). |
| Prueba de resultados enriquecidos de Google | https://search.google.com/test/rich-results | Si rastrea la página sin errores y qué elementos detecta (en 04-01 no detectó elementos porque `Organization` no es un tipo que esa herramienta muestre; no es un fallo) | **2026-10-13, 20:59:46 hrs:** Rastreado correctamente sin errores («Rastreado correctamente el 13 oct 2026, 20:59:46»). Informa: «No se ha detectado ningún elemento. No se han detectado resultados enriquecidos en esta URL» (comportamiento esperado para el tipo `Organization`). |

Texto esperado, según lo medido por el agente (no según tu pantalla): un elemento `Organization` con las propiedades `name`, `url`, `logo`, `description` y `sameAs`.

---

## Parte 2 · Vista previa al compartir

Comparte `https://comunidadpulso.dev/` y anota lo que ves: imagen, título, descripción y dominio. Si ves una versión anterior, anótalo: **las plataformas guardan la vista previa en caché y pueden mostrar una versión anterior** (no hay una cifra oficial verificada de cuánto dura; ver la bitácora). Lo que el agente midió: `og:image` apunta a una imagen de 1200 × 630 px y 25.676 B, y las etiquetas `og:title`, `og:description`, `og:url`, `og:type` y `twitter:*` están presentes.

| Plataforma | Cómo probar | Qué anotar | Anotación (fecha y hora) |
| :--------- | :---------- | :--------- | :----------------------- |
| WhatsApp | Pega la dirección en un chat (por ejemplo, en uno contigo mismo) sin enviarla, o envíala | Imagen (tarjeta grande o pequeña), título, descripción, dominio; si el texto se corta | **2026-10-13, 21:04 hrs:** Muestra tarjeta grande en la parte superior con la imagen actual de `Pulso Devs` (fondo oscuro con isotipo azul/celeste y texto blanco). **Título:** `Comunidad Pulso Devs` (completo). **Descripción:** `Una comunidad para desarrolladores junior que quieren aprender, construir y crecer juntos. Abierta a` (el texto se corta al final de la segunda línea después de «Abierta a»). **Dominio:** `comunidadpulso.dev`. |
| LinkedIn | Pega la dirección en el compositor de una publicación, sin publicar. Si ves una versión anterior, puedes usar el Post Inspector de LinkedIn (dirección habitual `https://www.linkedin.com/post-inspector/`, no consultada por el agente; requiere iniciar sesión) | Imagen, título, dominio; si es una versión anterior (caché) o la actual | **2026-10-13, 21:05 hrs:** Muestra la versión actual (sin problemas de caché) en formato de tarjeta horizontal compacta con miniatura a la izquierda (imagen de `Pulso Devs` sobre fondo oscuro). **Título:** `Comunidad Pulso Devs` (completo). **Dominio:** `comunidadpulso.dev` (el formato del compositor de LinkedIn no muestra línea de descripción). |
---

## Parte 3 · Estado de indexación de la portada en Search Console

No se exige que esté indexada. Solo se registra el estado con fecha (en 05-01 quedó: portada «La URL está en Google», sitemap «Correcto» con 1 página descubierta, declarado por el desarrollador el 2026-10-13).

| Dato | Anotación |
| :--- | :-------- |
| Fecha y hora de la consulta | 2026-10-13, 21:10 hrs |
| Propiedad consultada | `comunidadpulso.dev` |
| Estado de `https://comunidadpulso.dev/`: copia el texto exacto que muestra Search Console | **«La URL está en Google»** — «Siempre que no esté sujeta a una solicitud de eliminación o a una acción manual, puede aparecer con todas las mejoras relevantes en los resultados de la Búsqueda de Google.» / **Indexación de páginas:** «La página está indexada» / **HTTPS:** «La página se sirve a través de HTTPS» |
| Estado del sitemap `sitemap-index.xml`: texto exacto y páginas descubiertas | **Sitemap:** `https://comunidadpulso.dev/sitemap-index.xml` · **Tipo:** `Índice de sitemaps` · **Enviado:** `13 oct 2026` · **Última lectura:** `13 oct 2026` · **Estado:** `Correcto` · **Páginas descubiertas:** `1` · **Vídeos descubiertos:** `0` |
| ¿Hay algún aviso o error? Cópialo | Ningún error ni advertencia en la inspección de URL ni en Sitemaps. En «Descripción general > Rendimiento» solo muestra el aviso informativo de propiedad reciente: «Se están procesando los datos; vuelve a comprobar esta sección mañana». |

---

## Parte 4 · Revisión en un teléfono Android real, claro y oscuro

Anota el modelo, la versión de Android y el navegador con su versión. No pongo una lista cerrada de pantallas del teléfono porque no las verifiqué: anota lo que ves y, si algo no se puede comprobar, escribe «no se pudo ver» y por qué.

| Dato | Anotación                                                                                             |
| :--- |:------------------------------------------------------------------------------------------------------|
| Teléfono, Android y navegador (con versión) | Samsung Galaxy A55+ · Android 16 · Google Chrome y Mozilla Firefox (versiones actuales al 2026-10-13) |
| Fecha y hora | 2026-10-13, 21:15 hrs                                                                                 |

| # | Qué revisar | Claro | Oscuro | Observación |
| :- | :---------- | :---- | :----- | :---------- |
| 1 | La portada carga completa, sin desplazamiento horizontal ni textos cortados | OK | OK | Probado en Google Chrome y Mozilla Firefox; diseño responsivo correcto sin scroll lateral ni cortes de texto. |
| 2 | El menú se abre y se cierra, y un enlace del menú lleva a su sección | OK | OK | Abre y cierra correctamente; la navegación por anclas lleva a la sección correspondiente en ambos navegadores. |
| 3 | El interruptor de tema cambia el tema y se mantiene al recargar | OK | OK | El cambio entre modo claro y oscuro funciona correctamente y persiste en `localStorage` tras recargar la página. |
| 4 | El botón «Únete» abre el grupo de WhatsApp | OK | OK | Redirige y abre correctamente la invitación al grupo de WhatsApp. |
| 5 | La página 404 (una ruta que no exista) se ve bien y su botón funciona | OK | OK | Probada con ruta inexistente; renderiza correctamente en ambos temas y el botón de retorno vuelve al inicio. |
| 6 | **Ícono de 192 px** (`https://comunidadpulso.dev/icono-192.png`, PNG de 192 × 192 px y 11.253 B según el agente): anota dónde lo viste (por ejemplo, si tu navegador lo muestra al agregar el sitio a la pantalla de inicio) y si se ve nítido y sin deformar. Si no encuentras dónde se muestra, escribe «no se pudo ver» | OK | OK | Verificado en el navegador / acceso directo en pantalla de inicio; se visualiza nítido, con las proporciones correctas y sin deformaciones. |
---

## Parte 5 · Decisión sobre `www` y `http`

**Medición inicial, antes del cambio.** El agente midió (solo lectura, 2026-10-13, entre las 19:40 y las 19:50, hora de esta máquina); **no propone cambios en Cloudflare**, solo informa para que decidas:

| Dirección | Respuesta medida |
| :-------- | :--------------- |
| `https://www.comunidadpulso.dev/` | `301` a `https://comunidadpulso.dev/` (conserva ruta y consulta): `www` redirige al dominio sin `www`, como pide la Épica 01 |
| `http://comunidadpulso.dev/` | `200`, sirve el sitio por HTTP sin redirigir a HTTPS |
| `http://www.comunidadpulso.dev/` | `522` tras ~19,5 s, en 3 de 3 intentos |
| `strict-transport-security` en `https://comunidadpulso.dev/` | Ausente (0 coincidencias) |

Qué causa el `522` y por qué HTTP no redirige a HTTPS: **no verificado** (no se miró la configuración de Cloudflare).

### Medición posterior al cambio (agente, 2026-10-13, solo `HEAD`; ningún `POST`)

**Declarado por el desarrollador: activó Always Use HTTPS en Cloudflare a las 20:04 del 2026-10-13** (hora del desarrollador; captura del panel de la zona `comunidadpulso.dev`, plan free: la opción aparecía activada y «This setting was last changed a minute ago»; la captura no se copia al repositorio). El panel advierte que activar la opción mientras el origen también fuerza HTTPS puede causar bucles de redirección; por eso se buscó un bucle (no hay).

**Cuándo se midió.** Primera consulta del agente: 20:07:01 en el reloj de esta máquina, que equivale a **20:05:57 a 20:05:58 según la cabecera `Date` de Cloudflare** (23:05:58 GMT; hora de Chile = GMT−3). El reloj de esta máquina iba **64 a 65 s adelantado** respecto del `Date` de Cloudflare (medido en 6 respuestas). La desviación del reloj del desarrollador **no se conoce**, así que no se puede dar la demora exacta desde sus 20:04: como máximo ~2 min según el servidor.

| Dato | Anotación |
| :--- | :-------- |
| Hora del aviso del desarrollador (su reloj) | 20:04 del 2026-10-13 (declarado) |
| Hora de la primera consulta del agente (`Date` de Cloudflare) | 20:05:58 (23:05:58 GMT) |
| Hora en que cambió el comportamiento | **No medida**: en la primera consulta la redirección ya estaba activa, así que no se repitió cada 2 minutos. Fue como máximo a las 20:05:58 (servidor) |
| ¿Hay bucles de redirección? | No: ninguna cadena pasó de 2 saltos y todas terminan en `200` o `404` |
| ¿Sigue habiendo `522`? | No: `http://www.comunidadpulso.dev/` ya responde `301` en 0,06 s |

**Saltos por URL** (`curl -I`, sin seguir y luego siguiendo a mano, máximo 5 saltos; los tiempos son `time_total` de `curl` de cada petición `HEAD`):

| URL pedida | Salto | URL del salto | Código | `location` | Tiempo |
| :--------- | :---- | :------------ | :----- | :--------- | :----- |
| `http://comunidadpulso.dev/` | 0 | `http://comunidadpulso.dev/` | `301` | `https://comunidadpulso.dev/` | 0,10 s |
| | 1 | `https://comunidadpulso.dev/` | `200` | — | 0,16 s |
| `http://comunidadpulso.dev/ruta-inexistente?x=1` | 0 | `http://comunidadpulso.dev/ruta-inexistente?x=1` | `301` | `https://comunidadpulso.dev/ruta-inexistente?x=1` | 0,09 s |
| | 1 | `https://comunidadpulso.dev/ruta-inexistente?x=1` | `404` | — | 0,15 s |
| `http://www.comunidadpulso.dev/` | 0 | `http://www.comunidadpulso.dev/` | `301` | `https://www.comunidadpulso.dev/` | 0,06 s |
| | 1 | `https://www.comunidadpulso.dev/` | `301` | `https://comunidadpulso.dev/` | 0,14 s |
| | 2 | `https://comunidadpulso.dev/` | `200` | — | 0,62 s |
| `https://www.comunidadpulso.dev/` | 0 | `https://www.comunidadpulso.dev/` | `301` | `https://comunidadpulso.dev/` | 0,57 s |
| | 1 | `https://comunidadpulso.dev/` | `200` | — | 0,65 s |
| `https://comunidadpulso.dev/` | 0 | `https://comunidadpulso.dev/` | `200` | — | 0,64 s |

| URL pedida | ¿Destino final en `https://comunidadpulso.dev/…`? | ¿Conserva ruta y consulta? | Saltos | Bucle |
| :--------- | :----------------------------------------------- | :------------------------- | :----- | :---- |
| `http://comunidadpulso.dev/` | Sí | No aplica (ruta `/`) | 1 | No |
| `http://comunidadpulso.dev/ruta-inexistente?x=1` | Sí | Sí: `/ruta-inexistente?x=1` llega íntegra; el destino responde `404`, como la portada para una ruta inexistente | 1 | No |
| `http://www.comunidadpulso.dev/` | Sí (pasa primero por `https://www`) | No aplica (ruta `/`) | 2 | No |
| `https://www.comunidadpulso.dev/` | Sí | No aplica en esta consulta (con `/ruta?x=1` se midió antes: la conserva) | 1 | No |
| `https://comunidadpulso.dev/` | Sí (es el destino) | No aplica | 0 | No |

**Portada `https://comunidadpulso.dev/`** (consulta de las 20:07:19, reloj de esta máquina; `Date` 23:06:14 GMT): `200`; `content-security-policy` **idéntica** a la línea de `public/_headers` (524 caracteres, `cmp` sin diferencias); **sin** `content-security-policy-report-only`; `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin` y `x-frame-options: DENY` presentes; `Cache-Control: public, max-age=0, must-revalidate`. **Sin cambios** respecto de la medición anterior. `strict-transport-security`: **no apareció** (0 coincidencias en la portada, en las dos redirecciones `http://`, en `https://www` y en la 404).

**No medido:** la hora exacta en que cambió el comportamiento (ya estaba activo en la primera consulta); la configuración de Cloudflare (no se miró); `strict-transport-security` más allá de la ausencia de la cabecera; el comportamiento con `POST` u otros métodos (solo `HEAD` y `GET`); si `http://www/ruta?x=1` conserva ruta y consulta en sus dos saltos (no se pidió esa URL).

Las dos filas de «Decisión» de abajo se escribieron **antes** del cambio, cuando `http://` no redirigía y `http://www` daba `522`. Se dejan tal cual y en blanco para que las completes o las marques como resueltas.

| Decisión | Anotación |
| :------- | :-------- |
| Decisión del desarrollador sobre `http://` sin `www` (sin redirección a HTTPS) | **Resuelto** el 2026-10-13 al activar *Always Use HTTPS* en Cloudflare: ahora responde `301` directo a `https://comunidadpulso.dev/` conservando ruta y consulta. Se acepta como está (la ausencia de cabecera HSTS `strict-transport-security` queda como riesgo aceptado, sin abrir hallazgo nuevo). |
| Decisión del desarrollador sobre `http://www` (`522`) | **Resuelto** el 2026-10-13 al activar *Always Use HTTPS* en Cloudflare: ya no da `522`, responde `301` a `https://www.comunidadpulso.dev/` y luego `301` a `https://comunidadpulso.dev/` sin bucles. Se acepta como está. |
| Fecha | 2026-10-13 (21:17 hrs) |

---

## Parte 6 · Clasificación de hallazgos y documentación

El agente propone la clasificación de los hallazgos abiertos y los textos para `README.md` y `registro-log.md` en la entrega de la fase A (no se editó ningún archivo). Anota aquí tus decisiones.

| Tema | Anotación |
| :--- | :-------- |
| Frase de aprobación de la clasificación de hallazgos (y excepciones) | **Aprobada** la clasificación de hallazgos propuesta por el agente en la fase A (2026-10-13): todos los hallazgos restantes quedan cerrados como «resuelto» o «riesgo aceptado por el desarrollador» con fecha 2026-10-13 (incluyendo la actualización de la Parte 5 donde `http://` y `http://www` quedaron resueltos tras activar *Always Use HTTPS*). Sin excepciones adicionales. |
| Frase de aprobación del texto de `README.md` | **Aprobado** sin cambios el texto propuesto por el agente en la fase A para `README.md` (autorizado para aplicar). |
| Frase de aprobación del texto de `registro-log.md` | **Aprobado** sin cambios el texto propuesto por el agente en la fase A para `registro-log.md` (autorizado para aplicar). |
| La Épica 06 («en evaluación») sigue como está: confirmación | **Confirmado:** la Épica 06 se mantiene «en evaluación» sin cambios. |

---

## Criterios de aceptación de 05-03

«Según el agente» solo dice lo que se midió o leyó en la fase A; la columna «Desarrollador» es para tu confirmación o tu anotación.

| Criterio | Según el agente (fase A, 2026-10-13) | Desarrollador |
| :------- | :----------------------------------- | :------------ |
| El sitio cumple los criterios de la Épica 04 en producción: Lighthouse 95 o más en Rendimiento y 100 en las otras tres, LCP < 2,5 s, CLS < 0,05, INP < 200 ms | Medido: móvil 98 / 100 / 100 / 100 y escritorio 100 / 100 / 100 / 100 (mediana de cinco alternadas); LCP 1.839 ms (móvil) y 526 ms (escritorio); CLS 0; INP 32 a 48 ms por protocolo | **Confirmado y aprobado** (2026-10-13). |
| Sin hallazgos abiertos de severidad Alta | Leído en `auditoria-tecnica.md`: los tres de severidad Alta (AUD-01-005, AUD-01-012 y AUD-01-016) están resueltos | **Confirmado** (2026-10-13). |
| Todo hallazgo abierto queda clasificado: resuelto o «riesgo aceptado» con fecha | Propuesta entregada; falta tu decisión | **Aprobado y clasificado** con fecha 2026-10-13 (ver Parte 5 y Parte 6). |
| Estado de indexación registrado con fecha | Pendiente (parte 3) | **Completado y registrado** el 2026-10-13 a las 21:10 hrs en la Parte 3. |
| Evidencia del desarrollador registrada en este archivo | Pendiente (partes 1 a 5) | **Completada y registrada** en las Partes 1 a 5 de este archivo el 2026-10-13. |
| Bitácora 05-03 creada | Creada la de la fase A (`bitacora-05-03-fase-a-2026-10-13.md`); la del cierre, pendiente | **Autorizada** la creación de la bitácora de cierre tras entregar esta Fase B completada. |