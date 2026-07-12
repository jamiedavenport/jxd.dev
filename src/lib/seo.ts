export const SITE_URL = 'https://jxd.dev'
export const SITE_NAME = 'JXD'

export function seo({
  title,
  description,
  path,
  type = 'website',
  noindex = false,
  image,
}: {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  noindex?: boolean
  // Name of a file in public/og/ (without extension). Derived from the
  // path by default; pass 'default' for routes without a generated image.
  image?: string
}) {
  const url = `${SITE_URL}${path}`
  const imageSlug =
    image ?? (path === '/' ? 'home' : path.replace(/^\//, '').replaceAll('/', '-'))
  const imageUrl = `${SITE_URL}/og/${imageSlug}.png`
  return {
    meta: [
      { title },
      ...(noindex ? [{ name: 'robots', content: 'noindex' }] : []),
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}
