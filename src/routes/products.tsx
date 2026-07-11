import { createFileRoute } from '@tanstack/react-router'
import { CtaSection, LabeledSection, PageIntro, SiteShell } from '../components/site'
import { IsoStack } from '../components/diagrams'
import { BodyText, DisplayHeading, MonoLabel } from '../components/ui'
import { seo } from '../lib/seo'
import type { ReactNode } from 'react'

export const Route = createFileRoute('/products')({
  head: () =>
    seo({
      title: 'Products · JXD',
      description:
        'The in-house products behind JXD delivery speed: a proven full-stack template, a product management suite, and PolicyStack for data compliance.',
      path: '/products',
    }),
  component: ProductsPage,
})

const products: {
  index: string
  kind: string
  name: string
  status: string
  description: string
  glyph: ReactNode
}[] = [
  {
    index: '01',
    kind: 'Template',
    name: 'Full-stack template',
    status: 'In production use on every engagement',
    description:
      'A proven starting point: auth, billing, deploys, monitoring, and testing solved before the first client commit. Client work begins at product speed, not from scratch, and every engagement hardens it further.',
    glyph: (
      <IsoStack
        boxClass="size-32"
        faces={[
          'border-neutral-950/25 bg-white/70',
          'border-red-600/70 bg-red-600/3',
        ]}
        zClasses={['translate-z-0', 'translate-z-10']}
      />
    ),
  },
  {
    index: '02',
    kind: 'Suite',
    name: 'Product management suite',
    status: 'Runs every JXD engagement',
    description:
      'Code, issues, documents, meetings, and CI in one place. Issues link to the commits that close them, notes link to the decisions they record, and clients see the same view we do. Radical transparency, built as software.',
    glyph: (
      <IsoStack
        boxClass="size-32"
        faces={['border-neutral-950/30 bg-white/70']}
        zClasses={['translate-z-0']}
        topChildren={
          <>
            <div className="absolute top-3 left-3 size-8 rounded-md border border-red-600/60 bg-red-600/10" />
            <div className="absolute top-3 right-3 size-8 rounded-md border border-neutral-950/25 bg-white/60" />
            <div className="absolute bottom-3 left-3 size-8 rounded-md border border-neutral-950/25 bg-white/60" />
            <div className="absolute right-3 bottom-3 size-8 rounded-md border border-neutral-950/25 bg-white/60" />
          </>
        }
      />
    ),
  },
  {
    index: '03',
    kind: 'Framework',
    name: 'PolicyStack',
    status: 'Framework for data compliance',
    description:
      'Data compliance treated as an engineering problem: policies as maintained artefacts, mapped to how systems actually behave rather than how a PDF says they should.',
    glyph: (
      <IsoStack
        boxClass="size-32"
        faces={[
          'border-neutral-950/20 bg-white/70',
          'border-neutral-950/30 bg-white/70',
          'border-red-600/70 bg-red-600/3',
        ]}
        zClasses={['translate-z-0', 'translate-z-6', 'translate-z-12']}
      />
    ),
  },
]

function ProductsPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Products"
        title="The tooling behind our speed."
        lede="We build on our own in-house products. It is an advantage most consultancies don't have: client work starts at speed, on foundations we trust because we live on them."
      />
      {products.map((product) => (
        <LabeledSection
          key={product.index}
          index={product.index}
          title={product.kind}
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-[1fr_16rem]">
            <div>
              <DisplayHeading className="max-w-[24ch] text-3xl text-balance sm:text-4xl">
                {product.name}
              </DisplayHeading>
              <MonoLabel className="mt-3 text-neutral-500">
                {product.status}
              </MonoLabel>
              <BodyText className="mt-6">{product.description}</BodyText>
            </div>
            <div className="max-lg:hidden">{product.glyph}</div>
          </div>
        </LabeledSection>
      ))}
      <CtaSection index="04" />
    </SiteShell>
  )
}
