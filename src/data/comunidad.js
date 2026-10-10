/**
 * Fuente única de datos de la comunidad (RDA-007).
 *
 * Aquí viven los valores configurables: enlaces, redes, URL del sitio, clave de tema
 * y los textos que consumen componentes, metadatos y datos estructurados.
 * Ningún componente escribe estos valores en duro (AGENTS.md §6.5).
 *
 * Si falta un dato, se escribe el marcador `PENDIENTE_DATO` y se registra en
 * `_planificacion/00_producto/registro-log.md`. La compilación de producción falla
 * mientras quede el marcador en algún archivo publicado (src/integraciones/).
 *
 * Los textos son idénticos a los del prototipo en `_prototipo/` (commit d60c55e).
 */

export const comunidad = {
  nombre: 'Comunidad Pulso Devs',
  nombreCorto: 'Pulso Devs',
  eslogan: 'Desarrollando sitios web a puro pulso en comunidad.',
  idioma: 'es',
  localeOg: 'es_LA',

  /** URL del sitio, sin barra final. También alimenta `site` en astro.config.mjs. */
  url: 'https://comunidadpulso.dev',

  /** Textos de la cabecera SEO de la portada. */
  seo: {
    titulo: 'Comunidad Pulso Devs · Desarrolladores junior de Latinoamérica',
    descripcion:
      'Pulso Devs es una comunidad latinoamericana para desarrolladores junior de frontend, backend, fullstack e ingeniería de IA. Talleres gratuitos en vivo, apoyo para tus proyectos y oportunidades para crecer.',
    descripcionOg:
      'Una comunidad para desarrolladores junior que quieren aprender, construir y crecer juntos. Abierta a toda Latinoamérica.',
    textoAltImagen: 'Logotipo de Pulso Devs',
    colorTema: '#FFFFFF',
  },

  /** Única forma de unirse a la comunidad (RDA-006). */
  whatsapp: 'https://chat.whatsapp.com/JejECSvdP4fDCAMh43Ohzs',

  /** El fundador aparece solo en el pie de página (RDA-009). */
  fundador: {
    nombre: 'Felipe Cuevas',
    sitioWeb: 'https://felipecuevas.dev',
  },

  /** Redes de la comunidad. Otras redes: pendientes de definir (iteración 03-02). */
  redes: {
    linkedin: 'https://www.linkedin.com/company/comunidad-pulso-devs/home/',
  },

  /** Clave de `localStorage` con la preferencia de tema. */
  claveTema: 'pulsodevs-theme',

  /** Navegación principal. `#oportunidades` se retira (AUD-01-005, RDA-011). */
  navegacion: [
    { texto: 'Comunidad', href: '#comunidad' },
    { texto: 'Talleres', href: '#talleres' },
    { texto: 'Visión', href: '#vision' },
  ],

  /** Áreas que reúnen a la comunidad (sección #comunidad). */
  areas: [
    {
      nombre: 'Frontend',
      descripcion: 'Interfaces, accesibilidad y la web que la gente usa.',
    },
    {
      nombre: 'Backend',
      descripcion: 'APIs, bases de datos y la lógica que corre en el servidor.',
    },
    {
      nombre: 'Fullstack',
      descripcion: 'Del navegador a la base de datos, de punta a punta.',
    },
    {
      nombre: 'Inteligencia Artificial',
      descripcion: 'Modelos, agentes y aplicaciones que integran inteligencia artificial.',
    },
  ],

  /**
   * Temáticas de los talleres (sección #talleres), en el orden del prototipo.
   * El nombre del ícono de cada una se agrega en la iteración 01-03 (AUD-02-003).
   */
  tematicas: [
    { nombre: 'Desarrollo Web' },
    { nombre: 'Desarrollo Fullstack' },
    { nombre: 'Desarrollo Web + IA' },
    { nombre: 'Ingeniería de Datos + Tecnología Cloud' },
    { nombre: 'Desarrollo Web + Tecnología Cloud' },
    { nombre: 'Aplicaciones con Agentes de IA' },
  ],
};

/** Año del pie de página, calculado al compilar (no en el navegador). */
export const anioActual = new Date().getFullYear();
