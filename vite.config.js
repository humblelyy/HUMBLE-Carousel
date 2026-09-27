import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ command }) => ({
  plugins: [react()],

  // Vercel → /
  // GitHub Pages → /HUMBLE-Carousel/
  base:
    process.env.VERCEL === '1'
      ? '/'
      : '/HUMBLE-Carousel/',

  build: {
    sourcemap: false,

    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        privacy: resolve(rootDir, 'privacy.html'),
        policy: resolve(rootDir, 'policy.html'),
        cookie: resolve(rootDir, 'cookie.html'),
      },
    },
  },
}))
