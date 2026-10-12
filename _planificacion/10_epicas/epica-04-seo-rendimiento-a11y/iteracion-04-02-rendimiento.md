# Iteración 04-02 · Rendimiento e imágenes

- **Épica:** 04 · SEO, rendimiento y accesibilidad
- **Estado:** En revisión
- **Rama:** `main` (RDA-015)
- **Depende de:** 04-01
- **RDA relacionadas:** RDA-001, RDA-003, RDA-004
- **Hallazgos que cierra:** — (AUD-01-014 se cierra en 04-01; aquí se mide su efecto)

## Objetivo

Llevar la portada a 95–100 en Lighthouse móvil con LCP, CLS e INP dentro de los límites.

## Tareas

1. **Línea base:** medir la portada en producción y en `pnpm preview` con Lighthouse ejecutado con `pnpm dlx`, fuera del proyecto (sin agregar dependencias), mediana de tres ejecuciones, móvil y escritorio.
2. **Imágenes:** AVIF/WebP (ya desde 01-04), tamaños, dimensiones explícitas, prioridad del elemento LCP y carga diferida del resto. Decidir los **PNG de respaldo del hero** (pendiente desde 01-04): proponer con `AskUserQuestion` si se conservan o se quitan.
3. **Fuentes:** pesos (Lexend 300–700 y Figtree 400 y 600, RDA-004), precarga y CLS.
4. **JavaScript de cliente y CSS generado:** quitar lo que no se use, sin cambiar el comportamiento.
5. **Caché:** proponer la cabecera `Cache-Control: public, max-age=31536000, immutable` para `/_astro/*` en `public/_headers` (pendiente de `registro-log.md` §4) y medir su efecto en una segunda visita. Se aplica solo con aprobación.
6. Documentar el presupuesto resultante: peso de la primera vista por tipo (HTML, CSS, JS, fuentes e imágenes).
7. Eliminar `src/assets/img/pulsodevs-original.png`, que ya no se usa desde 04-01, y comprobar que no queden referencias.

## Criterios de aceptación

- [x] Rendimiento móvil de 95 o más, mediana de cinco corridas alternadas.
- [x] LCP < 2,5 s, CLS < 0,05 e INP < 200 ms (INP medido con una interacción real, por ejemplo el interruptor de tema).
- [x] Sin peticiones a terceros en la carga del build; en producción, Cloudflare agrega 1 petición (Web Analytics automático, static.cloudflareinsights.com, no está en el repositorio ni en dist/) y su decisión queda en 05-01 (RDA-010).
- [ ] Decisión sobre los PNG de respaldo del hero y sobre `Cache-Control` registrada (aplicada y medida, o descartada).
- [x] Antes y después registrados en la bitácora, con el presupuesto de la primera vista.
- [x] Sin desbordes a 320, 360 y 1280 px, claro y oscuro; `package.json` y `pnpm-lock.yaml` sin dependencias nuevas.
- [x] Bitácora 04-02 creada.
- [ ] Efecto de `Cache-Control` de `/_astro/*` medido en producción, solo con lectura, después del push del desarrollador. Decidido y aplicado en 04-02 (`public/_headers`); hasta entonces sin medir. Se marca cuando el desarrollador lo declare o se mida.
- [ ] Revisión visual del hero (capturas antes y después) por el desarrollador. Se marca cuando el desarrollador lo declare.

## Resultado y presupuesto de la primera vista (04-02)

Medido en el build (`pnpm build` y `pnpm preview`), móvil, Lighthouse 13.5.0, mediana de cinco corridas alternadas con las de escritorio. Detalle y antes/después en `bitacora-04-02-2026-10-12.md`.

| Tipo | Medido (transferido) | Límite aprobado |
| :-- | --: | --: |
| Total de la primera vista | 93.270 B | ≤ 105.000 B |
| HTML | 15.851 B | ≤ 18.000 B |
| CSS | 8.050 B | ≤ 9.000 B |
| JavaScript | 0 archivos; 3.714 B en línea sin comprimir | 0 archivos y ≤ 5.000 B en línea sin comprimir |
| Fuentes | 60.476 B en 2 archivos | ≤ 64.000 B en 2 archivos |
| Imágenes | 6.733 B | ≤ 8.000 B |
| Peticiones | 7 | ≤ 8 |
| Peticiones a terceros (build) | 0 | 0 |

Se suman los límites que ya existían: LCP < 2,5 s, CLS < 0,05 e INP < 200 ms. Son límites con ~10 % de holgura sobre lo medido, para detectar regresiones; los aprobó el desarrollador (`AskUserQuestion`, 2026-10-12) y los ajusta cuando quiera.

## Fuera de alcance

- Cambios de diseño para ganar puntos de Lighthouse sin aprobación.
- Política `Content-Security-Policy` (05-01).

## Datos requeridos del desarrollador

- Ninguno (salvo las aprobaciones de las tareas 2 y 5).