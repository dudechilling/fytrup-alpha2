import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

const config = {
  preprocess: preprocess(),
  kit: {
    adapter: adapter(),
    paths: { base: '' },
    prerender: { entries: ['*'] }
  }
};

export default config;
