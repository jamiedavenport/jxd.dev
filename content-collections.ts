import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMarkdown } from '@content-collections/markdown'
import rehypeShiki from '@shikijs/rehype'
import { z } from 'zod'

const posts = defineCollection({
  name: 'posts',
  directory: 'content/posts',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    lane: z.string(),
    summary: z.string(),
    date: z.string(),
    author: z.string().default('Jamie Davenport'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
  transform: async (document, context) => {
    const html = await compileMarkdown(context, document, {
      rehypePlugins: [[rehypeShiki, { theme: 'vesper' }]],
    })
    const words = document.content.trim().split(/\s+/).length
    return {
      ...document,
      html,
      slug: document._meta.path,
      readingTime: Math.max(1, Math.round(words / 220)),
    }
  },
})

export default defineConfig({
  content: [posts],
})
