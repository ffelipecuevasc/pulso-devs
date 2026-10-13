# Iteración 05-02 · Política Content-Security-Policy

- **Épica:** 05 · Publicación y medición
- **Estado:** Terminada (2026-10-13)
- **Rama:** `main` (RDA-015)
- **Depende de:** 05-01 (terminada el 2026-10-13; RDA-010 aceptada, por lo que se permite el script de Cloudflare)
- **RDA relacionadas:** RDA-010
- **Hallazgos que cierra:** el de la política `Content-Security-Policy` en `auditoria-tecnica.md`, si existe (el agente lo confirma y lo enlaza)

## Objetivo

Reemplazar el `frame-ancestors 'none'` actual de `public/_headers` por una política completa, sin romper el sitio y sin usar `'unsafe-inline'` para scripts.

## Diagnóstico de partida

- `public/_headers` hoy tiene `frame-ancestors 'none'` como única directiva de CSP, además de `referrer-policy`, `x-content-type-options` y `x-frame-options`.
- El sitio tiene un script en línea del tema (3.714 B sin comprimir) que debe seguir funcionando. Si su contenido cambia, su hash cambia.
- Las fuentes y las imágenes se sirven desde el propio dominio.
- Si RDA-010 se acepta, hay que permitir el script de Cloudflare Web Analytics y su petición `/cdn-cgi/rum`.
- `pnpm preview` no aplica `public/_headers`: las cabeceras solo se prueban en producción.
- Método (decisión del desarrollador, 2026-10-13): hashes fijos en `public/_headers` más una integración propia que hace fallar `pnpm build` si no coinciden con `dist/`.

## Tareas

**Fase A (agente):**

1. Hacer el inventario de orígenes que usa la portada y la 404: scripts (en línea y externos), estilos (incluido el estilo en línea de Astro), fuentes, imágenes, conexiones y transiciones. Medido sobre el build, sin suponer.
2. Verificar en la documentación vigente si la versión de Astro del proyecto ofrece soporte nativo de CSP con hashes, o si el hash del script del tema debe calcularse en el build. Elegir la forma que no obligue a `'unsafe-inline'` en `script-src`, y que impida que un cambio del script deje un hash desactualizado.
3. Proponer el texto exacto de la política completa y el de la versión en modo solo informe (`Content-Security-Policy-Report-Only`), con una línea de explicación por directiva. Se aplica solo con aprobación del desarrollador.
4. Preparar `evidencia-05-02-fase-b.md` con los pasos de prueba en producción y el procedimiento de reversa.

**Fase B (desarrollador, con el agente midiendo):**

5. Primer despliegue: la política en modo solo informe (push del desarrollador).
6. El agente la prueba en producción con Chrome por protocolo y lee la consola: portada y 404, claro y oscuro, menú móvil, cambio de tema (con la transición), recarga con tema guardado.
7. Si no hay violaciones, segundo despliegue: la política aplicada (push del desarrollador) y se repiten las pruebas.
8. Si algo se rompe, reversa: se revierte el commit y se hace push. Se anota qué falló antes de intentar de nuevo.

## Criterios de aceptación

- [x] Política completa aplicada en `public/_headers`, sin `'unsafe-inline'` en `script-src`. _Cabeceras de producción medidas por el agente (2026-10-13)._
- [x] Sin violaciones en la consola, en portada y 404, claro y oscuro, menú móvil y cambio de tema. _Medido por el agente por protocolo (Chrome 155); consola de Chrome y Firefox declarada por el desarrollador, 2026-10-13._
- [x] El tema guardado se mantiene tras recargar y la transición de tema funciona. _Tema guardado y transición medidos por el agente por protocolo; apariencia visual declarada por el desarrollador, 2026-10-13._
- [x] Lighthouse móvil y escritorio (mediana de cinco corridas alternadas) sin regresión: Rendimiento 95 o más, Accesibilidad 100, Mejores prácticas 100, SEO 100. _Aceptado por el desarrollador (2026-10-13): Rendimiento móvil 95 (mediana de cinco), justo en el umbral; línea base de 05-01: 99; la baja de 4 puntos no se atribuyó a la CSP ni se descartó; 05-03 vuelve a medir. Escritorio 100 / 100 / 100 / 100 y las otras tres categorías móviles en 100, medido por el agente._
- [x] Un cambio en el script del tema no puede dejar un hash desactualizado sin que se note antes del despliegue. _Respaldo: prueba en una copia del proyecto fuera del repositorio, 6 casos de falla (`bitacora-05-02-ajuste-2026-10-13.md`); no se probó en producción. Declarado por el desarrollador (2026-10-13)._
- [x] Procedimiento de reversa probado o documentado. _Documentado (parte 5 de `evidencia-05-02-fase-b.md`); no probado en producción._
- [x] `evidencia-05-02-fase-b.md` completada y bitácora 05-02 creada.

## Fuera de alcance

- Informes de violaciones a un servicio externo (reporting endpoint).
- Otras cabeceras de seguridad nuevas.

## Datos requeridos del desarrollador

- Aprobación del texto exacto de la política (primero en modo solo informe, luego aplicada).
- Los dos pushes a `main` y el aviso de cuándo ya están publicados.
