import { createFileRoute, notFound } from "@tanstack/react-router";
import { allProjects } from "content-collections";
import { pageMeta } from "../../lib/seo";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { MdxContent } from "../../components/MdxContent";

export const Route = createFileRoute("/project/$slug")({
  loader: ({ params }) => {
    const project = allProjects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  component: ProjectPage,
  head: (ctx) => {
    const { loaderData } = ctx;
    if (!loaderData) return {};
    return pageMeta(
      {
        title: `${loaderData.title} — JXD`,
        description: loaderData.excerpt,
        path: `/project/${loaderData.slug}`,
      },
      ctx,
    );
  },
});

function ProjectPage() {
  const project = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <SiteHeader />

        <article className="mt-14 grid gap-3 lg:mt-20 lg:grid-cols-[10rem_1fr] lg:gap-x-10">
          <div className="flex flex-col gap-1 lg:pt-1">
            <p className="font-mono text-xs text-zinc-400">project</p>
            <a
              href="/#projects"
              className="font-mono text-xs text-zinc-400 hover:text-zinc-900"
            >
              ← all projects
            </a>
          </div>
          <div className="min-w-0">
            <h1 className="text-3xl font-medium tracking-tight text-balance lg:text-4xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-prose leading-relaxed text-zinc-600">
              {project.tagline ?? project.excerpt}
            </p>

            {project.links && project.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md px-3 py-1.5 font-mono text-xs text-zinc-700 ring-1 ring-zinc-200 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            )}

            {project.hero && (
              <img
                src={project.hero}
                alt={project.title}
                className="mt-8 w-full rounded-md ring-1 ring-zinc-200"
              />
            )}

            {project.video && (
              <video
                src={project.video}
                poster={project.videoPoster}
                controls
                playsInline
                muted
                loop
                className="mt-6 w-full rounded-md ring-1 ring-zinc-200"
              />
            )}

            <div className="mt-12 border-t border-zinc-200 pt-12">
              <MdxContent code={project.body} />
            </div>
          </div>
        </article>

        <SiteFooter />
      </div>
    </div>
  );
}
