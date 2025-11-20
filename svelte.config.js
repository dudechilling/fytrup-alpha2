import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),

    // Enables correct asset resolution for GitHub Pages
    paths: {
      base: dev ? '' : '/fytrup-alpha2'
    },

    appDir: 'app',

    // Pre-render everything (static site)
    prerender: {
      handleMissingId: 'ignore',
      entries: ['*']
    }
  }
};

export default config;
