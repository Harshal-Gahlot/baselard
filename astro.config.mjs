import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://baselardstudios.com',
  output: 'static',
  build: {
    format: 'directory',
  },
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});
