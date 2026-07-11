import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import type { ReactNode } from 'react'
import {
  ArrowLink,
  BodyText,
  ButtonLink,
  DisplayHeading,
  Lede,
  MonoLabel,
} from './ui'

export const BOOKING_URL = 'https://cal.eu/jxd-dev/30min'

const navLinks = [
  { to: '/work', label: 'Work' },
  { to: '/how-we-work', label: 'How we work' },
  { to: '/products', label: 'Products' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
]

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="isolate flex min-h-dvh flex-col bg-white text-neutral-950">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}

function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="border-b border-neutral-950/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <div className="font-display text-lg font-semibold">
          <Link to="/" aria-label="Homepage">
            JXD
          </Link>
        </div>
        <div className="flex items-center gap-x-6 text-sm/6 lg:gap-x-8">
          <nav className="hidden items-center gap-x-8 text-neutral-600 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:text-neutral-950"
                activeProps={{ className: 'text-neutral-950' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ButtonLink to="/contact" variant="outline">
            Contact
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative -m-2 p-2 lg:hidden"
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
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block py-2 text-neutral-600 hover:text-neutral-950"
                activeProps={{ className: 'text-neutral-950' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-neutral-950/10">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm/6 text-neutral-600">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-neutral-950">
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="hover:text-neutral-950">
            Contact
          </Link>
        </nav>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-sm uppercase tracking-wide text-neutral-500">
          <p>© 2026 JXD Ltd</p>
          <p>London</p>
        </div>
      </div>
    </footer>
  )
}

export function PageIntro({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string
  title: string
  lede?: string
}) {
  return (
    <section className="grid-lines">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 sm:pt-24 sm:pb-16 lg:px-8">
        <MonoLabel className="text-red-600">{eyebrow}</MonoLabel>
        <DisplayHeading
          as="h1"
          className="mt-6 max-w-[24ch] text-4xl text-balance sm:text-6xl"
        >
          {title}
        </DisplayHeading>
        {lede ? <Lede className="mt-6">{lede}</Lede> : null}
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
    <section id={id} className="border-t border-neutral-950/10">
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
