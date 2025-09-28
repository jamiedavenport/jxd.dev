import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "./src/content/posts/*.mdx" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    ranking: z.number().optional().default(50),
  }),
});

export const collections = { blog };
