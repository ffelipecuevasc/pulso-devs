# Iteración 02-02 · Ajustes estéticos y visuales

- **Épica:** 02 · Sistema de diseño y ajustes estéticos
- **Orden de ejecución:** 3.º de la épica (decisión del desarrollador, 2026-10-10)
- **Estado:** Pendiente
- **Rama:** `main` (RDA-015)
- **Depende de:** 02-01, 02-03 y la lista de ajustes
- **RDA relacionadas:** —
- **Hallazgos que cierra:** —

## Objetivo

Aplicar los detalles estéticos y visuales que el desarrollador quiere cambiar, sin salirse del sistema de diseño.

## Tareas

1. Antes de empezar, el desarrollador entrega la lista de ajustes (incluidas sus observaciones de diseño móvil); el agente la copia a esta iteración, numerada y con criterios medibles.
2. ~~Logotipos en las temáticas de talleres~~: descartado por el desarrollador el 2026-10-10 (AUD-01-003). Si un ajuste usa un logotipo de tecnología, se toma de `src/icons/tec-*.svg` con sus colores originales; si falta uno, se pide.
3. Implementar cada ajuste con los tokens de `DESIGN.md`; si un ajuste exige un token nuevo, proponer su valor y esperar aprobación.
4. Actualizar `DESIGN.md` con lo que cambie (requiere aprobación).

## Ajustes ya identificados

Estos ajustes se suman a la lista del desarrollador y se numeran al copiarla (tarea 1).

- **Página 404, botón de WhatsApp a 360 px:** hoy parte su texto en dos líneas sin desbordar (detectado en el cierre de 01-06). Decidir con el desarrollador si se corrige o se acepta, y medirlo.

## Criterios de aceptación

- [ ] Cada ajuste de la lista está implementado y marcado con su medición.
- [ ] Contraste AA medido en las combinaciones nuevas, en ambos modos.
- [ ] Sin desbordes a 320 px y movimiento reducido respetado.
- [ ] `DESIGN.md` coincide con lo implementado.
- [ ] Bitácora 02-02 creada.

## Fuera de alcance

- Páginas nuevas y cambios de contenido.

## Datos requeridos del desarrollador

- Lista de ajustes estéticos y visuales, con las observaciones de diseño móvil.
