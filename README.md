# Comunidad Pulso Devs

Sitio web oficial de **Pulso Devs**, una comunidad latinoamericana para desarrolladores junior que quieren aprender, construir proyectos y crecer juntos.

Abierta a toda Latinoamérica · [comunidadpulso.dev](https://comunidadpulso.dev)

---

## ¿Qué es este proyecto?

Es una **landing page**: una sola página que presenta la comunidad, explica qué ofrece (talleres gratuitos en vivo, apoyo, oportunidades de becas, certificaciones y empleo) y te invita a unirte al grupo de WhatsApp. No tiene formularios, cuentas ni base de datos.

Si estás aprendiendo desarrollo web, este repositorio te sirve para ver cómo se construye un sitio real, de principio a fin, con herramientas modernas.

## Tecnologías

| Herramienta | Para qué se usa |
| :-- | :-- |
| [Astro](https://astro.build) | Framework que arma el sitio y genera páginas HTML rápidas, con muy poco JavaScript. |
| [Tailwind CSS](https://tailwindcss.com) | Estilos mediante clases utilitarias, compilado localmente (sin CDN). |
| [Node.js](https://nodejs.org) | Entorno que ejecuta las herramientas de desarrollo. |
| [PNPM](https://pnpm.io) | Gestor de paquetes (instala las dependencias). |
| [Cloudflare Workers](https://workers.cloudflare.com) | Publica el sitio en internet, conectado a este repositorio de GitHub. |

> El proyecto se está migrando desde HTML, CSS y JavaScript sin compilación hacia Astro y Tailwind. Mientras dure la migración, el sitio original vive en `_prototipo/` y algunas partes de este README pueden adelantarse al código.

## Cómo ejecutarlo en tu computador

**Requisitos:** Node.js 24 y PNPM 12.

```bash
git clone https://github.com/ffelipecuevasc/pulso-devs.git
cd pulso-devs
pnpm install
pnpm dev
```

Abre `http://localhost:4321` en tu navegador.

| Comando | Qué hace |
| :-- | :-- |
| `pnpm dev` | Inicia el sitio en modo desarrollo |
| `pnpm build` | Genera la versión final en la carpeta `dist/` |
| `pnpm preview` | Muestra localmente la versión final |

## Estructura

```text
pulso-devs/
├── src/              Código del sitio (páginas, componentes, estilos y datos)
├── public/           Archivos que se publican tal cual (favicon, robots.txt)
├── _prototipo/       Sitio original, solo de referencia durante la migración
├── _planificacion/   Documentación del proyecto: épicas, decisiones y bitácoras
├── AGENTS.md         Reglas para los agentes de IA que colaboran en el código
└── DESIGN.md         Sistema de diseño: colores, tipografías y componentes
```

## Un proyecto hecho con ayuda de IA

Este sitio se desarrolla junto al agente de IA Claude Code. Para que trabajen de forma ordenada, el repositorio incluye `AGENTS.md`, con sus reglas, y la carpeta `_planificacion/`, donde cada cambio queda registrado. Puedes revisarlos para aprender cómo se organiza un proyecto de este tipo.

## Autor

Creado por **Felipe Cuevas**, fundador de la comunidad · [felipecuevas.dev](https://felipecuevas.dev)

## Licencia

El código se publica con licencia [MIT](LICENSE). El nombre, el logotipo y la identidad visual de Pulso Devs son marca de la comunidad y no están cubiertos por esa licencia: no se pueden reutilizar sin permiso.