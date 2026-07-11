import { createFileRoute } from '@tanstack/react-router'
import clsx from 'clsx'
import { CtaSection, LabeledSection, SiteShell } from '../components/site'
import { CadenceDiagram, IsoChips, IsoLegend, IsoStack } from '../components/diagrams'
import { TechLogo } from '../components/logos'
import {
  ArrowLink,
  BodyText,
  ButtonLink,
  DisplayHeading,
  FeatureGrid,
  Lede,
  MonoLabel,
  NumberedRows,
  Quote,
  StatStrip,
  TermRows,
} from '../components/ui'
import { caseStudies } from '../data/case-studies'
import { stack } from '../data/stack'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/')({
  head: () =>
    seo({
      title: 'JXD · Serious software, shipped in weeks',
      description:
        'JXD is a London software consultancy. Rigorous, AI-native software for founders, startups, and established businesses. Shipped in weeks, owned entirely by your team.',
      path: '/',
    }),
  component: Home,
})

const modes = [
  {
    term: 'Build',
    detail: 'Products and features, taken from idea to production.',
  },
  {
    term: 'Rescue',
    detail: 'Struggling projects unblocked, stabilised, and accelerated.',
  },
  {
    term: 'Embed',
    detail: 'Senior engineering presence inside your existing team.',
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

const featuredStudy = caseStudies[0]

function Home() {
  return (
    <SiteShell>
      <section className="grid-lines">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-x-8 gap-y-16 px-6 pt-20 pb-16 sm:pt-28 sm:pb-20 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <MonoLabel className="text-red-600">
              London software consultancy
            </MonoLabel>
            <DisplayHeading
              as="h1"
              className="mt-6 max-w-[20ch] text-5xl text-balance sm:text-7xl"
            >
              Weeks, not quarters.
            </DisplayHeading>
            <Lede className="mt-6">
              JXD builds serious software for founders, startups, and
              established businesses. Rigorous, AI-native, and owned entirely
              by your team when we hand it over.
            </Lede>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 text-base font-semibold sm:text-sm/6">
              <ButtonLink to="/contact">Start a project</ButtonLink>
              <ArrowLink href="#what-we-do">What we do</ArrowLink>
            </div>
          </div>
          <div>
            <IsoStack className="py-10" topChildren={<IsoChips />} />
            <IsoLegend
              entries={['Interface', 'API', 'Infrastructure']}
              className="mt-4 text-center"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-950/10">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <StatStrip stats={stats} />
        </div>
      </section>

      <LabeledSection id="what-we-do" index="01" title="What we do">
        <TermRows
          rows={modes}
          columns="sm:grid-cols-2"
          termClass="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
          detailClass="max-w-[48ch] text-neutral-600"
        />
        <p className="mt-10 text-base font-semibold sm:text-sm/6">
          <ArrowLink to="/work">See the work</ArrowLink>
        </p>
      </LabeledSection>

      <LabeledSection index="02" title="Proof">
        <DisplayHeading className="max-w-[24ch] text-3xl text-balance sm:text-4xl">
          {featuredStudy.title}
        </DisplayHeading>
        <BodyText className="mt-6">{featuredStudy.summary}</BodyText>
        <Quote
          text={featuredStudy.quote.text}
          attribution={featuredStudy.quote.attribution}
          className="mt-10"
        />
        <p className="mt-10 text-base font-semibold sm:text-sm/6">
          <ArrowLink to="/work/$slug" params={{ slug: featuredStudy.slug }}>
            Read the case study
          </ArrowLink>
        </p>
      </LabeledSection>

      <LabeledSection index="03" title="Values">
        <NumberedRows items={values} />
      </LabeledSection>

      <LabeledSection index="04" title="The stack">
        <DisplayHeading className="max-w-[24ch] text-3xl text-balance sm:text-4xl">
          Modern by default.
        </DisplayHeading>
        <BodyText className="mt-6">
          Proven, current tools we run in production on our own products.
          AI-native throughout: models draft, engineers decide, and every line
          passes review, tests, and CI.
        </BodyText>
        <div className="mt-10 border border-neutral-950/10 text-base/7 sm:text-sm/6">
          {stack.map((group, gi) => (
            <div
              key={group.term}
              className={clsx(
                'grid grid-cols-1 lg:grid-cols-[16rem_1fr]',
                gi > 0 && 'border-t border-neutral-950/10',
              )}
            >
              <div className="border-neutral-950/10 px-5 py-4 font-medium max-lg:border-b lg:border-r">
                {group.term}
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4">
                {Array.from({
                  length: Math.ceil(group.items.length / 4) * 4,
                }).map((_, i) => {
                  const item = group.items[i]
                  const mobileCells = Math.ceil(group.items.length / 2) * 2
                  return (
                    <div
                      key={item ? item.name : `empty-${i}`}
                      className={clsx(
                        'flex items-center gap-2.5 border-neutral-950/10 px-4 py-4',
                        i % 2 === 1 && 'max-lg:border-l',
                        i >= 2 && 'max-lg:border-t',
                        i % 4 !== 0 && 'lg:border-l',
                        i >= 4 && 'lg:border-t',
                        !item && i >= mobileCells && 'max-lg:hidden',
                      )}
                    >
                      {item ? (
                        <>
                          <TechLogo
                            name={item.logo}
                            className="size-5 shrink-0"
                          />
                          <span className="font-medium">{item.name}</span>
                        </>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </LabeledSection>

      <LabeledSection id="how-we-work" index="05" title="How we work">
        <FeatureGrid items={practices} />
        <CadenceDiagram className="mt-12" />
        <p className="mt-10 text-base font-semibold sm:text-sm/6">
          <ArrowLink to="/how-we-work">How we work, in full</ArrowLink>
        </p>
      </LabeledSection>

      <CtaSection index="06" />
    </SiteShell>
  )
}
