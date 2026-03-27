// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://nkozlo3@github.io',
  base: '/teck-pak-website',
  vite: {
    plugins: [tailwindcss()]
  }
});