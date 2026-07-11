import { createFileRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'

export const Route = createFileRoute('/')({
  component: Home,
})

const modes = [
  {
    name: 'Build',
    description: 'Products and features, taken from idea to production.',
  },
  {
    name: 'Rescue',
    description: 'Struggling projects unblocked, stabilised, and accelerated.',
  },
  {
    name: 'Embed',
    description: 'Senior engineering presence inside your existing team.',
  },
]

const values = [
  { name: 'Craft over volume', description: 'Fewer things, done properly.' },
  {
    name: 'Modern by default',
    description: 'AI-native delivery on current tools, with no accumulated caution.',
  },
  {
    name: 'Radical transparency',
    description: 'Real progress, real problems, real costs.',
  },
  {
    name: 'Honesty on scope',
    description: 'No inflated estimates, no stretched engagements. Bad work gets declined.',
  },
  {
    name: 'You own everything',
    description: 'Full handover of code, infrastructure, and knowledge. No lock-in.',
  },
]

const practices = [
  {
    name: 'Ship continuously',
    description: 'Progress is deploys, not decks. Working software from the first week.',
  },
  {
    name: 'Weekly demos and notes',
    description: 'You see real progress every week, in production and in writing.',
  },
  {
    name: 'Production-grade from day one',
    description: 'CI/CD, tests, monitoring, and documentation from the first commit.',
  },
  {
    name: 'No layers',
    description: 'You talk directly to the engineer doing the work.',
  },
]

const stats = [
  { value: '10+', label: 'years shipping production software' },
  { value: 'Weeks', label: 'from kickoff to production, not quarters' },
  { value: '100%', label: 'handover of code, infrastructure, and knowledge' },
]

function TouchTarget() {
  return (
    <span
      aria-hidden="true"
      className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
    />
  )
}

function LabeledSection({
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
        <h2 className="font-mono text-sm uppercase tracking-wide text-neutral-500">
          <span className="text-red-600">{index}</span> / {title}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  )
}

const stackLayers = [
  'border-neutral-950/20 bg-white/70',
  'border-neutral-950/30 bg-white/70',
  'border-red-600/70 bg-red-600/3',
]

const layerZ = ['translate-z-0', 'translate-z-16', 'translate-z-32']

function IsoStack() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center py-10">
      <div className="relative size-52 transform-3d [transform:rotateX(55deg)rotateZ(-45deg)] sm:size-64">
        {stackLayers.map((face, i) => (
          <div
            key={face}
            className={`absolute inset-0 rounded-xl border ${layerZ[i]} ${face}`}
          >
            {i === stackLayers.length - 1 ? (
              <>
                <div className="absolute top-5 left-5 size-10 rounded-md border border-red-600/60 bg-red-600/10" />
                <div className="absolute top-5 left-18 size-10 rounded-md border border-neutral-950/25 bg-white/60" />
                <div className="absolute top-18 left-5 h-10 w-23 rounded-md border border-neutral-950/25 bg-white/60" />
              </>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

function IsoLegend() {
  const entries = ['Interface', 'API', 'Infrastructure']
  return (
    <div className="mt-4 text-center font-mono text-sm text-neutral-500">
      {entries.map((entry, i) => (
        <p key={entry} className={i > 0 ? 'mt-1' : ''}>
          <span className={i === 0 ? 'text-red-600' : ''}>
            {String(entries.length - i).padStart(2, '0')}
          </span>{' '}
          / {entry}
        </p>
      ))}
    </div>
  )
}

function Home() {
  return (
    <div className="isolate min-h-dvh bg-white text-neutral-950">
      <header className="border-b border-neutral-950/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="font-display text-lg font-semibold">
            <a href="/" aria-label="Homepage">
              JXD
            </a>
          </div>
          <div className="flex items-center gap-x-8 text-sm/6">
            <nav className="flex items-center gap-x-8 text-neutral-600 max-sm:hidden">
              <a href="#what-we-do" className="hover:text-neutral-950">
                What we do
              </a>
              <a href="#how-we-work" className="hover:text-neutral-950">
                How we work
              </a>
            </nav>
            <a
              href="mailto:hello@jxd.dev"
              className="relative border border-neutral-950 px-3 py-1.5 font-medium hover:bg-neutral-950 hover:text-white"
            >
              Contact
              <TouchTarget />
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="grid-lines">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-x-8 gap-y-16 px-6 pt-20 pb-16 sm:pt-28 sm:pb-20 lg:grid-cols-[1fr_1fr] lg:px-8">
            <div>
              <p className="font-mono text-sm uppercase tracking-wide text-red-600">
                London software consultancy
              </p>
              <h1 className="mt-6 max-w-[20ch] font-display text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
                Weeks, not quarters.
              </h1>
              <p className="mt-6 max-w-[48ch] text-xl/8 text-pretty text-neutral-600 sm:text-lg/7">
                JXD builds serious software for founders, startups, and
                established businesses. Rigorous, AI-native, and owned entirely
                by your team when we hand it over.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 text-base font-semibold sm:text-sm/6">
                <a
                  href="mailto:hello@jxd.dev"
                  className="bg-neutral-950 px-4 py-3 text-white hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 sm:py-2.5"
                >
                  Start a project
                </a>
                <a href="#what-we-do" className="hover:text-red-600">
                  What we do <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div>
              <IsoStack />
              <IsoLegend />
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-950/10">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={[
                    'border-neutral-950/10',
                    i > 0
                      ? 'max-sm:mt-6 max-sm:border-t max-sm:pt-6 sm:border-l sm:pl-8'
                      : '',
                    i < stats.length - 1 ? 'sm:pr-8' : '',
                  ].join(' ')}
                >
                  <div className="text-4xl font-semibold tracking-tight tabular-nums">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-base/7 text-neutral-600 sm:text-sm/6">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <LabeledSection id="what-we-do" index="01" title="What we do">
          <dl>
            {modes.map((mode, i) => (
              <div
                key={mode.name}
                className={[
                  'grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-0',
                  i === 0
                    ? 'pb-8'
                    : i === modes.length - 1
                      ? 'border-t border-neutral-950/10 pt-8'
                      : 'border-t border-neutral-950/10 py-8',
                ].join(' ')}
              >
                <dt className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  {mode.name}
                </dt>
                <dd className="max-w-[48ch] text-base/7 text-neutral-600 sm:text-sm/6">
                  {mode.description}
                </dd>
              </div>
            ))}
          </dl>
        </LabeledSection>

        <LabeledSection index="02" title="Values">
          <dl className="text-base/7 sm:text-sm/6">
            {values.map((value, i) => (
              <div
                key={value.name}
                className={[
                  'grid grid-cols-[3rem_1fr] gap-x-4 sm:grid-cols-[3rem_16rem_1fr] sm:gap-x-8',
                  i === 0
                    ? 'pb-5'
                    : i === values.length - 1
                      ? 'border-t border-neutral-950/10 pt-5'
                      : 'border-t border-neutral-950/10 py-5',
                ].join(' ')}
              >
                <div className="font-mono text-sm text-red-600">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <dt className="font-medium">{value.name}</dt>
                <dd className="col-start-2 text-neutral-600 sm:col-start-3">
                  {value.description}
                </dd>
              </div>
            ))}
          </dl>
        </LabeledSection>

        <LabeledSection id="how-we-work" index="03" title="How we work">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 text-base/7 sm:grid-cols-2 sm:text-sm/6">
            {practices.map((practice) => (
              <div key={practice.name}>
                <dt className="font-medium">{practice.name}</dt>
                <dd className="mt-2 max-w-[48ch] text-neutral-600">
                  {practice.description}
                </dd>
              </div>
            ))}
          </dl>
        </LabeledSection>

        <LabeledSection index="04" title="Contact">
          <p className="max-w-[48ch] text-base/7 text-pretty text-neutral-600 sm:text-sm/6">
            Tell us what you need to ship. One conversation with the engineer
            who would do the work.
          </p>
          <p className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            <a href="mailto:hello@jxd.dev" className="hover:text-red-600">
              hello@jxd.dev
            </a>
          </p>
        </LabeledSection>
      </main>

      <footer className="border-t border-neutral-950/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-8 font-mono text-sm uppercase tracking-wide text-neutral-500 lg:px-8">
          <p>© 2026 JXD Ltd</p>
          <p>London</p>
        </div>
      </footer>
    </div>
  )
}
