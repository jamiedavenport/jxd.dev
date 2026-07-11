import { createFileRoute, notFound } from '@tanstack/react-router'
import { CtaSection, LabeledSection, PageIntro, SiteShell } from '../components/site'
import { GemMark } from '../components/gems'
import { BodyText, FeatureGrid, MonoLabel } from '../components/ui'
import { products } from '../data/products'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/products/$slug')({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug)
    if (!product) throw notFound()
    return { name: product.name, lede: product.lede, slug: product.slug }
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo({
          title: `${loaderData.name} · JXD`,
          description: loaderData.lede,
          path: `/products/${loaderData.slug}`,
        })
      : {},
  component: ProductPage,
})

function ProductPage() {
  const { slug } = Route.useParams()
  const product = products.find((p) => p.slug === slug)
  if (!product) return null

  return (
    <SiteShell>
      <PageIntro
        eyebrow={`Products / ${product.role}`}
        title={`${product.name}.`}
        lede={product.lede}
      />

      <LabeledSection index="01" title="What it is">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-[1fr_16rem]">
          <div>
            <MonoLabel className="text-neutral-500">{product.status}</MonoLabel>
            {product.paragraphs.map((paragraph, i) => (
              <BodyText key={paragraph} className={i === 0 ? 'mt-6' : 'mt-4'}>
                {paragraph}
              </BodyText>
            ))}
          </div>
          <div className="flex items-center justify-center max-lg:hidden">
            <GemMark name={product.slug} className="w-40" />
          </div>
        </div>
      </LabeledSection>

      <LabeledSection index="02" title="What's inside">
        <FeatureGrid items={product.features} />
      </LabeledSection>

      <CtaSection index="03" />
    </SiteShell>
  )
}
