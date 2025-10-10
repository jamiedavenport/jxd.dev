// @ts-check
import { defineConfig, envField, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://www.jxd.dev",

  vite: {
    plugins: [tailwindcss()],
  },

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

  adapter: cloudflare({
    imageService: "compile",
  }),

  env: {
    schema: {
      LOOPS_API_KEY: envField.string({ context: "server", access: "secret" }),
    },
  },
});
