import { createFileRoute } from '@tanstack/react-router'
import { caseStudies } from '../data/case-studies'
import { products } from '../data/products'
import { SITE_URL } from '../lib/seo'

const staticPaths = [
  '/',
  '/work',
  '/how-we-work',
  '/products',
  '/about',
  '/contact',
  '/privacy',
  '/cookies',
]

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () => {
        const paths = [
          ...staticPaths,
          ...caseStudies.map((study) => `/work/${study.slug}`),
          ...products.map((product) => `/products/${product.slug}`),
        ]
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`).join('\n')}
</urlset>`

        return new Response(sitemap, {
          headers: { 'Content-Type': 'application/xml' },
        })
      },
    },
  },
})
