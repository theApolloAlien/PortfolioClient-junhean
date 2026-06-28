import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the built site works at a domain root or a subpath
// (e.g. GitHub Pages project pages) without rewrites.
const PORT = process.env.PORT ? Number(process.env.PORT) : 5173;

export default defineConfig({
  base: './',
  plugins: [react()],
  // Honour a PORT env var (Vite ignores it by default) so tooling that assigns
  // a port — e.g. the preview harness — can bind the dev server where it expects.
  server: {
    port: PORT,
    strictPort: !!process.env.PORT,
  },
});
