import { createFileRoute } from '@tanstack/react-router'
import { CtaSection, LabeledSection, PageIntro, SiteShell } from '../components/site'
import { DisplayHeading, MonoLabel, TermRows } from '../components/ui'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/work')({
  head: () =>
    seo({
      title: 'Work · JXD',
      description:
        'Case studies from JXD engagements: projects rescued, products built from idea to production, and teams strengthened from the inside.',
      path: '/work',
    }),
  component: WorkPage,
})

const caseStudies = [
  {
    index: '01',
    mode: 'Rescue',
    client: 'Fintech scale-up',
    title: 'A stalled replatform, shipping again in six weeks',
    rows: [
      {
        term: 'Problem',
        detail:
          'A two-year replatform had not shipped in nine months. Releases were manual, the team was blocked on architecture decisions, and confidence was gone on both sides.',
      },
      {
        term: 'What we did',
        detail:
          'We embedded a senior engineer, cut the release scope in half, and put CI/CD and automated tests around the critical path. Architecture decisions stopped queueing and started landing.',
      },
      {
        term: 'Outcome',
        detail:
          'First production release in six weeks. Weekly releases since, and the internal team owns the pipeline.',
      },
    ],
  },
  {
    index: '02',
    mode: 'Build',
    client: 'B2B founder',
    title: 'Idea to paying customers in eight weeks',
    rows: [
      {
        term: 'Problem',
        detail:
          'A non-technical founder with a validated compliance problem, no engineering team, and a fixed runway.',
      },
      {
        term: 'What we did',
        detail:
          'We built the product from our full-stack template, so auth, billing, and infrastructure were solved on day one and the weeks went into the product itself. Weekly demos kept scope honest.',
      },
      {
        term: 'Outcome',
        detail:
          'Live in eight weeks with the first paying customers. Full handover of code, infrastructure, and documentation.',
      },
    ],
  },
  {
    index: '03',
    mode: 'Embed',
    client: 'Established business',
    title: 'Senior presence inside an existing team',
    rows: [
      {
        term: 'Problem',
        detail:
          'A capable in-house team drowning in legacy, with no senior engineer to set direction or hold a standard.',
      },
      {
        term: 'What we did',
        detail:
          'We embedded alongside the team: pairing, code review, and production-grade practices introduced incrementally. No rewrite, no drama.',
      },
      {
        term: 'Outcome',
        detail:
          'The team ships weekly and holds the standard themselves. The engagement ended on time, as scoped.',
      },
    ],
  },
]

function WorkPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Work"
        title="Proof, not promises."
        lede="Case studies are anonymised while client products are in flight. The shape of the work is real: the problem, what we did, and the outcome."
      />
      {caseStudies.map((study) => (
        <LabeledSection
          key={study.index}
          index={study.index}
          title={study.mode}
        >
          <MonoLabel className="text-neutral-500">{study.client}</MonoLabel>
          <DisplayHeading className="mt-3 max-w-[24ch] text-3xl text-balance sm:text-4xl">
            {study.title}
          </DisplayHeading>
          <TermRows rows={study.rows} className="mt-10" />
        </LabeledSection>
      ))}
      <CtaSection index="04" />
    </SiteShell>
  )
}
