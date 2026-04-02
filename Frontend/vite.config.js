import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // TAMBAHKAN BLOK RESOLVE INI:
  resolve: {
    dedupe: ['react', 'react-dom'], 
  },
})