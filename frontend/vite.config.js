import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'  // this for tailwindcss support


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), // and this for tailwindcss support
    react()
  ],
})
