import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '../styles.css?url'
import { SITE_URL } from '../lib/seo'
import { SiteShell } from '../components/site'
import { ButtonLink, DisplayHeading, Lede, MonoLabel } from '../components/ui'

const organizationJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'JXD Ltd',
  url: SITE_URL,
  email: 'hello@jxd.dev',
  description:
    'London software consultancy. Rigorous, AI-native software shipped in weeks, owned entirely by your team.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'London',
    addressCountry: 'GB',
  },
})

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'JXD · Serious software, shipped in weeks' },
      {
        name: 'description',
        content:
          'JXD is a London software consultancy. Rigorous, AI-native software shipped in weeks, owned entirely by your team.',
      },
    ],
    links: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'JXD Blog',
        href: `${SITE_URL}/rss.xml`,
      },
      { rel: 'preconnect', href: 'https://rsms.me/' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Mona+Sans:wdth,wght@75..125,200..900&display=swap',
      },
      { rel: 'stylesheet', href: appCss },
    ],
    scripts: [{ type: 'application/ld+json', children: organizationJsonLd }],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
})

function NotFound() {
  return (
    <SiteShell>
      <section className="grid-lines">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-16 sm:pt-24 sm:pb-24 lg:px-8">
          <MonoLabel className="text-red-600">404</MonoLabel>
          <DisplayHeading
            as="h1"
            className="mt-6 max-w-[24ch] text-4xl text-balance sm:text-6xl"
          >
            This page doesn't exist.
          </DisplayHeading>
          <Lede className="mt-6">
            The address may be wrong, or the page may have moved. Everything
            worth reading is reachable from the home page.
          </Lede>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 text-base font-semibold sm:text-sm/6">
            <ButtonLink to="/">Back to home</ButtonLink>
            <Link to="/blog" className="hover:text-red-600">
              Read the blog <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
