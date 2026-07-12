import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import { SiteShell } from '../components/site'
import { PostMeta, TagRow } from '../components/ui'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = allPosts.find((p) => p.slug === params.slug)
    if (!post) throw notFound()
    return { title: post.title, summary: post.summary, slug: post.slug }
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo({
          title: `${loaderData.title} · JXD`,
          description: loaderData.summary,
          path: `/blog/${loaderData.slug}`,
          type: 'article',
        })
      : {},
  component: BlogPostPage,
})

function BlogPostPage() {
  const { slug } = Route.useParams()
  const post = allPosts.find((p) => p.slug === slug)
  if (!post) return null

  return (
    <SiteShell>
      <article className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-8 px-6 py-16 sm:py-20 lg:grid-cols-[16rem_1fr] lg:px-8">
        <div className="font-mono text-sm uppercase tracking-wide text-neutral-500">
          <p>
            <span className="text-red-600">Blog</span> / {post.lane}
          </p>
          <p className="mt-4">
            <Link to="/blog" className="hover:text-neutral-950">
              <span aria-hidden="true">←</span> All posts
            </Link>
          </p>
        </div>
        <div>
          <h1 className="max-w-[24ch] font-display text-4xl font-semibold tracking-tight text-pretty sm:text-5xl">
            {post.title}
          </h1>
          <PostMeta
            author={post.author}
            date={post.date}
            readingTime={post.readingTime}
            className="mt-5"
          />
          <p className="mt-6 max-w-[48ch] text-xl/8 text-pretty text-neutral-600 sm:text-lg/7">
            {post.summary}
          </p>
          <TagRow tags={post.tags} className="mt-6" />
          <div
            className="prose mt-12 max-w-[65ch]"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </article>
    </SiteShell>
  )
}
