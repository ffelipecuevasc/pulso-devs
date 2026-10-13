// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { comunidad } from './src/data/comunidad.js';
import { iconos } from './src/data/iconos.js';
import bloquearPendientes from './src/integraciones/bloquearPendientes.js';
import verificarCsp from './src/integraciones/verificarCsp.js';

// https://astro.build/config
export default defineConfig({
  site: comunidad.url,
  integrations: [
    sitemap(),
    icon({ include: { 'material-symbols-light': Object.values(iconos) } }),
    bloquearPendientes(),
    verificarCsp(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  // Fuentes autoalojadas (RDA-004): los archivos variables (.woff2 latinos, sin cursivas) están en
  // src/assets/fonts/ junto con su licencia, y Astro los sirve desde el propio dominio con el
  // proveedor local, sin red al compilar.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Lexend',
      cssVariable: '--font-lexend',
      fallbacks: ['Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
      options: {
        variants: [
          {
            weight: '100 900',
            style: 'normal',
            display: 'swap',
            src: ['./src/assets/fonts/lexend/lexend-latin-wght-normal.woff2'],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Figtree',
      cssVariable: '--font-figtree',
      fallbacks: ['Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
      options: {
        variants: [
          {
            weight: '300 900',
            style: 'normal',
            display: 'swap',
            src: ['./src/assets/fonts/figtree/figtree-latin-wght-normal.woff2'],
          },
        ],
      },
    },
  ],
});
