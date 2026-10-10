// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { comunidad } from './src/data/comunidad.js';
import bloquearPendientes from './src/integraciones/bloquearPendientes.js';

// https://astro.build/config
export default defineConfig({
  site: comunidad.url,
  integrations: [sitemap(), icon(), bloquearPendientes()],
  vite: {
    plugins: [tailwindcss()],
  },
});
