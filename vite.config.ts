import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import contentCollections from '@content-collections/vite'
import { inmargin } from '@inmargin/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  optimizeDeps: { exclude: ['@resvg/resvg-js'] },
  ssr: {
    external: ['@resvg/resvg-js'],
    optimizeDeps: { exclude: ['@resvg/resvg-js'] },
  },
  plugins: [
    devtools(),
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    tailwindcss(),
    contentCollections(),
    inmargin(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
