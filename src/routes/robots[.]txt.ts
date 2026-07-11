import { createFileRoute } from '@tanstack/react-router'
import { SITE_URL } from '../lib/seo'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: () => {
        const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`

        return new Response(robots, {
          headers: { 'Content-Type': 'text/plain' },
        })
      },
    },
  },
})
