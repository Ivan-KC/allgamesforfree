import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
// Troleamos a CORS usando un Proxy cuando hacemos fetch

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "AllGamesForFree",
        short_name: "Games",
        description: "Aplicación web de juegos gratis",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",

        icons: [
          {
            src: "/icon-128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico}"]
      }
    })

  ],

  server: {
    proxy: {
      '/api-gamerpower': {
        target: 'https://www.gamerpower.com/api',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api-gamerpower/, '')
      },

      '/api-freetogame': {
        target: 'https://www.freetogame.com/api',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api-freetogame/, '')
      }
    }
  }
})