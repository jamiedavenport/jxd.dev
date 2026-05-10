import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "../lib/seo";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

export const Route = createFileRoute("/web-design")({
  component: WebDesign,
  head: (ctx) =>
    pageMeta(
      {
        title: "Web design — JXD",
        description:
          "A fixed-price, five-day web design service. Designed, built, and launched by Jamie Davenport for £3,000.",
        path: "/web-design",
      },
      ctx,
    ),
});

const HIGHLIGHTS: Array<{ term: string; description: string }> = [
  {
    term: "Five days, start to launch",
    description:
      "We start on a Monday and your site is live by Friday. No drawn-out projects, no ambiguous timelines.",
  },
  {
    term: "Fixed price, no surprises",
    description:
      "£3,000 covers design, build, content polish, and deployment. If scope grows, we agree it together — never after the fact.",
  },
  {
    term: "Designed in the browser",
    description:
      "No Figma round-trips. You see real screens on day two and give feedback on the actual product, not a mockup.",
  },
  {
    term: "Modern, fast, owned by you",
    description:
      "Built on the same stack I use for my own work — TanStack Start, React, Tailwind. You get the code, the design, and full control of hosting.",
  },
  {
    term: "One person, end to end",
    description:
      "I do the design, the build, and the launch. No account managers, no handoffs, no agency overhead.",
  },
];

const PROCESS: Array<{ day: string; title: string; description: string }> = [
  {
    day: "Day 1",
    title: "Discovery",
    description:
      "Async, by design. I research your company, then send a tight set of questions on goals, audience, and scope. You answer when you can — no call required.",
  },
  {
    day: "Day 2",
    title: "Design",
    description:
      "First design pass goes live on a preview URL. Real type, real colours, real layout — not a static mockup. You react, I refine.",
  },
  {
    day: "Day 3",
    title: "Build",
    description:
      "Content lands, motion and interaction come in, mobile is dialled. The site stops looking like a draft and starts feeling like the real thing.",
  },
  {
    day: "Day 4",
    title: "Polish",
    description:
      "Your feedback, then the unsexy work — performance budget, cross-browser, accessibility, copy edits, OG images. The details that make a site feel finished.",
  },
  {
    day: "Day 5",
    title: "Launch",
    description:
      "Deploy to your domain, wire up analytics, hand over the repo and credentials. You leave the week with a live site and full ownership.",
  },
];

const CLIENTS: Array<{
  name: string;
  description: string;
  href: string;
  year: string;
}> = [
  {
    name: "PolicyStack",
    description: "Privacy and consent as code.",
    href: "https://policystack.dev",
    year: "2026",
  },
  {
    name: "Auvia",
    description: "AI client intake for law firms and accountants.",
    href: "https://auvia.io",
    year: "2026",
  },
];

const BOOKING_URL = "https://cal.eu/jamie-openpolicy/30min";

const INCLUDED: Array<string> = [
  "Async discovery + research",
  "One-page custom design, in browser",
  "Hand-built on a modern stack",
  "Content polish, OG images, SEO",
  "Performance + accessibility pass",
  "Deploy to your domain, analytics wired",
  "Full code and design handover",
];

