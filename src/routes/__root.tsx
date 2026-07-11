import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '../styles.css?url'
import { SITE_URL } from '../lib/seo'

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
    scripts: [
      { src: 'https://ui.sh/ui-picker.js' },
      { type: 'application/ld+json', children: organizationJsonLd },
    ],
  }),
  component: RootComponent,
})

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
