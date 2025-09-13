import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: [
      '@angular/core',
      '@angular/common',
      '@angular/platform-browser',
      '@angular/router',
      '@angular/forms',
      '@angular/animations'
    ],
    force: true
  },
  esbuild: {
    target: 'es2022'
  }
});