import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  server: {
    fs: {
      // allow serving files from project root
      allow: ['.']
    }
  },
  build: {
    outDir: 'build'
  }
};

export default config;
