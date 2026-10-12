# Épica 04 · SEO, rendimiento y accesibilidad

- **Estado:** En curso
- **Objetivo:** que el sitio se pueda encontrar, cargue rápido y sea usable por cualquier persona.
- **Última revisión:** 2026-10-11, al cerrar la Épica 03

## Decisiones del desarrollador (2026-10-11)

1. **Iteración 04-00 antes de 04-01:** pulido del interruptor de tema (alineación al píxel y área táctil invisible de 44 px), manteniendo la forma de píldora.
2. **La imagen de vista previa (1200 × 630 px) va en 04-01**, con Open Graph y Twitter Card. AUD-01-014 se cierra ahí.
3. **La política `Content-Security-Policy` completa pasa a 05-01**, porque depende del script de Cloudflare Web Analytics (RDA-010).

## Alcance

1. Pulido del interruptor de tema (04-00; parte de AUD-02-010).
2. Metadatos, Open Graph, imagen de vista previa, datos estructurados, sitemap, `robots.txt` e íconos (AUD-01-014, 016, 017 y 018).
3. Optimización de imágenes, fuentes, JavaScript y caché; mediciones con Lighthouse.
4. Accesibilidad medida y verificada en dispositivos reales (AUD-01-015, AUD-01-020, AUD-02-005, AUD-02-008, AUD-02-009 y AUD-02-010).

## Iteraciones

| Iteración | Nombre                               | Estado    | Depende de          |
| :-------- | :----------------------------------- | :-------- | :------------------ |
| 04-00     | Pulido del interruptor de tema       | Terminada (2026-10-12) | Épica 03 terminada  |
| 04-01     | SEO técnico y datos estructurados    | En revisión | 04-00               |
| 04-02     | Rendimiento e imágenes               | Pendiente | 04-01               |
| 04-03     | Accesibilidad y verificación cruzada | Pendiente | 04-02               |

**Orden de ejecución:** 04-00, 04-01, 04-02 y 04-03, con parada al final de cada una. 04-03 tiene fase A (agente) y fase B (desarrollador).

## Fuera de alcance

- Posicionamiento por palabras clave y contenido nuevo.
- Medición con Web Analytics y Search Console, y la política `Content-Security-Policy` completa (Épica 05).
- Cambios de diseño que no correspondan a un hallazgo de esta épica o que el desarrollador no apruebe.

## Criterio de término

- Lighthouse móvil entre 95 y 100 en las cuatro categorías, mediana de tres ejecuciones, en la portada.
- LCP < 2,5 s, CLS < 0,05 e INP < 200 ms.
- AUD-01-014, 015, 016, 017 (salvo lo asignado a 05-01), 018 y 020, y AUD-02-009 y 010, cerrados con evidencia.
- AUD-02-005 y AUD-02-008 con Safari y Firefox verificados en la fase B de 04-03, o con su estado actualizado (siguen abiertos hasta 05-02).
- Sin hallazgos abiertos de severidad Alta en `auditoria-tecnica.md`.