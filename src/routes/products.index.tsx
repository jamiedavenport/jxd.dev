import { createFileRoute } from '@tanstack/react-router'
import { CtaSection, LabeledSection, PageIntro, SiteShell } from '../components/site'
import { IsoStack, ModuleChips } from '../components/diagrams'
import { ArrowLink, BodyText, DisplayHeading, MonoLabel } from '../components/ui'
import { products } from '../data/products'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/products/')({
  head: () =>
    seo({
      title: 'Products · JXD',
      description:
        'The in-house products behind JXD delivery speed: Onyx, a proven full-stack template; Quartz, a product management suite; and Garnet, a data compliance framework.',
      path: '/products',
    }),
  component: ProductsPage,
})

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
          key={product.slug}
          index={product.index}
          title={product.role}
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-[1fr_16rem]">
            <div>
              <DisplayHeading className="max-w-[24ch] text-3xl text-balance sm:text-4xl">
                {product.name}
              </DisplayHeading>
              <MonoLabel className="mt-3 text-neutral-500">
                {product.status}
              </MonoLabel>
              <BodyText className="mt-6">{product.summary}</BodyText>
              <p className="mt-8 text-base font-semibold sm:text-sm/6">
                <ArrowLink
                  to="/products/$slug"
                  params={{ slug: product.slug }}
                >
                  Explore {product.name}
                </ArrowLink>
              </p>
            </div>
            <div className="max-lg:hidden">
              <IsoStack
                boxClass="size-32"
                faces={product.glyph.faces}
                zClasses={product.glyph.z}
                topChildren={product.glyph.chips ? <ModuleChips /> : undefined}
              />
            </div>
          </div>
        </LabeledSection>
      ))}
      <CtaSection index="04" />
    </SiteShell>
  )
}
