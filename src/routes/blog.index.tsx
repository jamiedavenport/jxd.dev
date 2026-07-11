import { Link, createFileRoute } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import { PageIntro, SiteShell } from '../components/site'
import { MonoLabel } from '../components/ui'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/blog/')({
  head: () =>
    seo({
      title: 'Blog · JXD',
      description:
        'Build logs, AI-native practice, and opinionated craft from JXD, a London software consultancy.',
      path: '/blog',
    }),
  component: BlogIndexPage,
})

const posts = [...allPosts].sort((a, b) => a.order - b.order)

function BlogIndexPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Blog"
        title="Notes from the workshop."
        lede="Build logs, AI-native practice, and opinionated craft. Written when there is something worth saying."
      />
      <section className="border-t border-neutral-950/10">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          {posts.map((post, i) => (
            <article
              key={post.slug}
              className={[
                'grid grid-cols-1 gap-x-8 gap-y-3 py-10 sm:py-12 lg:grid-cols-[16rem_1fr]',
                i > 0 ? 'border-t border-neutral-950/10' : '',
              ].join(' ')}
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
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  )
}
