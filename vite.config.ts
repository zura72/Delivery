import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
const PORT = Number(process.env.PORT) || 8080

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: PORT,
    host: true,
  },
  preview: {
    port: PORT,
    host: true,
  },
})
