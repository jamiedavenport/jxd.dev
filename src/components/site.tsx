import { Link } from '@tanstack/react-router'
import { useConsent } from '@policystack/react/consent'
import { PolicyStack } from '@policystack/react/provider'
import clsx from 'clsx'
import { useState } from 'react'
import policy from '../policystack'
import type { ReactNode } from 'react'
import {
  ArrowLink,
  BodyText,
  DisplayHeading,
  Lede,
  LogoMark,
  MonoLabel,
} from './ui'
import { GemMark } from './gems'
import { products } from '../data/products'

export const BOOKING_URL = 'https://cal.eu/jxd-dev/30min'

const navLinks = [
  { to: '/work', label: 'Work' },
  { to: '/how-we-work', label: 'Process' },
  { to: '/products', label: 'Products' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
]

const navCell =
  'flex w-32 items-center justify-center border-l border-neutral-950/10 hover:bg-neutral-950/2 hover:text-neutral-950'

function ProductsNavItem() {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="relative flex items-stretch"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false)
      }}
    >
      <Link
        to="/products"
        aria-expanded={open}
        className={`${navCell} gap-1.5`}
        activeProps={{ className: 'bg-neutral-950/2 text-neutral-950' }}
      >
        Products
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className={`size-4 shrink-0 fill-current ${open ? 'rotate-180' : ''}`}
        >
          <path
            fillRule="evenodd"
            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
      {open ? (
        <div className="absolute top-full left-0 -mt-px w-72 bg-white shadow-lg ring-1 ring-neutral-950/10">
          {products.map((product) => (
            <Link
              key={product.slug}
              to="/products/$slug"
              params={{ slug: product.slug }}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 border-t border-neutral-950/10 px-4 py-3 first:border-t-0 hover:bg-neutral-950/2"
            >
              <GemMark name={product.slug} className="size-7 shrink-0" />
              <span>
                <span className="block font-medium text-neutral-950">
                  {product.name}
                </span>
                <span className="block text-neutral-600">{product.role}</span>
              </span>
            </Link>
          ))}
          <Link
            to="/products"
            onClick={() => setOpen(false)}
            className="block border-t border-neutral-950/10 px-4 py-3 font-medium text-neutral-950 hover:bg-neutral-950/2"
          >
            All products <span aria-hidden="true">→</span>
          </Link>
        </div>
      ) : null}
    </div>
  )
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <PolicyStack config={policy}>
      <div className="isolate flex min-h-dvh flex-col bg-white text-neutral-950">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CookieBanner />
      </div>
    </PolicyStack>
  )
}

function CookieBanner() {
  const { route, acceptAll, acceptNecessary } = useConsent()
  if (route !== 'cookie') return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-950/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-4 lg:px-8">
        <div className="text-sm/6 text-neutral-600">
          <p>
            Essential cookies run this site. Analytics cookies are set only if
            you allow them.{' '}
            <Link
              to="/cookies"
              className="font-medium text-neutral-950 hover:text-red-600"
            >
              Cookie policy
            </Link>
          </p>
          <Link
            to="/products/$slug"
            params={{ slug: 'garnet' }}
            className="mt-1 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-neutral-500 hover:text-neutral-950"
          >
            <GemMark name="garnet" className="size-3.5 shrink-0" />
            Powered by Garnet
          </Link>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <button
            type="button"
            onClick={() => acceptNecessary()}
            className="relative border border-neutral-950 px-3 py-1.5 font-medium hover:bg-neutral-950 hover:text-white"
          >
            Necessary only
          </button>
          <button
            type="button"
            onClick={() => acceptAll()}
            className="bg-neutral-950 px-4 py-1.5 font-medium text-white hover:bg-neutral-800"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}

