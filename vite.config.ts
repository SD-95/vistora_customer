import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/vistora_cus/', // ✅ for deployment in a subfolder
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // ✅ backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
