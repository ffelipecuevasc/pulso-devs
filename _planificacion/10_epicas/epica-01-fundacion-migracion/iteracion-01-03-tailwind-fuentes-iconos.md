# Iteración 01-03 · Tailwind local, fuentes autoalojadas e íconos

- **Épica:** 01 · Fundación y migración a Astro
- **Estado:** Pendiente
- **Rama sugerida:** `iteracion/01-03-tailwind-fuentes-iconos`
- **Depende de:** 01-02
- **RDA relacionadas:** RDA-002, RDA-004, RDA-005
- **Hallazgos que cierra:** AUD-01-009, AUD-01-010 (parte), AUD-01-012, AUD-01-013

## Objetivo

Dejar el sistema visual del prototipo funcionando con Tailwind 4 compilado localmente, fuentes propias e íconos SVG en línea, sin ninguna petición a terceros.

## Tareas

1. En `src/styles/global.css`: `@import "tailwindcss"`, limitar el escaneo de clases a `src/` y declarar en `@theme` los tokens de `DESIGN.md` §2 a §4 (paleta `orient`, dorado, fuentes, radios, contenedor, espaciado de sección).
2. Declarar los tokens semánticos de `DESIGN.md` §2.2 como variables CSS por modo (`:root` y `[data-theme="dark"]`) y la variante `dark` con `@custom-variant` sobre `[data-theme="dark"]`.
3. Portar de `_prototipo/assets/css/styles.css` solo lo que se usa: base, tipografía compartida, botones, `.band`, `.section`, movimiento reducido y los componentes comunes. **No portar** el código muerto de AUD-01-010 (formulario, fundador, oportunidades, `welcome__kicker`, `welcome__note`, `welcome__title`).
4. Configurar la Fonts API de Astro (`fonts` en `astro.config.mjs`, con aprobación) con Lexend (300–700) e IBM Plex Sans (400, 500, 600 y 400 itálica), subconjunto latino, `font-display: swap`, y precarga solo de los pesos críticos. Verificar la sintaxis vigente en la documentación de Astro.
5. Crear `src/components/Icono.astro` con `astro-icon`: un único mapa de nombres y `aria-hidden="true"` para íconos decorativos. Incluir solo los 22 íconos usados hoy (`DESIGN.md` §7).
6. Reemplazar las clases de Tailwind huérfanas del prototipo por tokens y componentes del sistema (AUD-01-009).

## Criterios de aceptación

- [ ] El HTML compilado no contiene `fonts.googleapis.com`, `fonts.gstatic.com` ni ningún dominio externo; la pestaña Red muestra solo recursos propios.
- [ ] Las dos familias se sirven desde el propio dominio, en `woff2`.
- [ ] No existe `tailwind.config.js` ni referencias al CDN de Tailwind.
- [ ] Los colores se ven iguales a los del prototipo en modo claro y oscuro (comparación lado a lado, medida).
- [ ] Ningún componente usa colores `gray`, `slate`, `green` ni `blue` de Tailwind.
- [ ] `pnpm build` sin errores ni advertencias nuevas.

## Fuera de alcance

- La fuente de lectura definitiva (02-01).

## Datos requeridos del desarrollador

- Ninguno.
