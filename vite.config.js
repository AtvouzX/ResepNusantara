import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
    registerType: 'prompt',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'LOGORN.png'],
    injectRegister: 'auto',

    manifest: {
      name: 'Resep-Nusantara',
      short_name: 'Resep-Nusantara',
      description: 'Resep Makanan dan Minuman Indonesia',
      theme_color: '#ffffff',
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
    },
  })],
})