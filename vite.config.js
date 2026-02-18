import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Configuration spécifique à Vitest (tests)
  test: {
    // Utilise un DOM simulé pour permettre les tests React
    // (document, window, HTMLElement, etc.)
    environment: "jsdom",
    // Fichier de setup inclus automatiquement pour tous les tests.
    setupFiles: "./src/__tests__/setupTests.js",
    // sinon, on doit importer test/expect/vi partout.
    globals: true,
  },
})
