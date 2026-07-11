import { createFileRoute } from '@tanstack/react-router'
import { CtaSection, LabeledSection, PageIntro, SiteShell } from '../components/site'
import { CadenceDiagram, LayersDiagram } from '../components/diagrams'
import { BodyText, DisplayHeading, FeatureGrid, TermRows } from '../components/ui'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/how-we-work')({
  head: () =>
    seo({
      title: 'How we work · JXD',
      description:
        'Continuous shipping, weekly demos and written notes, production-grade foundations from day one, direct access to the engineer, and a full handover. How every JXD engagement runs.',
      path: '/how-we-work',
    }),
  component: HowWeWorkPage,
})

const noteRows = [
  {
    term: 'Shipped',
    detail: (
      <ul role="list">
        <li className="max-w-[52ch]">Invoicing flow live in production</li>
        <li className="max-w-[52ch]">
          Auth migrated to passkeys, sessions untouched
        </li>
        <li className="max-w-[52ch]">
          Search results now render in under 100ms
        </li>
      </ul>
    ),
  },
  {
    term: 'Problems',
    detail: (
      <ul role="list">
        <li className="max-w-[52ch]">
          Payments sandbox was down for two days, which cost us the Tuesday
          deploy
        </li>
        <li className="max-w-[52ch]">
          Usage import is slower than expected on large accounts. Fix is scoped
          for next week
        </li>
      </ul>
    ),
  },
  {
    term: 'Next',
    detail: (
      <ul role="list">
        <li className="max-w-[52ch]">
          Usage-based billing behind a feature flag
        </li>
        <li className="max-w-[52ch]">
          Second round of onboarding copy with your team
        </li>
      </ul>
    ),
  },
  {
    term: 'Cost',
    detail: <p className="max-w-[52ch]">4.5 days this week. On budget.</p>,
  },
]

const foundations = [
  {
    name: 'CI/CD',
    description: 'Every commit builds, tests, and can reach production without a human ceremony.',
  },
  {
    name: 'Automated tests',
    description: 'The critical paths are covered before the features that depend on them.',
  },
  {
    name: 'Monitoring',
    description: 'Errors, performance, and uptime are visible from the first deploy.',
  },
  {
    name: 'Documentation',
    description: 'Written as we build, not reconstructed at handover.',
  },
]

function HowWeWorkPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="How we work"
        title="Rigour, visible weekly."
        lede="These are not aspirations. They are how every engagement runs, from the first week to handover."
      />

      <LabeledSection index="01" title="Ship continuously">
        <DisplayHeading className="max-w-[24ch] text-3xl text-balance sm:text-4xl">
          Progress is deploys, not decks.
        </DisplayHeading>
        <BodyText className="mt-6">
          Working software reaches production in the first week and keeps
          landing every week after. Small releases against real environments,
          no big-bang launches. If a week goes by without a deploy, something
          is wrong and you will hear about it from us first.
        </BodyText>
        <CadenceDiagram className="mt-10" />
      </LabeledSection>

      <LabeledSection index="02" title="Weekly demos and notes">
        <DisplayHeading className="max-w-[24ch] text-3xl text-balance sm:text-4xl">
          A demo you can click. A note you can forward.
        </DisplayHeading>
        <BodyText className="mt-6">
          Every week ends with a demo of working software and a short written
          note: what shipped, what went wrong, what is next, and what it cost.
          The problems section is never empty, because real projects have
          problems. This is what one looks like:
        </BodyText>
        <div className="mt-8 max-w-2xl border border-neutral-950/10">
          <div className="border-b border-neutral-950/10 px-6 py-4 font-mono text-sm uppercase tracking-wide text-neutral-500">
            Week 04 / <span className="text-red-600">Weekly note</span>
          </div>
          <TermRows
            rows={noteRows}
            columns="sm:grid-cols-[6rem_1fr]"
            bordered={false}
            detailClass="text-neutral-600"
          />
        </div>
      </LabeledSection>

      <LabeledSection index="03" title="Production-grade">
        <DisplayHeading className="max-w-[24ch] text-3xl text-balance sm:text-4xl">
          Day one, not someday.
        </DisplayHeading>
        <BodyText className="mt-6">
          The foundations are in place before the first feature, because
          retrofitting them is where projects go to die.
        </BodyText>
        <FeatureGrid items={foundations} className="mt-10" />
      </LabeledSection>

      <LabeledSection index="04" title="No layers">
        <DisplayHeading className="max-w-[24ch] text-3xl text-balance sm:text-4xl">
          You talk to the engineer doing the work.
        </DisplayHeading>
        <BodyText className="mt-6">
          No account managers, no delivery leads, no game of telephone.
          Questions get answered by the person with their hands on the code,
          and decisions take a conversation instead of a meeting cycle.
        </BodyText>
        <LayersDiagram className="mt-10" />
      </LabeledSection>

      <LabeledSection index="05" title="Full handover">
        <DisplayHeading className="max-w-[24ch] text-3xl text-balance sm:text-4xl">
          Built to be owned by your team.
        </DisplayHeading>
        <BodyText className="mt-6">
          Code in your accounts from day one. Infrastructure under your
          ownership, documentation your next engineer can onboard from, and a
          working session to transfer the context. When we leave, nothing
          leaves with us.
        </BodyText>
      </LabeledSection>

      <CtaSection index="06" />
    </SiteShell>
  )
}
