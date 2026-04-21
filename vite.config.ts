import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Troleamos a CORS usando un Proxy cuando hacemos fetch
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-gamerpower': {
        target: 'https://www.gamerpower.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-gamerpower/, '')
      },
      '/api-freetogame': {
        target: 'https://www.freetogame.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-freetogame/, '')
      }
    }
  }
})