function WebDesign() {
  return (
    <div className="min-h-dvh bg-white font-sans text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <SiteHeader />

        <section className="mt-14 lg:mt-20 lg:grid lg:grid-cols-[10rem_1fr] lg:gap-x-10">
          <p className="font-mono text-xs text-zinc-400 lg:pt-2">service</p>
          <div className="mt-3 lg:mt-0">
            <h1 className="text-3xl font-medium tracking-tight text-balance lg:text-4xl">
              Web design, shipped in a week.
            </h1>
            <p className="mt-2 font-mono text-sm text-zinc-500">
              <span className="text-zinc-400">$</span> Five days. £3,000 fixed.
              You launch on Friday.
            </p>
          </div>
        </section>

        <Section label="intro">
          <p className="max-w-[68ch] leading-relaxed text-pretty text-zinc-700">
            Most web projects drift. A two-week build becomes two months,
            scope creeps, the price moves, and what shows up at the end is
            rarely what you signed off on. I work the other way: a tight
            scope, a fixed price, and a deadline that doesn't move.
          </p>
          <p className="mt-4 max-w-[68ch] leading-relaxed text-pretty text-zinc-700">
            One focused week — design, build, launch. You get a fast,
            modern, hand-built site that you fully own, without the agency
            overhead or the open-ended invoice.
          </p>
        </Section>

        <Section label="highlights">
          <dl className="flex flex-col">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.term}
                className="grid gap-1 border-t border-zinc-200 py-4 first:border-t-0 sm:grid-cols-[14rem_1fr] sm:gap-x-6"
              >
                <dt className="font-medium text-zinc-900">{h.term}</dt>
                <dd className="max-w-[60ch] text-pretty text-zinc-600">
                  {h.description}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section label="process">
          <ol role="list" className="flex flex-col">
            {PROCESS.map((step) => (
              <li
                key={step.day}
                className="grid gap-2 border-t border-zinc-200 py-4 first:border-t-0 sm:grid-cols-[6rem_1fr] sm:gap-x-6"
              >
                <p className="font-mono text-xs text-zinc-400 tabular-nums sm:pt-1">
                  {step.day}
                </p>
                <div>
                  <p className="font-medium text-zinc-900">{step.title}</p>
                  <p className="mt-1 max-w-[60ch] text-pretty text-zinc-600">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section label="clients">
          <ul role="list" className="flex flex-col">
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
                    <span className="text-zinc-500"> — {c.description}</span>
                  </span>
                  <span className="shrink-0 font-mono text-xs text-zinc-400 tabular-nums">
                    {c.year}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section label="pricing">
          <div className="border border-zinc-200 bg-white p-6 sm:p-8">
            <div className="flex items-baseline justify-between gap-4 font-mono text-xs text-zinc-500">
              <span>jxd.dev</span>
              <span>invoice — web-design.txt</span>
            </div>

            <dl className="mt-6 flex flex-col font-mono text-sm">
              {INCLUDED.map((item, i) => (
                <div
                  key={item}
                  className="flex items-baseline justify-between gap-4 border-t border-dashed border-zinc-200 py-2 first:border-t-0"
                >
                  <dt className="text-zinc-700">
                    <span className="text-zinc-400">
                      {String(i + 1).padStart(2, "0")}.
                    </span>{" "}
                    {item}
                  </dt>
                  <dd className="shrink-0 tabular-nums text-zinc-400">
                    included
                  </dd>
                </div>
              ))}
              <div className="mt-2 grid gap-1 border-t-2 border-zinc-900 pt-3">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-medium tracking-wide text-zinc-900 uppercase">
                    Project
                  </dt>
                  <dd className="text-2xl font-medium tracking-tight tabular-nums text-zinc-900">
                    £3,000
                  </dd>
                </div>
                <dd className="text-zinc-500">
                  Design, build, and launch — one-time fee.
                </dd>
              </div>

              <div className="mt-3 grid gap-1 border-t border-dashed border-zinc-300 pt-3">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-medium tracking-wide text-zinc-900 uppercase">
                    Ongoing
                  </dt>
                  <dd className="text-2xl font-medium tracking-tight tabular-nums text-zinc-900">
                    £100{" "}
                    <span className="text-zinc-400">/mo</span>
                  </dd>
                </div>
                <dd className="text-zinc-500">
                  Hosting, small updates, and upkeep — cancel anytime.
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-col gap-4 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-xs text-zinc-500">
                Limited availability.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 self-start whitespace-nowrap bg-zinc-900 px-4 py-2.5 font-mono text-xs text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
              >
                Book a 30 min call
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <p className="mt-4 font-mono text-xs text-zinc-500">
            Prefer email?{" "}
            <a
              href="mailto:contact@jxd.dev?subject=Web%20design"
              className="text-zinc-700 underline underline-offset-4 hover:text-zinc-900"
            >
              contact@jxd.dev
            </a>
          </p>
        </Section>

        <SiteFooter />
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
      className="mt-14 grid gap-3 scroll-mt-16 lg:mt-20 lg:grid-cols-[10rem_1fr] lg:gap-x-10"
    >
      <p className="font-mono text-xs text-zinc-400 lg:pt-1">{label}</p>
      <div>{children}</div>
    </section>
  );
}

