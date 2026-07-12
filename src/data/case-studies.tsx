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
]
