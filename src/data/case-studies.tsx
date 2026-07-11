export type CaseStudy = {
  slug: string
  index: string
  mode: string
  client: string
  title: string
  summary: string
  facts: { label: string; value: string }[]
  sections: { index: string; heading: string; paragraphs: string[] }[]
  rows: { term: string; detail: string }[]
  quote: { text: string; attribution: string }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'stalled-replatform-rescue',
    index: '01',
    mode: 'Rescue',
    client: 'Fintech scale-up',
    title: 'A stalled replatform, shipping again in six weeks',
    summary:
      'Nine months without a production release, a team blocked on architecture decisions, and confidence gone on both sides. Six weeks later, it shipped.',
    facts: [
      { label: 'Engagement', value: 'Rescue' },
      { label: 'Duration', value: 'Six weeks to first release' },
      { label: 'Stack', value: 'TypeScript, React, Postgres, AWS' },
    ],
    sections: [
      {
        index: '01',
        heading: 'The problem',
        paragraphs: [
          'The replatform had been running for two years and had not reached production in nine months. Releases were manual and fragile enough that nobody wanted to be the one to press the button. Architecture decisions queued behind a weekly meeting that kept deferring them.',
          'By the time we were called, the board was asking whether the project should be cancelled. The team was capable, but every path to production ran through a bottleneck.',
        ],
      },
      {
        index: '02',
        heading: 'What we did',
        paragraphs: [
          'We embedded a senior engineer inside the team, not alongside it. The first week went into making release mechanical: CI/CD on every commit, automated tests around the critical path, and one deploy that proved the pipe worked.',
          'Then we cut the release scope in half. Not the ambition, the batch size. Decisions that had queued for months were made in days, in writing, with the people doing the work.',
        ],
      },
      {
        index: '03',
        heading: 'The outcome',
        paragraphs: [
          'The first production release landed six weeks in. Releases have been weekly since, and the internal team owns the pipeline, the tests, and the decision log. We left on schedule.',
        ],
      },
    ],
    rows: [
      {
        term: 'Problem',
        detail:
          'A two-year replatform had not shipped in nine months. Releases were manual, the team was blocked on architecture decisions, and confidence was gone on both sides.',
      },
      {
        term: 'What we did',
        detail:
          'We embedded a senior engineer, cut the release scope in half, and put CI/CD and automated tests around the critical path. Architecture decisions stopped queueing and started landing.',
      },
      {
        term: 'Outcome',
        detail:
          'First production release in six weeks. Weekly releases since, and the internal team owns the pipeline.',
      },
    ],
    quote: {
      text: 'The first deploy landed in week one and it never stopped. We forgot what being blocked felt like.',
      attribution: 'CTO, fintech scale-up',
    },
  },
  {
    slug: 'idea-to-customers-in-eight-weeks',
    index: '02',
    mode: 'Build',
    client: 'B2B founder',
    title: 'Idea to paying customers in eight weeks',
    summary:
      'A non-technical founder with a validated problem, no engineering team, and a fixed runway. Live in eight weeks, with the first paying customers.',
    facts: [
      { label: 'Engagement', value: 'Build' },
      { label: 'Duration', value: 'Eight weeks to launch' },
      { label: 'Stack', value: 'TypeScript, React, Postgres, Cloudflare' },
    ],
    sections: [
      {
        index: '01',
        heading: 'The problem',
        paragraphs: [
          'The founder had done the hard part already: a validated compliance problem, design partners waiting, and a clear picture of the first version. What they did not have was an engineering team, or the runway to spend six months hiring one.',
          'Every agency quote they had received started with a discovery phase and ended somewhere past their runway.',
        ],
      },
      {
        index: '02',
        heading: 'What we did',
        paragraphs: [
          'We started the build on Onyx, our full-stack template, so authentication, billing, deploys, and monitoring existed on day one. The eight weeks went into the product, not the plumbing.',
          'A weekly demo kept scope honest. Features that did not survive contact with the design partners were cut in conversation, not discovered dead at launch.',
        ],
      },
      {
        index: '03',
        heading: 'The outcome',
        paragraphs: [
          'The product went live in week eight with its first paying customers on it. The founder received a full handover: code and infrastructure in their accounts, documentation a future hire can onboard from, and no dependency on us to keep shipping.',
        ],
      },
    ],
    rows: [
      {
        term: 'Problem',
        detail:
          'A non-technical founder with a validated compliance problem, no engineering team, and a fixed runway.',
      },
      {
        term: 'What we did',
        detail:
          'We built the product from our full-stack template, so auth, billing, and infrastructure were solved on day one and the weeks went into the product itself. Weekly demos kept scope honest.',
      },
      {
        term: 'Outcome',
        detail:
          'Live in eight weeks with the first paying customers. Full handover of code, infrastructure, and documentation.',
      },
    ],
    quote: {
      text: 'I own everything they built, and the handover notes are the best documentation I have ever been given.',
      attribution: 'Founder, B2B SaaS',
    },
  },
  {
    slug: 'senior-presence-inside-a-team',
    index: '03',
    mode: 'Embed',
    client: 'Established business',
    title: 'Senior presence inside an existing team',
    summary:
      'A capable in-house team drowning in legacy, with no senior engineer to set direction. No rewrite, no drama, and the standard stayed when we left.',
    facts: [
      { label: 'Engagement', value: 'Embed' },
      { label: 'Duration', value: 'Six months, ended as scoped' },
      { label: 'Stack', value: 'Their stack, modernised in place' },
    ],
    sections: [
      {
        index: '01',
        heading: 'The problem',
        paragraphs: [
          'The team was capable and cared about the work, but had nobody senior enough to set direction or hold a standard. Legacy had accumulated to the point where every change felt dangerous, and the default answer to risk was a meeting.',
          'Leadership was being pitched a rewrite by every vendor they spoke to. They suspected, correctly, that a rewrite would trade a known mess for an unknown one.',
        ],
      },
      {
        index: '02',
        heading: 'What we did',
        paragraphs: [
          'We embedded alongside the team rather than above it. Pairing, code review, and production-grade practices arrived incrementally: CI first, then tests around the paths that actually broke, then monitoring that made risk visible instead of felt.',
          'No rewrite. The legacy system got safer to change every week, and the team learned the standard by working inside it.',
        ],
      },
      {
        index: '03',
        heading: 'The outcome',
        paragraphs: [
          'Six months in, the team ships weekly and holds the standard themselves. The engagement ended on time, as scoped, because embedding that ends is the point: senior presence should compound, not become a dependency.',
        ],
      },
    ],
    rows: [
      {
        term: 'Problem',
        detail:
          'A capable in-house team drowning in legacy, with no senior engineer to set direction or hold a standard.',
      },
      {
        term: 'What we did',
        detail:
          'We embedded alongside the team: pairing, code review, and production-grade practices introduced incrementally. No rewrite, no drama.',
      },
      {
        term: 'Outcome',
        detail:
          'The team ships weekly and holds the standard themselves. The engagement ended on time, as scoped.',
      },
    ],
    quote: {
      text: 'It never felt like a consultant passing through. The standard stayed when they left.',
      attribution: 'Head of Engineering, established business',
    },
  },
]
