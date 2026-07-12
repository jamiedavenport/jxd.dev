import { Link, createFileRoute } from '@tanstack/react-router'
import clsx from 'clsx'
import { allPosts } from 'content-collections'
import { PageIntro, SiteShell } from '../components/site'
import { MonoLabel, PostMeta, TagRow } from '../components/ui'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/blog/')({
  head: () =>
    seo({
      title: 'Blog · JXD',
      description:
        'Build logs, AI-native practice, and opinionated craft from JXD, a London software consultancy.',
      path: '/blog',
      noindex: true,
      image: 'default',
    }),
  component: BlogIndexPage,
})

const posts = [...allPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
)
const featured = posts.find((post) => post.featured)
const rest = posts.filter((post) => post !== featured)

function BlogIndexPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Blog"
        title="Notes from the workshop."
        lede="Build logs, AI-native practice, and opinionated craft. Written when there is something worth saying."
      />
      <section className="border-t border-neutral-950/10">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          {featured ? (
            <article className="border border-neutral-950/10">
              <div className="border-b border-neutral-950/10 px-6 py-3 font-mono text-sm uppercase tracking-wide text-neutral-500">
                <span className="text-red-600">Featured</span> /{' '}
                {featured.lane}
              </div>
              <div className="px-6 py-8 sm:py-10">
                <h2 className="max-w-[24ch] font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: featured.slug }}
                    className="hover:text-red-600"
                  >
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-[56ch] text-base/7 text-pretty text-neutral-600 sm:text-sm/6">
                  {featured.summary}
                </p>
                <PostMeta
                  author={featured.author}
                  readingTime={featured.readingTime}
                  className="mt-6"
                />
                <TagRow tags={featured.tags} className="mt-4" />
              </div>
            </article>
          ) : null}

          <div className={clsx(featured && 'mt-4')}>
            {rest.map((post, i) => (
              <article
                key={post.slug}
                className={clsx(
                  'grid grid-cols-1 gap-x-8 gap-y-3 py-10 sm:py-12 lg:grid-cols-[16rem_1fr]',
                  i > 0 && 'border-t border-neutral-950/10',
                )}
              >
                <MonoLabel className="text-neutral-500">{post.lane}</MonoLabel>
                <div>
                  <h2 className="max-w-[24ch] font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="hover:text-red-600"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 max-w-[56ch] text-base/7 text-pretty text-neutral-600 sm:text-sm/6">
                    {post.summary}
                  </p>
                  <PostMeta
                    author={post.author}
                    readingTime={post.readingTime}
                    className="mt-5"
                  />
                  <TagRow tags={post.tags} className="mt-3" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
