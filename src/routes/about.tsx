import { createFileRoute } from '@tanstack/react-router'
import { CtaSection, LabeledSection, PageIntro, SiteShell } from '../components/site'
import { BodyText, DisplayHeading } from '../components/ui'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/about')({
  head: () =>
    seo({
      title: 'About · JXD',
      description:
        'JXD is founded and run by an engineer with 10+ years shipping production software. Based in London. Small is a feature: you get the engineer doing the work, not a rotating bench.',
      path: '/about',
    }),
  component: AboutPage,
})

const sections = [
  {
    index: '01',
    label: 'Who',
    title: 'A decade of production software.',
    text: 'Ten years and counting of building products end to end: frontend, backend, infrastructure, and the unglamorous parts in between. Startups, scale-ups, and established businesses. Based in London, working with clients anywhere.',
  },
  {
    index: '02',
    label: 'Why JXD',
    title: 'Consultancies scale by adding layers.',
    text: 'Account managers, delivery leads, junior benches billed at senior rates. Every layer moves the client further from the person doing the work, and the work suffers for it. JXD exists to do the opposite: fewer engagements, done properly, by the person you actually talk to.',
  },
  {
    index: '03',
    label: 'The standard',
    title: 'A standard, not a headcount.',
    text: 'The values on the front page are not marketing. They are the standard anyone working under the JXD name will be held to: craft over volume, radical transparency, honesty on scope, and a full handover every time.',
  },
]

function AboutPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="About"
        title="Small. On purpose."
        lede="JXD is founded and run by an engineer with 10+ years shipping production software. Small is a feature: you get the engineer doing the work, not a rotating bench."
      />
      {sections.map((section) => (
        <LabeledSection
          key={section.index}
          index={section.index}
          title={section.label}
        >
          <DisplayHeading className="max-w-[24ch] text-3xl text-balance sm:text-4xl">
            {section.title}
          </DisplayHeading>
          <BodyText className="mt-6">{section.text}</BodyText>
        </LabeledSection>
      ))}
      <CtaSection index="04" />
    </SiteShell>
  )
}
