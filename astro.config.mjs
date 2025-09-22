// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
  integrations: [sitemap(), mdx()],

  experimental: {
    fonts: [
      {
        provider: fontProviders.fontsource(),
        name: "Geist",
        cssVariable: "--font-geist",
      },
    ],
  },
});