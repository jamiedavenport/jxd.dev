import type { GemName } from '../components/gems'

export type CaseStudy = {
  slug: string
  index: string
  mode: string
  client: string
  url?: string
  title: string
  summary: string
  products?: GemName[]
  facts: { label: string; value: string }[]
  sections: { index: string; heading: string; paragraphs: string[] }[]
  rows: { term: string; detail: string }[]
  quote?: { text: string; attribution: string }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'auvia',
    index: '01',
    mode: 'Build',
    client: 'Auvia',
    url: 'https://auvia.io',
    products: ['onyx', 'quartz', 'garnet'],
    title: 'A working bot to a live product in one week',
    summary:
      'Auvia had an AI intake agent that worked. It had no website to sell it and no dashboard for firms to see it working. One week later it had both, and the work continues as they grow.',
    facts: [
      { label: 'Engagement', value: 'Build' },
      { label: 'Duration', value: 'Zero to one in a week, ongoing since' },
      { label: 'Stack', value: 'TypeScript, React, Postgres, Railway' },
    ],
    sections: [
      {
        index: '01',
        heading: 'The problem',
        paragraphs: [
          'Auvia automates client intake for law firms and accountancy practices: an AI agent that answers enquiries instantly, qualifies leads against the firm’s own criteria, and books consultations straight into the calendar. The agent worked. Everything around it was missing.',
          'There was no website to put in front of a managing partner, and no dashboard where a firm could see what the agent was doing with its enquiries. With pilots approaching, the product had no face.',
        ],
      },
      {
        index: '02',
        heading: 'What we did',
        paragraphs: [
          'We designed and built auvia.io first: positioning, copy, and a site a professional services firm would trust. Days from start to finish, not weeks.',
          'Then the customer dashboard: chat engagement, bookings, and enquiries tracked across channels, integrated with the intake agent Auvia already had. The build started on Onyx, so auth, deploys, and monitoring existed on day one, and the engagement ran in Quartz, so Auvia saw the work as it happened. Their data policies run on Garnet, which matters when your customers are law firms.',
        ],
      },
      {
        index: '03',
        heading: 'The outcome',
        paragraphs: [
          'Zero to one took a single week. Auvia is live and in pilots with firms, and the work continues as they grow: same engineer, same cadence, no re-onboarding.',
        ],
      },
    ],
    rows: [
      {
        term: 'Problem',
        detail:
          'Auvia’s AI intake agent for law firms and accountancy practices worked. It had no website to sell it and no dashboard for firms to see it working.',
      },
      {
        term: 'What we did',
        detail:
          'Designed and built auvia.io, then a customer dashboard tracking chat engagement, bookings, and enquiries across channels, integrated with their existing agent. Built on Onyx, run in Quartz.',
      },
      {
        term: 'Outcome',
        detail:
          'Zero to one in a single week. Live and in pilots with firms, with the work ongoing as they grow.',
      },
    ],
    // Quote pending from Paul O'Sullivan-Sweeney, CEO and Founder, Auvia.
  },
  {
    slug: 'muriel-marketing',
    index: '02',
    mode: 'Build',
    client: 'Muriel Marketing',
    url: 'https://murielmarketing.com',
    products: ['onyx', 'garnet'],
    title: 'Client-designed mockups to a 100 Lighthouse score in a week',
    summary:
      'Muriel Marketing came with designs and AI-generated mockups, not code. One week later they had a live, fully hosted website scoring 100 on Lighthouse.',
    facts: [
      { label: 'Engagement', value: 'Build' },
      { label: 'Duration', value: 'One week, start to launch' },
      { label: 'Lighthouse', value: '100 across the board' },
    ],
    sections: [
      {
        index: '01',
        heading: 'The problem',
        paragraphs: [
          'Muriel Marketing had a clear brand and a set of designs and AI mockups showing what they wanted their site to look like. What they didn’t have was a website, or anyone to build one to that standard.',
        ],
      },
      {
        index: '02',
        heading: 'What we did',
        paragraphs: [
          'We took their designs and mockups and turned them into a real, hosted website in a week, using our own AI-assisted build process to move fast without cutting corners on performance. The build ran on Onyx, so hosting, deploys, and monitoring were sorted from day one. Their data handling runs on Garnet.',
        ],
      },
      {
        index: '03',
        heading: 'The outcome',
        paragraphs: [
          'A live site at murielmarketing.com, built in a week, scoring 100 on Lighthouse.',
        ],
      },
    ],
    rows: [
      {
        term: 'Problem',
        detail:
          'Muriel Marketing had designs and AI mockups but no website and no one to build it.',
      },
      {
        term: 'What we did',
        detail:
          'Built their designs into a live, hosted website in a week using our AI-assisted process. Built on Onyx, data handling on Garnet.',
      },
      {
        term: 'Outcome',
        detail: 'Live site, one week turnaround, 100 Lighthouse score.',
      },
    ],
    // Quote pending from Bronagh Morton.
  },
]
