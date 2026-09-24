import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vitest/config'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function spaFallback(): Plugin {
  let target = ''

  return {
    name: 'spa-fallback-404',
    apply: 'build',
    configResolved(config) {
      target = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      copyFileSync(resolve(target, 'index.html'), resolve(target, '404.html'))
    },
  }
}

export default defineConfig({
  base: '/green-api-max-chat/',
  plugins: [
    // Должен идти до @vitejs/plugin-react — иначе React Refresh не подхватит
    // сгенерированные файлы маршрутов.
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    spaFallback(),
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
