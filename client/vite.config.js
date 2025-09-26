import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host:true,
    proxy: {
      '/api': {
        target: 'https://d1xw2ny1uxkw0s.cloudfront.net/',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [react()],
})

