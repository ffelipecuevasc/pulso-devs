/**
 * Mapa único de íconos de interfaz (RDA-005): nombre de uso, en la forma de Material Symbols,
 * hacia el nombre del ícono en `@iconify-json/material-symbols-light`.
 *
 * Solo los íconos que el sitio usa hoy. `astro.config.mjs` toma `Object.values(iconos)` como
 * lista de inclusión de `astro-icon`, de modo que esta tabla es el único lugar donde se agrega
 * o se quita un ícono. Se usan desde `src/components/Icono.astro`.
 *
 * El set nombra con el sufijo `-outline` la variante de contorno; el nombre sin sufijo es la
 * rellena, salvo en los íconos que solo tienen una forma (flechas, menú, cerrar, etc.).
 * Los de temáticas de talleres coinciden exactamente con el `path` del prototipo (AUD-02-003).
 *
 * @type {Record<string, string>}
 */
export const iconos = {
  // Interfaz (sprite del prototipo)
  arrow_outward: 'arrow-outward',
  badge: 'badge-outline',
  calendar_month: 'calendar-month-outline',
  campaign: 'campaign-outline',
  cast_for_education: 'cast-for-education-outline',
  close: 'close',
  dark_mode: 'dark-mode-outline',
  deployed_code: 'deployed-code-outline',
  diversity_3: 'diversity-3',
  groups: 'groups-outline',
  language: 'language',
  library_books: 'library-books-outline',
  light_mode: 'light-mode-outline',
  menu: 'menu',
  person: 'person-outline',
  public: 'public',
  schedule: 'schedule-outline',
  school: 'school-outline',
  volunteer_activism: 'volunteer-activism-outline',
  work: 'work-outline',
  workspace_premium: 'workspace-premium-outline',

  // Temáticas de talleres (elegidos por el desarrollador)
  web: 'web',
  code_blocks: 'code-blocks',
  wand_stars: 'wand-stars',
  cloud_sync: 'cloud-sync',
  rocket_launch: 'rocket-launch',
  robot_2: 'robot-2',
};
