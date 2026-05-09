import { defineOgConfig, ignore } from '@jxdltd/tanstack/og'
import { allPosts } from 'content-collections'

export default defineOgConfig({
  '/': () => ({
    title: 'Jamie Davenport',
    description: 'Software engineer, entrepreneur, investor.',
    type: 'website',
  }),

  '/writing/$slug': ({ params }) => {
    const post = allPosts.find((p) => p.slug === params.slug)
    if (!post) return ignore
    return {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      author: post.author ?? 'Jamie Davenport',
      date: post.date,
      tag: post.tag ?? 'post',
      readingTime: post.readingTime,
    }
  },

  '/og/$': () => ignore,
})
