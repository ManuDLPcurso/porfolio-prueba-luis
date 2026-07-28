import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    legacy()
  ],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ionic: ['@ionic/react', '@ionic/react-router'],
          framer: ['framer-motion'],
          supabase: ['@supabase/supabase-js'],
        }
      }
    }
  }
})
