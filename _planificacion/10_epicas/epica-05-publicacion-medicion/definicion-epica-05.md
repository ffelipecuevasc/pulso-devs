# Épica 05 · Publicación y medición

- **Estado:** En curso
- **Depende de:** Épica 04 terminada
- **Objetivo:** decidir con mediciones si se mantiene Cloudflare Web Analytics, medir la visibilidad en Google, endurecer la seguridad con una política `Content-Security-Policy` y verificar el sitio completo en `https://comunidadpulso.dev`.

## Contexto (desde la Épica 04)

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

- RDA-010 «Aceptada» por decisión del desarrollador (2026-10-13), con mediciones de la producción con el script que confirmen que no hay regresiones.
- Search Console con la propiedad verificada, el sitemap procesado y el estado de indexación registrado con fecha.
- Política `Content-Security-Policy` aplicada, sin violaciones en consola y con Lighthouse sin regresiones.
- El sitio en producción cumple los criterios de la Épica 04.
- Sin hallazgos abiertos de severidad Alta; los que no se pudieron verificar quedan como «riesgo aceptado» con fecha.