# Iteración 04-02 · Rendimiento e imágenes

- **Épica:** 04 · SEO, rendimiento y accesibilidad
- **Estado:** Pendiente
- **Rama sugerida:** `iteracion/04-02-rendimiento`
- **Depende de:** 04-01
- **RDA relacionadas:** RDA-003, RDA-004
- **Hallazgos que cierra:** AUD-01-014 (parte)

## Objetivo

Llevar la portada a 95–100 en Lighthouse móvil con LCP, CLS e INP dentro de los límites.

## Tareas

1. Medir la portada (Lighthouse con `pnpm dlx`, fuera del proyecto, mediana de tres ejecuciones, móvil y escritorio) y registrar la línea base.
2. Revisar imágenes: formatos AVIF/WebP, tamaños, dimensiones explícitas, prioridad del elemento LCP y carga diferida del resto.
3. Revisar fuentes: pesos, precarga y ausencia de desplazamiento de diseño.
4. Revisar el JavaScript de cliente y el CSS generado; quitar lo que no se use.
5. Documentar el presupuesto resultante (peso de la primera vista).

## Criterios de aceptación

- [ ] Lighthouse móvil, mediana de tres: 95 o más en las cuatro categorías, en la portada.
- [ ] LCP < 2,5 s, CLS < 0,05 e INP < 200 ms.
- [ ] Sin peticiones a terceros en la carga.
- [ ] Antes y después registrados en la bitácora.
- [ ] Bitácora 04-02 creada.

## Fuera de alcance

- Cambios de diseño para ganar puntos de Lighthouse sin aprobación.

## Datos requeridos del desarrollador

- Ninguno.
