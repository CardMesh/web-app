import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel';

const config = {
  kit: {
    adapter: adapter(),
  },

  preprocess: [
    preprocess({}),
  ],
};

export default config;
