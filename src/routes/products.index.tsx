import { createFileRoute } from '@tanstack/react-router'
import { CtaSection, LabeledSection, PageIntro, SiteShell } from '../components/site'
import { GemMark } from '../components/gems'
import { ArrowLink, BodyText, DisplayHeading, MonoLabel } from '../components/ui'
import { products } from '../data/products'
import { openSourceProjects } from '../data/open-source'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/products/')({
  head: () =>
    seo({
      title: 'Products · JXD',
      description:
        'The in-house products behind JXD delivery speed: Onyx, a full-stack template; Quartz, a product management suite; Garnet, a data compliance framework; Sapphire, an AI simulation engine; and Amber, a Markdown REST client and test suite. Plus open source, including the Companies House SDK.',
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
        lede="We build on our own in-house products, an advantage most consultancies don't have: client work starts at speed, on foundations we trust because we live on them."
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
            <div className="flex items-center justify-center max-lg:hidden">
              <GemMark name={product.slug} className="w-40" />
            </div>
          </div>
        </LabeledSection>
      ))}
      <LabeledSection index="06" title="Open source">
        <DisplayHeading className="max-w-[24ch] text-3xl text-balance sm:text-4xl">
          Built for us, released for everyone.
        </DisplayHeading>
        <BodyText className="mt-6">
          When the official tooling falls short, we build our own and publish
          it. MIT licensed, maintained, and tested in CI. More on the way.
        </BodyText>
        <dl className="mt-12 divide-y divide-neutral-950/10">
          {openSourceProjects.map((project) => (
            <div
              key={project.packageName}
              className="grid grid-cols-1 gap-x-8 gap-y-4 py-10 first:pt-0 last:pb-0 lg:grid-cols-[16rem_1fr]"
            >
              <dt>
                <span className="block font-display text-xl font-semibold tracking-tight">
                  {project.name}
                </span>
                <span className="mt-2 block font-mono text-sm text-neutral-500">
                  {project.packageName}
                </span>
              </dt>
              <dd>
                <BodyText>{project.description}</BodyText>
                <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-base font-semibold sm:text-sm/6">
                  <ArrowLink href={project.docsUrl}>Docs</ArrowLink>
                  <ArrowLink href={project.githubUrl}>GitHub</ArrowLink>
                  {project.blogSlug ? (
                    <ArrowLink
                      to="/blog/$slug"
                      params={{ slug: project.blogSlug }}
                    >
                      Build log
                    </ArrowLink>
                  ) : null}
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </LabeledSection>
      <CtaSection index="07" />
    </SiteShell>
  )
}
