import { defineConfig } from 'vitest/config'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    // Должен идти до @vitejs/plugin-react — иначе React Refresh не подхватит
    // сгенерированные файлы маршрутов.
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    host: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/shared/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
