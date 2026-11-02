import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const entryId = ({ entry }: { entry: string }) =>
  entry.replace(/\.mdx$/, "").replace(/\/index$/, "");

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.mdx", generateId: entryId }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().trim().min(1),
        description: z.string().trim().min(1),
        publishedAt: z.coerce.date(),
        updatedAt: z.coerce.date().optional(),
        draft: z.boolean().default(false),
        ogImage: z
          .object({
            src: image(),
            alt: z.string().trim().min(1),
          })
          .optional(),
      })
      .refine((post) => !post.updatedAt || post.updatedAt >= post.publishedAt, {
        message: "updatedAt must not be earlier than publishedAt",
        path: ["updatedAt"],
      }),
});

const work = defineCollection({
  loader: glob({ base: "./src/content/work", pattern: "**/*.mdx", generateId: entryId }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    client: z.string().trim().min(1),
    summary: z.string().trim().min(1),
    icon: z.string().startsWith("/images/"),
    website: z.url().optional(),
    publishedAt: z.coerce.date(),
  }),
});

export const collections = { blog, work };
