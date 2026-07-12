import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import contentCollections from '@content-collections/vite'
import { inmargin } from '@inmargin/vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    contentCollections(),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    inmargin(),
    tanstackStart(),
    viteReact(),
  ],
})
