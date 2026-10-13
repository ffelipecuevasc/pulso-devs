# Evidencia 05-03 · Fase B (desarrollador)

- **Iteración:** 05-03 · Verificación final en producción
- **Responsable:** desarrollador. El agente no ejecuta `git commit`, `git push` ni `wrangler`, y contra producción solo hace `GET` y `HEAD`.
- **Estado:** Pendiente (la fase A del agente está hecha; esta fase la completa el desarrollador)
- **Fecha de la fase A:** 2026-10-13 (`bitacora-05-03-fase-a-2026-10-13.md`)
- **Fecha de tus resultados:** _________

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
| Validador de Schema.org | https://validator.schema.org/ | Tipo detectado, cantidad de errores y de advertencias | |
| Prueba de resultados enriquecidos de Google | https://search.google.com/test/rich-results | Si rastrea la página sin errores y qué elementos detecta (en 04-01 no detectó elementos porque `Organization` no es un tipo que esa herramienta muestre; no es un fallo) | |

Texto esperado, según lo medido por el agente (no según tu pantalla): un elemento `Organization` con las propiedades `name`, `url`, `logo`, `description` y `sameAs`.

---

## Parte 2 · Vista previa al compartir

Comparte `https://comunidadpulso.dev/` y anota lo que ves: imagen, título, descripción y dominio. Si ves una versión anterior, anótalo: **las plataformas guardan la vista previa en caché y pueden mostrar una versión anterior** (no hay una cifra oficial verificada de cuánto dura; ver la bitácora). Lo que el agente midió: `og:image` apunta a una imagen de 1200 × 630 px y 25.676 B, y las etiquetas `og:title`, `og:description`, `og:url`, `og:type` y `twitter:*` están presentes.

| Plataforma | Cómo probar | Qué anotar | Anotación (fecha y hora) |
| :--------- | :---------- | :--------- | :----------------------- |
| WhatsApp | Pega la dirección en un chat (por ejemplo, en uno contigo mismo) sin enviarla, o envíala | Imagen (tarjeta grande o pequeña), título, descripción, dominio; si el texto se corta | |
| LinkedIn | Pega la dirección en el compositor de una publicación, sin publicar. Si ves una versión anterior, puedes usar el Post Inspector de LinkedIn (dirección habitual `https://www.linkedin.com/post-inspector/`, no consultada por el agente; requiere iniciar sesión) | Imagen, título, dominio; si es una versión anterior (caché) o la actual | |

---

## Parte 3 · Estado de indexación de la portada en Search Console

No se exige que esté indexada. Solo se registra el estado con fecha (en 05-01 quedó: portada «La URL está en Google», sitemap «Correcto» con 1 página descubierta, declarado por el desarrollador el 2026-10-13).

| Dato | Anotación |
| :--- | :-------- |
| Fecha y hora de la consulta | |
| Propiedad consultada | |
| Estado de `https://comunidadpulso.dev/`: copia el texto exacto que muestra Search Console | |
| Estado del sitemap `sitemap-index.xml`: texto exacto y páginas descubiertas | |
| ¿Hay algún aviso o error? Cópialo | |

---

## Parte 4 · Revisión en un teléfono Android real, claro y oscuro

Anota el modelo, la versión de Android y el navegador con su versión. No pongo una lista cerrada de pantallas del teléfono porque no las verifiqué: anota lo que ves y, si algo no se puede comprobar, escribe «no se pudo ver» y por qué.

| Dato | Anotación |
| :--- | :-------- |
| Teléfono, Android y navegador (con versión) | |
| Fecha y hora | |

| # | Qué revisar | Claro | Oscuro | Observación |
| :- | :---------- | :---- | :----- | :---------- |
| 1 | La portada carga completa, sin desplazamiento horizontal ni textos cortados | | | |
| 2 | El menú se abre y se cierra, y un enlace del menú lleva a su sección | | | |
| 3 | El interruptor de tema cambia el tema y se mantiene al recargar | | | |
| 4 | El botón «Únete» abre el grupo de WhatsApp | | | |
| 5 | La página 404 (una ruta que no exista) se ve bien y su botón funciona | | | |
| 6 | **Ícono de 192 px** (`https://comunidadpulso.dev/icono-192.png`, PNG de 192 × 192 px y 11.253 B según el agente): anota dónde lo viste (por ejemplo, si tu navegador lo muestra al agregar el sitio a la pantalla de inicio) y si se ve nítido y sin deformar. Si no encuentras dónde se muestra, escribe «no se pudo ver» | | | |

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
| Decisión del desarrollador sobre `http://` sin `www` (sin redirección a HTTPS) | Aceptar como está / revisar aparte (abrir un hallazgo nuevo): _________ |
| Decisión del desarrollador sobre `http://www` (`522`) | Aceptar como está / revisar aparte (abrir un hallazgo nuevo): _________ |
| Fecha | |

---

## Parte 6 · Clasificación de hallazgos y documentación

El agente propone la clasificación de los hallazgos abiertos y los textos para `README.md` y `registro-log.md` en la entrega de la fase A (no se editó ningún archivo). Anota aquí tus decisiones.

| Tema | Anotación |
| :--- | :-------- |
| Frase de aprobación de la clasificación de hallazgos (y excepciones) | |
| Frase de aprobación del texto de `README.md` | |
| Frase de aprobación del texto de `registro-log.md` | |
| La Épica 06 («en evaluación») sigue como está: confirmación | |

---

## Criterios de aceptación de 05-03

«Según el agente» solo dice lo que se midió o leyó en la fase A; la columna «Desarrollador» es para tu confirmación o tu anotación.

| Criterio | Según el agente (fase A, 2026-10-13) | Desarrollador |
| :------- | :----------------------------------- | :------------ |
| El sitio cumple los criterios de la Épica 04 en producción: Lighthouse 95 o más en Rendimiento y 100 en las otras tres, LCP < 2,5 s, CLS < 0,05, INP < 200 ms | Medido: móvil 98 / 100 / 100 / 100 y escritorio 100 / 100 / 100 / 100 (mediana de cinco alternadas); LCP 1.839 ms (móvil) y 526 ms (escritorio); CLS 0; INP 32 a 48 ms por protocolo | |
| Sin hallazgos abiertos de severidad Alta | Leído en `auditoria-tecnica.md`: los tres de severidad Alta (AUD-01-005, AUD-01-012 y AUD-01-016) están resueltos | |
| Todo hallazgo abierto queda clasificado: resuelto o «riesgo aceptado» con fecha | Propuesta entregada; falta tu decisión | |
| Estado de indexación registrado con fecha | Pendiente (parte 3) | |
| Evidencia del desarrollador registrada en este archivo | Pendiente (partes 1 a 5) | |
| Bitácora 05-03 creada | Creada la de la fase A (`bitacora-05-03-fase-a-2026-10-13.md`); la del cierre, pendiente | |
