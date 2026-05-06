import { createFileRoute, notFound } from "@tanstack/react-router";
import { allPosts } from "content-collections";
import { pageMeta } from "../../lib/seo";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { MdxContent } from "../../components/MdxContent";

export const Route = createFileRoute("/writing/$slug")({
  loader: ({ params }) => {
    const post = allPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  component: BlogPost,
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return pageMeta({
      title: `${loaderData.title} — JXD`,
      description: loaderData.excerpt,
      path: `/writing/${loaderData.slug}`,
      image: `/og/writing/${loaderData.slug}.png`,
      type: "article",
      publishedTime: loaderData.date,
    });
  },
});

function BlogPost() {
  const post = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <SiteHeader />

        <article className="mt-14 grid gap-3 lg:mt-20 lg:grid-cols-[10rem_1fr] lg:gap-x-10">
          <div className="flex flex-col gap-1 lg:pt-1">
            <p className="font-mono text-xs text-zinc-400">writing</p>
            <a
              href="/#writing"
              className="font-mono text-xs text-zinc-400 hover:text-zinc-900"
            >
              ← all posts
            </a>
          </div>
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-balance lg:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 max-w-prose leading-relaxed text-zinc-600">
              {post.excerpt}
            </p>
            <div className="mt-6 flex items-center gap-x-4 font-mono text-xs text-zinc-500">
              {post.author && (
                <>
                  <span className="text-zinc-700">{post.author}</span>
                  <span aria-hidden="true">·</span>
                </>
              )}
              <time dateTime={post.date} className="tabular-nums">
                {formatDate(post.date)}
              </time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime}</span>
            </div>

            <div className="mt-12 border-t border-zinc-200 pt-12">
              <MdxContent code={post.body} />
            </div>
          </div>
        </article>

        <SiteFooter />
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
