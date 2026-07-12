import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { CtaSection, LabeledSection, PageIntro, SiteShell } from '../components/site'
import { BodyText, MonoLabel, Quote } from '../components/ui'
import { GemMark } from '../components/gems'
import { caseStudies } from '../data/case-studies'
import { products } from '../data/products'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    const study = caseStudies.find((s) => s.slug === params.slug)
    if (!study) throw notFound()
    return { title: study.title, summary: study.summary, slug: study.slug }
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo({
          title: `${loaderData.title} · JXD`,
          description: loaderData.summary,
          path: `/work/${loaderData.slug}`,
          type: 'article',
        })
      : {},
  component: CaseStudyPage,
})

function CaseStudyPage() {
  const { slug } = Route.useParams()
  const study = caseStudies.find((s) => s.slug === slug)
  if (!study) return null

  return (
    <SiteShell>
      <PageIntro
        eyebrow={`Work / ${study.mode}`}
        title={study.title}
        lede={study.summary}
      />

      <section className="border-t border-neutral-950/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-6 px-6 py-10 sm:grid-cols-3 sm:gap-x-8 lg:px-8">
          {study.facts.map((fact) => (
            <div key={fact.label}>
              <MonoLabel className="text-neutral-500">{fact.label}</MonoLabel>
              <div className="mt-2 text-base font-medium sm:text-sm/6">
                {fact.value}
              </div>
            </div>
          ))}
          {study.products ? (
            <div>
              <MonoLabel className="text-neutral-500">Products</MonoLabel>
              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-base font-medium sm:text-sm/6">
                {study.products.map((slug) => {
                  const product = products.find((p) => p.slug === slug)
                  if (!product) return null
                  return (
                    <Link
                      key={slug}
                      to="/products/$slug"
                      params={{ slug }}
                      className="group flex items-center gap-2"
                    >
                      <GemMark name={slug} className="w-5" />
                      <span className="underline decoration-neutral-950/30 underline-offset-4 group-hover:decoration-neutral-950">
                        {product.name}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ) : null}
          {study.url ? (
            <div>
              <MonoLabel className="text-neutral-500">Live at</MonoLabel>
              <div className="mt-2 text-base font-medium sm:text-sm/6">
                <a
                  href={study.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-neutral-950/30 underline-offset-4 hover:decoration-neutral-950"
                >
                  {study.url.replace('https://', '')}
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {study.sections.map((section) => (
        <LabeledSection
          key={section.index}
          index={section.index}
          title={section.heading}
        >
          {section.paragraphs.map((paragraph, i) => (
            <BodyText key={paragraph} className={i > 0 ? 'mt-4' : undefined}>
              {paragraph}
            </BodyText>
          ))}
          {section.index === '03' && study.quote ? (
            <Quote
              text={study.quote.text}
              attribution={study.quote.attribution}
              className="mt-10"
            />
          ) : null}
        </LabeledSection>
      ))}

      <section className="border-t border-neutral-950/10">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <p className="font-mono text-sm uppercase tracking-wide text-neutral-500">
            <Link to="/work" className="hover:text-neutral-950">
              <span aria-hidden="true">←</span> All case studies
            </Link>
          </p>
        </div>
      </section>

      <CtaSection index="04" />
    </SiteShell>
  )
}
