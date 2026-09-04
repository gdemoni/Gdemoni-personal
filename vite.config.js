import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: { include: ['gsap', 'gsap/ScrollTrigger'] },
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        project: resolve(import.meta.dirname, 'project.html')
      }
    }
  }
});
