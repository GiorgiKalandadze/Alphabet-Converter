import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base matches the gh-pages homepage so assets resolve correctly.
// For local dev (`npm run dev`), Vite serves at '/' regardless.
export default defineConfig({
  plugins: [react()],
  base: '/Alphabet-Converter/',
});
