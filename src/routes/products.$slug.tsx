import { createFileRoute, notFound } from '@tanstack/react-router'
import { CtaSection, LabeledSection, PageIntro, SiteShell } from '../components/site'
import { ProductMark } from '../components/products'
import { ArrowLink, BodyText, FeatureGrid, MonoLabel } from '../components/ui'
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
        aside={<ProductMark name={product.slug} className="w-40" />}
      />

      <LabeledSection index="01" title="What it is">
        <MonoLabel className="text-neutral-500">{product.status}</MonoLabel>
        {product.paragraphs.map((paragraph, i) => (
          <BodyText key={paragraph} className={i === 0 ? 'mt-6' : 'mt-4'}>
            {paragraph}
          </BodyText>
        ))}
        {product.links ? (
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-base font-semibold sm:text-sm/6">
            {product.links.map((link) => (
              <ArrowLink key={link.href} href={link.href}>
                {link.label}
              </ArrowLink>
            ))}
          </div>
        ) : null}
      </LabeledSection>

      <LabeledSection index="02" title="What's inside">
        <FeatureGrid items={product.features} />
      </LabeledSection>

      <CtaSection index="03" />
    </SiteShell>
  )
}
