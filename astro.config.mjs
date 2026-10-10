// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { comunidad } from './src/data/comunidad.js';
import { iconos } from './src/data/iconos.js';
import bloquearPendientes from './src/integraciones/bloquearPendientes.js';

// https://astro.build/config
export default defineConfig({
  site: comunidad.url,
  integrations: [
    sitemap(),
    icon({ include: { 'material-symbols-light': Object.values(iconos) } }),
    bloquearPendientes(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  // Fuentes autoalojadas (RDA-004): Astro las descarga al compilar y las sirve desde el propio dominio.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Lexend',
      cssVariable: '--font-lexend',
      weights: [300, 400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      display: 'swap',
      fallbacks: ['Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Sans',
      cssVariable: '--font-plex-sans',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      display: 'swap',
      fallbacks: ['Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
    },
  ],
});
