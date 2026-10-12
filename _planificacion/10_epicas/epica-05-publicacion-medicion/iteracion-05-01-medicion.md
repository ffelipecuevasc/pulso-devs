# Iteración 05-01 · Medición: Cloudflare Web Analytics y Search Console

- **Épica:** 05 · Publicación y medición
- **Estado:** Pendiente
- **Rama:** `main` (RDA-015)
- **Depende de:** 04-03
- **RDA relacionadas:** RDA-010
- **Hallazgos que cierra:** —

## Objetivo

Decidir con mediciones si Cloudflare Web Analytics se mantiene, y empezar a medir la visibilidad en Google.

## Diagnóstico de partida

- Web Analytics **ya está activo en producción** (inyección automática en el borde, solo si la petición declara `Accept: text/html`). El build local tiene 0 peticiones a terceros.
- Medido en 04-02: primera carga en producción 9 peticiones y unos 106 KB; build local 7 peticiones y 93.270 B. La diferencia incluye el script de Cloudflare y su petición `/cdn-cgi/rum`.
- Lighthouse móvil del build: mediana 97 en cinco corridas alternadas; LCP 1.674 ms; CLS 0.
- No existe medición de la **producción sin** el script. Esta iteración la produce.

## Decisión de método (2026-10-12)

El costo se mide **en producción, con y sin el script**:

1. El agente mide la producción tal como está (con script).
2. El desarrollador desactiva la inyección automática en el panel de Cloudflare.
3. El agente mide la producción sin script (y comprueba que ya no aparece, pidiendo la portada con `Accept: text/html`).
4. Si el resultado justifica mantenerlo, el desarrollador lo reactiva y el agente mide de nuevo.

Todas las mediciones usan **cinco corridas alternadas** (móvil y escritorio) más INP por protocolo, como en 04-02.

## Tareas

**Fase A (agente):**

1. Verificar en la documentación vigente de Cloudflare cómo se activa y desactiva Web Analytics en un Worker con recursos estáticos, y qué retraso tiene el cambio. No asumir; citar la fuente en la bitácora.
2. Medir la producción **con** el script (línea base de esta iteración): Lighthouse móvil y escritorio, LCP, CLS, INP, peso y peticiones de la primera vista, y bytes de JavaScript propio y de Cloudflare por separado.
3. Preparar `evidencia-05-01-fase-b.md` para el desarrollador, con los pasos del panel de Cloudflare y de Search Console.
4. Proponer el texto de la excepción para `AGENTS.md` §7.3 si RDA-010 se acepta (requiere aprobación). Si se descarta, proponer el texto que deja la regla coherente.

**Fase B (desarrollador, con el agente midiendo):**

5. Desactivar la inyección automática de Web Analytics en el panel de Cloudflare y avisar.
6. El agente mide la producción **sin** el script y entrega la tabla comparativa.
7. Decisión de RDA-010 (con la tabla): mantener (reactivar y volver a medir) o descartar (queda desactivado).
8. Verificar la propiedad de `comunidadpulso.dev` en Google Search Console (por DNS), enviar `sitemap-index.xml` y solicitar la inspección de las páginas principales.
9. Registrar el estado de indexación con fecha. Si pasan 14 días desde el envío sin indexar, abrir un seguimiento aparte.

La política `Content-Security-Policy` se trabaja en la iteración 05-02.

## Criterios de aceptación

- [ ] Mediciones de la producción con y sin el script, en cinco corridas alternadas, móvil y escritorio, con INP.
- [ ] Con Web Analytics activo, Lighthouse móvil sigue en 95 o más en las cuatro categorías (mediana de cinco), LCP < 2,5 s, CLS < 0,05 e INP < 200 ms; si no, se desactiva y RDA-010 queda «Descartada».
- [ ] El JavaScript propio del sitio no aumenta; el de Cloudflare se informa por separado.
- [ ] RDA-010 «Aceptada» o «Descartada», y `AGENTS.md` §7.3 y `registro-log.md` §4 coherentes con la decisión.
- [ ] Search Console con la propiedad verificada y el sitemap en estado «Correcto».
- [ ] Estado de indexación de la portada registrado con fecha.
- [ ] `evidencia-05-01-fase-b.md` completada por el desarrollador.
- [ ] Bitácora 05-01 creada.

## Fuera de alcance

- Medir clics en WhatsApp.
- La política `Content-Security-Policy` (05-02).

## Datos requeridos del desarrollador

- Acceso a Cloudflare (activar o desactivar Web Analytics) y a Search Console. Solo él opera esas cuentas.
- Aviso al desactivar y al reactivar la inyección, para que el agente mida en el momento correcto.