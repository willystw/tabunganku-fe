import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
  vite: {
    server: {
      port: 3000,
      watch: {
          usePolling: true,
      },
    }
  }
});
