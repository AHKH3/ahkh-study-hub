import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ahkh3.github.io',
  base: '/ahkh-study-hub',
  integrations: [tailwind()],
  output: 'static',
});
