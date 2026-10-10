# Iteración 05-01 · Medición: Cloudflare Web Analytics y Search Console

- **Épica:** 05 · Publicación y medición
- **Estado:** Pendiente
- **Rama sugerida:** `iteracion/05-01-medicion`
- **Depende de:** 04-03
- **RDA relacionadas:** RDA-010
- **Hallazgos que cierra:** —

## Objetivo

Empezar a medir visitas y visibilidad, sabiendo cuánto cuesta en rendimiento.

## Tareas

**Fase A (agente):**

1. Verificar en la documentación vigente de Cloudflare cómo se activa Web Analytics en un Worker con recursos estáticos (panel o script con token) y proponer la forma de hacerlo sin romper las reglas del proyecto.
2. Medir Lighthouse móvil antes de activarlo (línea base) y preparar `evidencia-05-01-fase-b.md` para el desarrollador.
3. Proponer el texto de la excepción para `AGENTS.md` §7.3 (requiere aprobación).

**Fase B (desarrollador):**

4. Activar Cloudflare Web Analytics y volver a medir Lighthouse móvil y escritorio (mediana de tres).
5. Verificar la propiedad de `comunidadpulso.dev` en Google Search Console (por DNS), enviar `sitemap-index.xml` y solicitar la inspección de las páginas principales.

## Criterios de aceptación

- [ ] Con Web Analytics activo, Lighthouse móvil sigue en 95 o más en las cuatro categorías, LCP < 2,5 s y CLS < 0,05; si no, se desactiva y RDA-010 queda «Descartada».
- [ ] El JavaScript propio del sitio no aumenta; el de Cloudflare se informa por separado.
- [ ] Search Console con la propiedad verificada y el sitemap en estado «Correcto».
- [ ] RDA-010 «Aceptada» o «Descartada» y `AGENTS.md` §7.3 coherente.
- [ ] Bitácora 05-01 creada.

## Fuera de alcance

- Medir clics en WhatsApp.

## Datos requeridos del desarrollador

- Acceso a Cloudflare y a Search Console (solo él opera esas cuentas).
