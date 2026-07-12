import { createFileRoute } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import { SITE_URL } from '../lib/seo'

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export const Route = createFileRoute('/rss.xml')({
  server: {
    handlers: {
      GET: () => {
        const posts = [...allPosts].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )
        const items = posts
          .map(
            (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.summary)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`,
          )
          .join('\n')

        const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>JXD Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Build logs, AI-native practice, and opinionated craft from JXD, a London software consultancy.</description>
    <language>en-gb</language>
${items}
  </channel>
</rss>`

        return new Response(rss, {
          headers: { 'Content-Type': 'application/rss+xml' },
        })
      },
    },
  },
})
