import { defineConfig } from 'vitest/config'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    // Обязан идти до @vitejs/plugin-react, иначе сгенерированные файлы
    // маршрутов не пройдут через React Refresh.
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    // По умолчанию Vite слушает только IPv6-loopback ([::1]) — на Windows
    // резолвинг localhost в IPv4 после этого не достаётся. Слушаем на всех
    // интерфейсах явно, чтобы и localhost, и 127.0.0.1 работали одинаково.
    host: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/shared/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
