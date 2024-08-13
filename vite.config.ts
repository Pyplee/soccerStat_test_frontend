import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const baseUrl = "https://api.football-data.org/v4";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api/proxy': {
        target: baseUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy/, ''),
        timeout: 10000,
      },
    },
  },
});