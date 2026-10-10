# Iteración 04-03 · Accesibilidad y verificación cruzada

- **Épica:** 04 · SEO, rendimiento y accesibilidad
- **Estado:** Pendiente
- **Rama:** `main` (RDA-015)
- **Depende de:** 04-02
- **RDA relacionadas:** —
- **Hallazgos que cierra:** AUD-01-015, AUD-01-020

## Objetivo

Verificar con mediciones y dispositivos reales lo que hasta ahora solo se revisó en el código.

## Tareas

1. Medir el contraste de cada combinación de texto y fondo, en modo claro y oscuro (incluidas las bandas oscuras y los estados de foco), y registrar la tabla.
2. Comprobar objetivos táctiles de 44 × 44 px, foco visible que no quede bajo el header fijo, navegación completa con teclado, zoom al 200 % y 400 % y ancho de 320 px.
3. Revisar el `alt` del logotipo del hero (AUD-01-020) y los textos alternativos y `aria-label`.
4. Fase B (desarrollador): prueba con lector de pantalla en un teléfono real y en el computador, y revisión en Safari y Firefox. Evidencia en `evidencia-04-03-fase-b.md`.

## Criterios de aceptación

- [ ] Todo texto cumple WCAG 2.2 AA (4,5:1 o 3:1 según el tamaño), medido en ambos modos.
- [ ] Sin desplazamiento horizontal a 320 px ni pérdida de contenido al 400 % de zoom.
- [ ] El sitio se recorre completo con teclado y con lector de pantalla.
- [ ] Accesibilidad 100 en Lighthouse.
- [ ] Bitácora 04-03 creada.

## Fuera de alcance

- Cambios de diseño no relacionados con un defecto de accesibilidad.

## Datos requeridos del desarrollador

- Resultados de las pruebas en dispositivos reales.
