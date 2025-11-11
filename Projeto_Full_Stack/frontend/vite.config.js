// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // ADICIONE ESTE BLOCO DE CÓDIGO
  preview: {
    allowedHosts: [
      // O seu domínio público do Railway
      'protective-nature-production.up.railway.app' 
    ]
  }
})