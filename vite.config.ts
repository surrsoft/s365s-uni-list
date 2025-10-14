import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 22155,      // порт для dev (по умолчанию 5173)
    strictPort: true // если true — не переключается на следующий свободный
  },
  preview: {
    port: 22156   // порт для vite preview (по умолчанию 4173)
  }
})
