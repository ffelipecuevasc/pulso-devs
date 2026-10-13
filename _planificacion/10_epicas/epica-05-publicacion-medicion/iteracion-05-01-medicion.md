# Iteración 05-01 · Medición: Cloudflare Web Analytics y Search Console

- **Épica:** 05 · Publicación y medición
- **Estado:** Terminada (2026-10-13)
- **Rama:** `main` (RDA-015)
- **Depende de:** 04-03
- **RDA relacionadas:** RDA-010
- **Hallazgos que cierra:** —

## Objetivo

Confirmar con mediciones de la producción con el script que Cloudflare Web Analytics, que se mantiene activo por decisión del desarrollador (2026-10-13), no produce regresiones, y empezar a medir la visibilidad en Google.

## Diagnóstico de partida

- Web Analytics **ya está activo en producción** (inyección automática en el borde, solo si la petición declara `Accept: text/html`). El build local tiene 0 peticiones a terceros.
- Medido en 04-02: primera carga en producción 9 peticiones y unos 106 KB; build local 7 peticiones y 93.270 B. La diferencia incluye el script de Cloudflare y su petición `/cdn-cgi/rum`.
- Lighthouse móvil del build: mediana 97 en cinco corridas alternadas; LCP 1.674 ms; CLS 0.
- No existe medición de la **producción sin** el script y no se produce: por decisión del desarrollador (2026-10-13), Web Analytics se mantiene activo. Esta iteración mide la producción **con** el script.

## Decisión de método (2026-10-13)

El desarrollador decidió (2026-10-13) mantener Cloudflare Web Analytics activo y no desactivar la inyección en el panel. No se mide la producción sin el script. El costo se informa con lo medido en 04-02 (build local vs producción) y se mide la producción con el script para confirmar que no hay regresiones. Todas las mediciones usan cinco corridas alternadas (móvil y escritorio) más INP por protocolo, como en 04-02.

## Tareas

**Fase A (agente):**

1. Verificar en la documentación vigente de Cloudflare cómo funciona la inyección automática de Web Analytics en un Worker con recursos estáticos (condiciones de inyección, el script y la petición `/cdn-cgi/rum`) y qué orígenes habría que permitir en una CSP. No asumir; citar la fuente en la bitácora.
2. Medir la producción **con** el script (línea base de esta iteración): Lighthouse móvil y escritorio, LCP, CLS, INP, peso y peticiones de la primera vista, y bytes de JavaScript propio y de Cloudflare por separado.
3. Preparar `evidencia-05-01-fase-b.md` para el desarrollador, con los pasos de Search Console.
4. Proponer el texto de la excepción para `AGENTS.md` §7.3 si RDA-010 se acepta (requiere aprobación).

**Fase B (desarrollador, con el agente midiendo):**

5. Decisión de RDA-010: Aceptada por decisión del desarrollador (2026-10-13), si la medición con el script cumple los umbrales; si no los cumple, se vuelve a evaluar.
6. Verificar la propiedad de `comunidadpulso.dev` en Google Search Console (por DNS), enviar `sitemap-index.xml` y solicitar la inspección de las páginas principales.
7. Registrar el estado de indexación con fecha. Si pasan 14 días desde el envío sin indexar, abrir un seguimiento aparte.

La política `Content-Security-Policy` se trabaja en la iteración 05-02.

## Criterios de aceptación

- [x] Mediciones de la producción con el script, en cinco corridas alternadas, móvil y escritorio, con INP.
- [x] Con Web Analytics activo, Lighthouse móvil sigue en 95 o más en las cuatro categorías (mediana de cinco), LCP < 2,5 s, CLS < 0,05 e INP < 200 ms; si no, se vuelve a evaluar (tarea 5).
- [x] El JavaScript propio del sitio no aumenta; el de Cloudflare se informa por separado. _Declarado por el desarrollador (2026-10-13): la diferencia de +2 B en el script del tema (3.714 B a 3.716 B) se considera menor y no es atribuible a Web Analytics (el build local da 3.716 B con y sin el script de Cloudflare). Causa no investigada._
- [x] RDA-010 «Aceptada» por decisión del desarrollador (2026-10-13), y `AGENTS.md` §7.3 y `registro-log.md` §4 coherentes con la decisión.
- [x] Search Console con la propiedad verificada y el sitemap en estado «Correcto». _Propiedad verificada el 2026-10-13; sitemap enviado el 2026-10-13. Declarado por el desarrollador (2026-10-13): sitemap «Correcto», 1 página descubierta (captura de Search Console)._
- [x] Estado de indexación de la portada registrado con fecha. _Declarado por el desarrollador (2026-10-13): portada indexada._
- [x] `evidencia-05-01-fase-b.md` completada por el desarrollador.
- [x] Bitácora 05-01 creada.

## Fuera de alcance

- Medir clics en WhatsApp.
- La política `Content-Security-Policy` (05-02).

## Datos requeridos del desarrollador

- Acceso a Cloudflare (registro DNS) y a Search Console. Solo él opera esas cuentas.