import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      runtime: 'nodejs20.x'
    }),
    // Use absolute asset URLs (/_app/…) instead of relative (../../_app/…).
    // Relative paths break when a nested route is served with a trailing
    // slash (e.g. /hire/nodejs-developer/), resolving assets to the wrong
    // directory and returning HTML with a MIME mismatch under nosniff.
    paths: {
      relative: false
    },
    alias: {
      $assets: './src/assets',
      $components: './src/components',
      $lib: './src/lib',
      $types: './src/types',
      $styles: './src/styles',
      $root: '.'
    }
  }
};

export default config;
