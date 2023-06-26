import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';

const config = {
  kit: {
    adapter: adapter(),
  },

  preprocess: [
    preprocess({
    }),
  ],
};

export default config;
