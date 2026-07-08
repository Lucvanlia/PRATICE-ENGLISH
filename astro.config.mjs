import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://Lucvanlia.github.io',
  base: '/PRATICE-ENGLISH/',
  integrations: [tailwind(), mdx()],
});
