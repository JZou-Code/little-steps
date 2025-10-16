/**
 * Vite configuration for React application
 * Configures development server with proxy for API calls
 * Sets up CloudFront proxy for API requests
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    const proxyTarget = env.VITE_API_BASE || 'http://localhost:3000'

    if (!proxyTarget) {
        console.warn('please setup VITE_API_BASE in .env.development')
    } else if (!/^https?:\/\//.test(proxyTarget)) {
        console.warn('protocol required in VITE_API_BASE ，e.g: http://localhost:3000')
    }

    return {
        plugins: [react()],
        server: {
            proxy: {
                '/api': {
                    target: proxyTarget,
                    changeOrigin: true,
                    rewrite: p => p.replace(/^\/api/, '')
                }
            }
        }
    }
})

