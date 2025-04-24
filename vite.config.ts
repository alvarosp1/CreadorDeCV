import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/CreadorDeCV/', // Base path para GitHub Pages
  define: {
    'process.env': {},
    global: 'window'
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: [
      'jspdf',
      'html2canvas',
      'canvg'
    ]
  },
  build: {
    commonjsOptions: {
      include: [/lucide-react/, /node_modules/],
    },
    outDir: 'dist', // Directorio de salida
    emptyOutDir: true, // Vaciar el directorio de salida antes de construir
  },
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  }
});