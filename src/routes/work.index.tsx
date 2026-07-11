import { createFileRoute } from '@tanstack/react-router'
import { CtaSection, LabeledSection, PageIntro, SiteShell } from '../components/site'
import { ArrowLink, DisplayHeading, MonoLabel, Quote, TermRows } from '../components/ui'
import { caseStudies } from '../data/case-studies'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/work/')({
  head: () =>
    seo({
      title: 'Work · JXD',
      description:
        'Case studies from JXD engagements: projects rescued, products built from idea to production, and teams strengthened from the inside.',
      path: '/work',
    }),
  component: WorkPage,
})

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
          key={study.slug}
          index={study.index}
          title={study.mode}
        >
          <MonoLabel className="text-neutral-500">{study.client}</MonoLabel>
          <DisplayHeading className="mt-3 max-w-[24ch] text-3xl text-balance sm:text-4xl">
            {study.title}
          </DisplayHeading>
          <TermRows rows={study.rows} className="mt-10" />
          <Quote
            text={study.quote.text}
            attribution={study.quote.attribution}
            className="mt-10"
          />
          <p className="mt-10 text-base font-semibold sm:text-sm/6">
            <ArrowLink to="/work/$slug" params={{ slug: study.slug }}>
              Read the full case study
            </ArrowLink>
          </p>
        </LabeledSection>
      ))}
      <CtaSection index="04" />
    </SiteShell>
  )
}
