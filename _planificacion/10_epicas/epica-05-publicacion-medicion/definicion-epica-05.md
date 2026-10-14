# Épica 05 · Publicación y medición

- **Estado:** Terminada (2026-10-13)
- **Depende de:** Épica 04 terminada
- **Objetivo:** decidir con mediciones si se mantiene Cloudflare Web Analytics, medir la visibilidad en Google, endurecer la seguridad con una política `Content-Security-Policy` y verificar el sitio completo en `https://comunidadpulso.dev`.

## Contexto (desde la Épica 04)

Estado al iniciar la épica (2026-10-12); la situación actual está en el registro y en las iteraciones 05-01 a 05-03.

- Cloudflare Web Analytics **ya está activo en producción**: Cloudflare inyecta el script en el borde. El build local no tiene terceros. Está registrado en `registro-log.md` §4 y RDA-010 sigue «Propuesta».
- La política `Content-Security-Policy` hoy es solo `frame-ancestors 'none'` en `public/_headers`. Se completa en esta épica (decisión del desarrollador, 2026-10-11).
- Los hallazgos AUD-02-005 y AUD-02-008 (transición de tema y clics durante el efecto) quedaron «Parcial: verificados en Chrome y Firefox; falta Safari».

## Alcance

1. Cloudflare Web Analytics: se mantiene activo por decisión del desarrollador (2026-10-13); RDA-010 se acepta si la medición de la producción con el script no muestra regresiones (05-01).
2. Google Search Console: propiedad verificada, sitemap enviado y estado de indexación registrado (05-01).
3. Política `Content-Security-Policy` completa, probada primero en modo solo informe y luego aplicada (05-02).
4. Verificación final del sitio en producción y cierre del ciclo inicial (05-03).

## Iteraciones

| Iteración | Nombre                                               | Depende de |
| :-------- | :--------------------------------------------------- | :--------- |
| 05-01     | Medición: Cloudflare Web Analytics y Search Console  | 04-03      |
| 05-02     | Política Content-Security-Policy                     | 05-01 (terminada, 2026-10-13) |
| 05-03     | Verificación final en producción                     | 05-02      |

## Decisiones del desarrollador (2026-10-12)

- La CSP tiene iteración propia, porque puede romper el sitio y depende de la decisión sobre RDA-010.
- Web Analytics se **mantiene activo** (decisión del desarrollador, 2026-10-13): no se desactiva la inyección en el panel de Cloudflare ni se mide la producción sin el script. El costo se informa con lo medido en 04-02 (build local vs producción) y se mide la producción con el script para confirmar que no hay regresiones.
- **Safari, iPhone, VoiceOver, Narrador de Windows y `apple-touch-icon`: riesgo aceptado.** No hay equipo Apple. Los hallazgos que dependen de ellos se cierran en 05-03 como «no verificado, riesgo aceptado por el desarrollador», con fecha.
- La indexación en Google se **registra con fecha** y no se exige para cerrar la épica. Si pasan 14 días desde el envío del sitemap sin indexar, se abre un seguimiento aparte.
- Las mediciones de Lighthouse usan la **mediana de cinco corridas alternadas** (decisión de 04-02).

## Fuera de alcance

- Medir clics en el botón de WhatsApp (requiere una RDA nueva).
- Google Ads, Google Analytics y Google Tag Manager.
- Nuevas funciones: entran como épicas o iteraciones nuevas.

## Criterio de término

- [x] RDA-010 «Aceptada» por decisión del desarrollador (2026-10-13), con mediciones de la producción con el script que confirmen que no hay regresiones. _Respaldo: `decisiones.md` (RDA-010 «Aceptada», 2026-10-13) y mediciones de 05-01._
- [x] Search Console con la propiedad verificada, el sitemap procesado y el estado de indexación registrado con fecha. _Respaldo: 05-01 y parte 3 de `evidencia-05-03-fase-b.md` (declarado por el desarrollador, 2026-10-13): propiedad verificada, sitemap «Correcto» con 1 página descubierta, portada «La URL está en Google»._
- [x] Política `Content-Security-Policy` aplicada, sin violaciones en consola y con Lighthouse sin regresiones. _Respaldo: 05-02 (aplicada, 0 violaciones; Rendimiento móvil 95 aceptado por el desarrollador, 2026-10-13, base 99) y 05-03 (cabecera idéntica a `public/_headers`, sin `report-only`, Rendimiento móvil 98, las otras tres categorías en 100)._
- [x] El sitio en producción cumple los criterios de la Épica 04. _Respaldo: medido en 05-03 (2026-10-13): móvil 98 / 100 / 100 / 100, escritorio 100 / 100 / 100 / 100, LCP 1.839 ms, CLS 0, INP 32 a 48 ms._
- [x] Sin hallazgos abiertos de severidad Alta; los que no se pudieron verificar quedan como «riesgo aceptado» con fecha. _Respaldo: AUD-01-005, 012 y 016 resueltos; Safari, iPhone, VoiceOver, Narrador de Windows y `apple-touch-icon` como riesgo aceptado (declaración del 2026-10-12, clasificado el 2026-10-13)._