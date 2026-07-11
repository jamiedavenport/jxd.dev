import { createFileRoute } from '@tanstack/react-router'
import { LabeledSection, PageIntro, SiteShell } from '../components/site'
import { NumberedRows } from '../components/ui'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/contact')({
  head: () =>
    seo({
      title: 'Contact · JXD',
      description:
        'Tell us what you need to ship. One conversation with the engineer who would do the work, and a clear yes or no within days.',
      path: '/contact',
    }),
  component: ContactPage,
})

const steps = [
  {
    name: 'Write to us',
    description:
      'A few lines about what you need to ship is enough. No brief required.',
  },
  {
    name: 'One conversation',
    description:
      'A call with the engineer who would do the work, usually within days. No discovery phase, no sales team.',
  },
  {
    name: 'A clear yes or no',
    description:
      'If it is a yes, you get a written scope and a start date. If it is a no, we say why and, where we can, point you somewhere better.',
  },
]

function ContactPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Contact"
        title="Start with a conversation."
        lede="Tell us what you need to ship. You'll get a clear yes or no within days."
      />

      <LabeledSection index="01" title="Email">
        <p className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">
          <a href="mailto:hello@jxd.dev" className="hover:text-red-600">
            hello@jxd.dev
          </a>
        </p>
      </LabeledSection>

      <LabeledSection index="02" title="What happens next">
        <NumberedRows items={steps} />
      </LabeledSection>
    </SiteShell>
  )
}