function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-950/10 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-stretch justify-between px-6 lg:px-8">
        <div className="flex items-center py-5 font-display text-lg font-semibold">
          <Link to="/" aria-label="Homepage" className="flex items-center gap-2.5">
            <LogoMark className="size-5 shrink-0" />
            JXD
          </Link>
        </div>
        <div className="flex items-stretch border-r border-neutral-950/10 text-sm/6">
          <nav className="hidden items-stretch text-neutral-600 lg:flex">
            {navLinks.map((link) =>
              link.to === '/products' ? (
                <ProductsNavItem key={link.to} />
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={navCell}
                  activeProps={{
                    className: 'bg-neutral-950/2 text-neutral-950',
                  }}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>
          <Link
            to="/contact"
            className="flex items-center border-l border-neutral-950/10 px-5 font-medium hover:bg-neutral-950 hover:text-white"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative flex items-center border-l border-neutral-950/10 px-4 lg:hidden"
          >
            {open ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth={1.5}
                className="size-6 stroke-current"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth={1.5}
                className="size-6 stroke-current"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
            />
          </button>
        </div>
      </div>
      {open ? (
        <nav className="border-t border-neutral-950/10 lg:hidden">
          <div className="mx-auto max-w-7xl px-6 py-4 text-base/7">
            {navLinks.map((link) => (
              <div key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-neutral-600 hover:text-neutral-950"
                  activeProps={{ className: 'text-neutral-950' }}
                >
                  {link.label}
                </Link>
                {link.to === '/products' ? (
                  <div className="ml-1 border-l border-neutral-950/10 pl-4">
                    {products.map((product) => (
                      <Link
                        key={product.slug}
                        to="/products/$slug"
                        params={{ slug: product.slug }}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2.5 py-2 text-neutral-600 hover:text-neutral-950"
                        activeProps={{ className: 'text-neutral-950' }}
                      >
                        <GemMark name={product.slug} className="size-5 shrink-0" />
                        {product.name}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  )
}

function FooterColumn({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-wide text-neutral-500">
        {title}
      </p>
      <ul role="list" className="mt-4 space-y-3 text-sm/6">
        {children}
      </ul>
    </div>
  )
}

const footerLink = 'text-neutral-600 hover:text-neutral-950'

function SiteFooter() {
  return (
    <footer className="border-t border-neutral-950/10">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
          <div>
            <p className="flex items-center gap-2.5 font-display text-lg font-semibold">
              <LogoMark className="size-5 shrink-0" />
              JXD
            </p>
            <p className="mt-3 max-w-[36ch] text-sm/6 text-neutral-600">
              Serious software, shipped in weeks. A London consultancy for
              founders, startups, and established businesses.
            </p>
            <p className="mt-6 text-sm/6">
              <a
                href="mailto:hello@jxd.dev"
                className="font-medium hover:text-red-600"
              >
                hello@jxd.dev
              </a>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterColumn title="Company">
              <li>
                <Link to="/work" className={footerLink}>
                  Work
                </Link>
              </li>
              <li>
                <Link to="/how-we-work" className={footerLink}>
                  Process
                </Link>
              </li>
              <li>
                <Link to="/about" className={footerLink}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className={footerLink}>
                  Blog
                </Link>
              </li>
            </FooterColumn>
            <FooterColumn title="Products">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    to="/products/$slug"
                    params={{ slug: product.slug }}
                    className={clsx('flex items-center gap-2', footerLink)}
                  >
                    <GemMark name={product.slug} className="size-4 shrink-0" />
                    {product.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/products" className={footerLink}>
                  All products
                </Link>
              </li>
            </FooterColumn>
            <FooterColumn title="Contact">
              <li>
                <Link to="/contact" className={footerLink}>
                  Start a project
                </Link>
              </li>
              <li>
                <a href={BOOKING_URL} className={footerLink}>
                  Book a call
                </a>
              </li>
              <li>
                <a href="mailto:hello@jxd.dev" className={footerLink}>
                  Email us
                </a>
              </li>
            </FooterColumn>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-950/10 pt-8 font-mono text-xs uppercase tracking-wide text-neutral-500">
          <p>© 2026 JXD Ltd</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-neutral-950">
              Privacy
            </Link>
            <Link to="/cookies" className="hover:text-neutral-950">
              Cookies
            </Link>
            <a href="/rss.xml" className="hover:text-neutral-950">
              RSS
            </a>
            <p>London</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function PageIntro({
  eyebrow,
  title,
  lede,
  aside,
}: {
  eyebrow: string
  title: string
  lede?: string
  aside?: ReactNode
}) {
  return (
    <section className="grid-lines">
      <div
        className={clsx(
          'mx-auto max-w-7xl px-6 pt-16 pb-12 sm:pt-24 sm:pb-16 lg:px-8',
          aside && 'grid grid-cols-1 gap-x-8 lg:grid-cols-[1fr_20rem] lg:items-center',
        )}
      >
        <div>
          <MonoLabel className="text-red-600">{eyebrow}</MonoLabel>
          <DisplayHeading
            as="h1"
            className="mt-6 max-w-[24ch] text-4xl text-balance sm:text-6xl"
          >
            {title}
          </DisplayHeading>
          {lede ? <Lede className="mt-6">{lede}</Lede> : null}
        </div>
        {aside ? (
          <div className="flex items-center justify-center max-lg:hidden">
            {aside}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function LabeledSection({
  id,
  index,
  title,
  children,
}: {
  id?: string
  index: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-neutral-950/10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-8 px-6 py-16 sm:py-20 lg:grid-cols-[16rem_1fr] lg:px-8">
        <MonoLabel as="h2" className="text-neutral-500">
          <span className="text-red-600">{index}</span> / {title}
        </MonoLabel>
        <div>{children}</div>
      </div>
    </section>
  )
}

export function CtaSection({ index }: { index: string }) {
  return (
    <LabeledSection index={index} title="Contact">
      <BodyText>
        Tell us what you need to ship. One conversation with the engineer who
        would do the work.
      </BodyText>
      <p className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
        <a href="mailto:hello@jxd.dev" className="hover:text-red-600">
          hello@jxd.dev
        </a>
      </p>
      <p className="mt-6 text-base font-semibold sm:text-sm/6">
        <ArrowLink href={BOOKING_URL}>Or book a 30-minute call</ArrowLink>
      </p>
    </LabeledSection>
  )
}
