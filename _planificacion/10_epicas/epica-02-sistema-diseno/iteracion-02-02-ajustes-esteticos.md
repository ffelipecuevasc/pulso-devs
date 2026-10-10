# Iteración 02-02 · Ajustes estéticos y visuales

- **Épica:** 02 · Sistema de diseño y ajustes estéticos
- **Estado:** Pendiente
- **Rama sugerida:** `iteracion/02-02-ajustes-esteticos`
- **Depende de:** 02-01, la lista de ajustes y los SVG de tecnologías
- **RDA relacionadas:** —
- **Hallazgos que cierra:** AUD-01-003

## Objetivo

Aplicar los detalles estéticos y visuales que el desarrollador quiere cambiar, sin salirse del sistema de diseño.

## Tareas

1. Antes de empezar, el desarrollador entrega la lista de ajustes; el agente la copia a esta iteración, numerada y con criterios medibles.
2. Resolver AUD-01-003: usar los logotipos oficiales de tecnologías en las temáticas de talleres (decisión del desarrollador). Los SVG los entrega él y se guardan en `src/icons/` con el prefijo `tec-` (por ejemplo `tec-aws.svg`, `tec-claude.svg`). Con los archivos a la vista, proponer qué logotipo(s) acompaña(n) a cada temática y esperar aprobación; si falta un SVG, pedirlo, sin inventarlo ni usar un ícono genérico. Mostrarlos con sus colores originales, sin modificarlos, y comprobar que `astro-icon` conserve colores y degradados.
3. Implementar cada ajuste con los tokens de `DESIGN.md`; si un ajuste exige un token nuevo, proponer su valor y esperar aprobación.
4. Actualizar `DESIGN.md` con lo que cambie (requiere aprobación).

## Criterios de aceptación

- [ ] Cada ajuste de la lista está implementado y marcado con su medición.
- [ ] Cada temática de talleres muestra logotipos oficiales con sus colores originales (sin íconos genéricos), en claro y oscuro.
- [ ] Contraste AA medido en las combinaciones nuevas, en ambos modos.
- [ ] Sin desbordes a 320 px y movimiento reducido respetado.
- [ ] `DESIGN.md` coincide con lo implementado.
- [ ] Bitácora 02-02 creada.

## Fuera de alcance

- Páginas nuevas y cambios de contenido.

## Datos requeridos del desarrollador

- Lista de ajustes estéticos y visuales.
- Los SVG oficiales de las tecnologías, en `src/icons/` con el prefijo `tec-`.
