# Iteración 01-05 · Secciones de contenido

- **Épica:** 01 · Fundación y migración a Astro
- **Estado:** Pendiente
- **Rama sugerida:** `iteracion/01-05-secciones-contenido`
- **Depende de:** 01-04
- **RDA relacionadas:** RDA-006, RDA-007
- **Hallazgos que cierra:** AUD-01-009 y AUD-01-010 (parte)

## Objetivo

Migrar las cinco secciones restantes de la portada (comunidad, lo que encontrarás, talleres, visión y únete) a componentes Astro con el contenido idéntico al prototipo.

## Tareas

1. Crear `SeccionComunidad.astro` (`#comunidad`, con las áreas), `SeccionEncontraras.astro` (`#encontraras`, con los tres pilares), `SeccionTalleres.astro` (`#talleres`, banda oscura con datos clave y temáticas), `SeccionVision.astro` (`#vision`, con la línea de tiempo) y `SeccionUnete.astro` (`#unete`, con los pasos y la tarjeta de WhatsApp).
2. Los textos, las temáticas, las áreas y los pasos salen de `src/data/comunidad.js`; **el contenido no cambia** (los ajustes de texto van en 03-01).
3. La tarjeta de WhatsApp usa los tokens del sistema (sin clases de Tailwind huérfanas) y el logotipo de WhatsApp en SVG en línea. El botón usa el enlace de `comunidad.js`.
4. Mantener los íconos actuales de las temáticas; su revisión es AUD-01-003 (02-02).
5. Armar `src/pages/index.astro` con todas las secciones en el orden del prototipo.

## Criterios de aceptación

- [ ] El texto visible de `dist/index.html` es idéntico al del prototipo, salvo las decisiones registradas en 01-04 (comparación de texto extraído, evidenciada en la bitácora).
- [ ] Las seis anclas existen y funcionan.
- [ ] El botón de WhatsApp abre el grupo y lleva `rel="noopener noreferrer"`.
- [ ] Sin código muerto ni clases de colores ajenos a la paleta.
- [ ] 360 px y escritorio, claro y oscuro, equivalentes al prototipo.
- [ ] Bitácora 01-05 creada.

## Fuera de alcance

- Cambios de texto, de íconos o de aspecto.

## Datos requeridos del desarrollador

- Ninguno.
