import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      fastRefresh: false, // Desactiva Fast Refresh
    }),
  ],
  server: {
    port: 3001,
  },
})
