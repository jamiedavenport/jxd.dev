import { createFileRoute, Link } from "@tanstack/react-router";
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import { allPosts } from "content-collections";
import { pageMeta } from "../lib/seo";
import { SiteHeader } from "../components/SiteHeader";

export const Route = createFileRoute("/")({
  component: Home,
  head: (ctx) =>
    pageMeta(
      {
        title: "JXD",
        description:
          "Jamie Davenport — software engineer, entrepreneur, investor.",
        path: "/",
      },
      ctx,
    ),
});

const NAME = "Jamie Davenport";
const ROLE = "Software engineer, entrepreneur, investor.";
const LOCATION = "London, UK";

type Project = {
  name: string;
  blurb: string;
  year: string;
  href?: string;
  slug?: string;
};

const PROJECTS: Project[] = [
  {
    name: "restmd",
    blurb:
      "A markdown-native REST client — requests live in .md files, version-controlled and executable.",
    slug: "restmd",
    year: "2026",
  },
  {
    name: "PolicyStack",
    blurb:
      "Privacy and consent as code — open primitives for policies, banners, and developer-first compliance.",
    href: "https://policystack.dev",
    year: "2026",
  },
  {
    name: "Plain",
    blurb: "Modern and reliable Github alternative.",
    href: "https://plain.jxd.dev",
    year: "2026",
  },
  {
    name: "Offstage",
    blurb: "Conversational analytics for coding agents.",
    href: "https://offstage.sh",
    year: "2026",
  },
];

const CLIENTS = [
  {
    name: "Auvia",
    role: "Web Design & Development",
    href: "https://auvia.io",
    year: "2026",
  },
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/jamiedavenport",
    Icon: GithubLogoIcon,
  },
  { label: "X", href: "https://x.com/jamiedavenport", Icon: XLogoIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jamie-davenport-uk/",
    Icon: LinkedinLogoIcon,
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <SiteHeader />

        <section className="mt-14 lg:mt-20 lg:grid lg:grid-cols-[10rem_1fr] lg:gap-x-10">
          <div className="hidden lg:block" />
          <div>
            <img
              src="/me.jpeg"
              alt={NAME}
              width={56}
              height={56}
              className="size-14 rounded-full ring-1 ring-zinc-200/80"
            />
            <h1 className="mt-5 text-3xl font-medium tracking-tight lg:text-4xl">
              {NAME}
            </h1>
            <p className="mt-2 font-mono text-sm text-zinc-500">
              <span className="text-zinc-400">$</span> {ROLE}
            </p>
          </div>
        </section>

        <Section label="about">
          <p className="leading-relaxed text-zinc-700">
            Hey, I'm Jamie. I build open-source developer tools and ship
            production work for a small handful of clients. Most of my time goes
            into{" "}
            <a
              href="https://policystack.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-600"
            >
              PolicyStack
            </a>{" "}
            — privacy and consent as code. Before that I ran Docbot, a VC-backed
            startup that didn't quite make it.
          </p>
          <p className="mt-3 font-mono text-xs text-zinc-500">
            {LOCATION} ·{" "}
            <a href="mailto:contact@jxd.dev" className="hover:text-zinc-900">
              contact@jxd.dev
            </a>
          </p>
        </Section>

        <Section label="projects">
          <ul className="flex flex-col">
            {PROJECTS.map((p) => {
              const inner = (
                <>
                  <span>
                    <span className="font-medium underline-offset-4 group-hover:underline">
                      {p.name}
                    </span>
                    <span className="text-zinc-500"> — {p.blurb}</span>
                  </span>
                  <span className="shrink-0 font-mono text-xs text-zinc-400 tabular-nums">
                    {p.year}
                  </span>
                </>
              );
              return (
                <li
                  key={p.name}
                  className="border-t border-zinc-200 py-3 first:border-t-0"
                >
                  {p.slug ? (
                    <Link
                      to="/project/$slug"
                      params={{ slug: p.slug }}
                      className="group flex items-baseline justify-between gap-6"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline justify-between gap-6"
                    >
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </Section>

        <Section label="clients">
          <ul className="flex flex-col">
            {CLIENTS.map((c) => (
              <li
                key={c.name}
                className="border-t border-zinc-200 py-3 first:border-t-0"
              >
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-6"
                >
                  <span>
                    <span className="font-medium underline-offset-4 group-hover:underline">
                      {c.name}
                    </span>
                    <span className="text-zinc-500"> — {c.role}</span>
                  </span>
                  <span className="shrink-0 font-mono text-xs text-zinc-400 tabular-nums">
                    {c.year}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-xs text-zinc-500">
            Available for new work —{" "}
            <a
              href="https://cal.eu/jamie-openpolicy/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-700 underline underline-offset-4 hover:text-zinc-900"
            >
              book a 30 min call
            </a>
          </p>
        </Section>

        <Section id="writing" label="writing">
          <ul className="flex flex-col">
            {[...allPosts]
              .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
              .map((p) => (
                <li
                  key={p.slug}
                  className="border-t border-zinc-200 py-3 first:border-t-0"
                >
                  <Link
                    to="/writing/$slug"
                    params={{ slug: p.slug }}
                    className="group flex items-baseline justify-between gap-6"
                  >
                    <span className="line-clamp-3">
                      <span className="font-medium underline-offset-4 group-hover:underline">
                        {p.title}
                      </span>
                      <span className="text-zinc-500"> — {p.excerpt}</span>
                    </span>
                    <span className="shrink-0 font-mono text-xs text-zinc-400 tabular-nums">
                      {formatYear(p.date)}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </Section>

        <footer className="mt-20 grid gap-2 border-t border-zinc-200 pt-6 lg:mt-28 lg:grid-cols-[10rem_1fr] lg:gap-x-10">
          <p className="font-mono text-xs text-zinc-400">// eof</p>
          <div className="flex items-center justify-end gap-4 font-mono text-xs text-zinc-500">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 transition-colors hover:text-zinc-900"
              >
                <Icon weight="regular" className="size-4" />
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

function Section({
  id,
  label,
  children,
}: {
  id?: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mt-14 grid gap-3 lg:mt-20 lg:grid-cols-[10rem_1fr] lg:gap-x-10 scroll-mt-16"
    >
      <p className="font-mono text-xs text-zinc-400 lg:pt-1">{label}</p>
      <div>{children}</div>
    </section>
  );
}

function formatYear(iso: string): string {
  return new Date(iso).getFullYear().toString();
}
