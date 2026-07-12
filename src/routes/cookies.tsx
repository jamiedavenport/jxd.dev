import { createFileRoute } from '@tanstack/react-router'
import { CookiePolicy } from '@policystack/react/policy'
import { PageIntro, SiteShell } from '../components/site'
import { PoweredByGarnet, policyComponents } from '../components/policy'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/cookies')({
  head: () =>
    seo({
      title: 'Cookie policy · JXD',
      description: 'The cookies jxd.dev sets and why.',
      path: '/cookies',
    }),
  component: CookiesPage,
})

function CookiesPage() {
  return (
    <SiteShell>
      <PageIntro eyebrow="Legal" title="Cookie policy." />
      <section className="border-t border-neutral-950/10">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="prose max-w-[65ch]">
            <CookiePolicy components={policyComponents} />
          </div>
          <PoweredByGarnet />
        </div>
      </section>
    </SiteShell>
  )
}
