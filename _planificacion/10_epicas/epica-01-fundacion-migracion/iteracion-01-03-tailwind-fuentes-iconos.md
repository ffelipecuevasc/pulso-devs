# Iteración 01-03 · Tailwind local, fuentes autoalojadas e íconos

- **Épica:** 01 · Fundación y migración a Astro
- **Estado:** Pendiente
- **Rama:** `main` (RDA-015)
- **Depende de:** 01-02
- **RDA relacionadas:** RDA-002, RDA-004, RDA-005
- **Hallazgos que cierra:** AUD-01-009, AUD-01-010 (parte), AUD-01-012, AUD-01-013, AUD-02-003

## Objetivo

Dejar el sistema visual del prototipo funcionando con Tailwind 4 compilado localmente, fuentes propias e íconos SVG en línea, sin ninguna petición a terceros.

## Tareas

1. En `src/styles/global.css`: `@import "tailwindcss"`, limitar el escaneo de clases a `src/` y declarar en `@theme` los tokens de `DESIGN.md` §2 a §4 (paleta `orient`, dorado, fuentes, radios, contenedor, espaciado de sección).
2. Declarar los tokens semánticos de `DESIGN.md` §2.2 como variables CSS por modo (`:root` y `[data-theme="dark"]`) y la variante `dark` con `@custom-variant` sobre `[data-theme="dark"]`.
3. Portar de `_prototipo/assets/css/styles.css` solo lo que se usa: base, tipografía compartida, botones, `.band` y `.band--dots`, `.section`, movimiento reducido y los componentes comunes. **No portar** el código muerto de AUD-01-010 (formulario, fundador antiguo `founder__*`, oportunidades, `welcome__*`); sí se porta `.founder-chip`.
4. Configurar la Fonts API de Astro (`fonts` en `astro.config.mjs`, con aprobación) con Lexend (300–700) e IBM Plex Sans (400, 500, 600 y 400 itálica), subconjunto latino, `font-display: swap`, y precarga solo de los pesos críticos. Verificar la sintaxis vigente en la documentación de Astro.
5. Crear `src/components/Icono.astro` con `astro-icon`: un único mapa de nombres y `aria-hidden="true"` para íconos decorativos. Incluir solo los íconos usados hoy: los 21 del sprite (`arrow_outward`, `badge`, `calendar_month`, `campaign`, `cast_for_education`, `close`, `dark_mode`, `deployed_code`, `diversity_3`, `groups`, `language`, `library_books`, `light_mode`, `menu`, `person`, `public`, `schedule`, `school`, `volunteer_activism`, `work`, `workspace_premium`) más los 6 de las temáticas de talleres, que el prototipo trae como SVG en línea sin nombre (AUD-02-003): identificar cada nombre comparando el `path` con `@iconify-json/material-symbols-light`; si alguno no coincide exactamente, detenerse y preguntar.
6. Copiar los 29 logotipos de `_prototipo/assets/icons/Logos*.svg` a `src/icons/` con el prefijo `tec-` en minúsculas y con guiones (`LogosAws.svg` → `tec-aws.svg`, `LogosClaudeIcon.svg` → `tec-claude-icon.svg`, `LogosWhatsappIcon.svg` → `tec-whatsapp-icon.svg`), sin modificar su contenido. Comprobar que `astro-icon` conserve colores y degradados y que los `id` internos (Google, Gemini y otros) no choquen al inyectarse dos en la misma página.
7. Reemplazar las clases de Tailwind huérfanas del prototipo por tokens y componentes del sistema (AUD-01-009).

## Criterios de aceptación

- [ ] El HTML compilado no contiene `fonts.googleapis.com`, `fonts.gstatic.com` ni ningún dominio externo; la pestaña Red muestra solo recursos propios.
- [ ] Las dos familias se sirven desde el propio dominio, en `woff2`.
- [ ] No existe `tailwind.config.js` ni referencias al CDN de Tailwind.
- [ ] Los colores se ven iguales a los del prototipo en modo claro y oscuro (comparación lado a lado, medida).
- [ ] Ningún componente usa colores `gray`, `slate`, `green` ni `blue` de Tailwind.
- [ ] Existen los 29 archivos `src/icons/tec-*.svg`, idénticos byte a byte a los originales.
- [ ] Los 6 íconos de temáticas tienen nombre de Material Symbols Light confirmado.
- [ ] `pnpm build` sin errores ni advertencias nuevas.

## Fuera de alcance

- La fuente de lectura definitiva (02-01).

## Datos requeridos del desarrollador

- Ninguno.
