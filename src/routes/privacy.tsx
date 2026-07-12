import { createFileRoute } from '@tanstack/react-router'
import { PrivacyPolicy } from '@policystack/react/policy'
import { PageIntro, SiteShell } from '../components/site'
import { PoweredByGarnet, policyComponents } from '../components/policy'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/privacy')({
  head: () =>
    seo({
      title: 'Privacy policy · JXD',
      description: 'How JXD collects, uses, and protects your data.',
      path: '/privacy',
    }),
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <SiteShell>
      <PageIntro eyebrow="Legal" title="Privacy policy." />
      <section className="border-t border-neutral-950/10">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="prose max-w-[65ch]">
            <PrivacyPolicy components={policyComponents} />
          </div>
          <PoweredByGarnet />
        </div>
      </section>
    </SiteShell>
  )
}
