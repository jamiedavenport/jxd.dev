import type { GemName } from '../components/gems'

export type Product = {
  slug: GemName
  index: string
  name: string
  role: string
  status: string
  lede: string
  summary: string
  paragraphs: string[]
  features: { name: string; description: string }[]
}

export const products: Product[] = [
  {
    slug: 'onyx',
    index: '01',
    name: 'Onyx',
    role: 'Full-stack template',
    status: 'In production use on every engagement',
    lede: 'The black foundation stone. Auth, billing, deploys, monitoring, and testing solved before the first client commit.',
    summary:
      'A proven starting point, so client work begins at product speed, not from scratch. Hardened further by every engagement it ships.',
    paragraphs: [
      'Onyx is where every JXD build starts. Authentication, billing, CI/CD, monitoring, and a testing harness are already in place, so the first week of an engagement produces product, not plumbing.',
      'It is not a boilerplate rotting in a repository. Onyx runs in production across our own products and every client build, and improvements flow back into it weekly. When you start on Onyx, you inherit every hard lesson we have already paid for.',
    ],
    features: [
      {
        name: 'Auth and sessions',
        description: 'Passkeys, OAuth, and session management, wired and tested.',
      },
      {
        name: 'Billing',
        description: 'Subscriptions and usage-based billing, ready for real money.',
      },
      {
        name: 'CI/CD',
        description: 'Every commit builds, tests, and deploys from day one.',
      },
      {
        name: 'Monitoring',
        description: 'Errors, performance, and uptime visible from the first deploy.',
      },
      {
        name: 'Testing harness',
        description: 'Unit, integration, and end-to-end scaffolding around the critical path.',
      },
      {
        name: 'Documentation',
        description: 'A structure your team inherits, not a wiki that dies.',
      },
    ],
  },
  {
    slug: 'quartz',
    index: '02',
    name: 'Quartz',
    role: 'Product management suite',
    status: 'Runs every JXD engagement',
    lede: 'The transparent one. Code, issues, documents, meetings, and CI in one place, visible to clients in real time.',
    summary:
      'Issues link to the commits that close them, notes link to the decisions they record, and clients see the same view we do.',
    paragraphs: [
      'The standard stack for an engagement is five tabs: a repository host, an issue tracker, a docs wiki, a meetings doc, and a CI dashboard. The connections between them live in people’s heads. Quartz replaces the five tabs with one place where everything links to everything.',
      'For a consultancy that promises radical transparency, this is not tooling, it is the promise made concrete. Clients get the same access we have, and the weekly note is assembled from what actually happened rather than from memory.',
    ],
    features: [
      {
        name: 'Issues linked to code',
        description: 'Every issue links to the commits that close it.',
      },
      {
        name: 'Documents and decisions',
        description: 'Decisions recorded where the work happens, not in a separate wiki.',
      },
      {
        name: 'Meeting notes',
        description: 'Linked to the issues and documents they touch.',
      },
      {
        name: 'CI in view',
        description: 'Build and deploy status alongside the work it belongs to.',
      },
      {
        name: 'Weekly notes',
        description: 'Assembled from what actually happened, not from memory.',
      },
      {
        name: 'Client access',
        description: 'You see the same view we do. No tour guide.',
      },
    ],
  },
  {
    slug: 'garnet',
    index: '03',
    name: 'Garnet',
    role: 'Data compliance framework',
    status: 'Formerly PolicyStack',
    lede: 'The protection stone. Data compliance treated as an engineering problem, mapped to how systems actually behave.',
    summary:
      'Policies as maintained artefacts with owners, history, and evidence, mapped to real systems instead of a PDF nobody reads.',
    paragraphs: [
      'Compliance usually lives in documents that describe an idealised version of your systems. Garnet inverts that: policies are maintained artefacts, each mapped to the systems and data it actually governs, with evidence collected continuously.',
      'When systems change, the affected policies surface immediately, so compliance drifts back into line weekly rather than annually. Audits become an export, not a quarter-long emergency.',
    ],
    features: [
      {
        name: 'Policy catalogue',
        description: 'Policies as maintained artefacts with owners and history.',
      },
      {
        name: 'System mapping',
        description: 'Each policy mapped to the systems and data it governs.',
      },
      {
        name: 'Evidence trails',
        description: 'Proof collected continuously, not scrambled before an audit.',
      },
      {
        name: 'Drift detection',
        description: 'When systems change, affected policies surface immediately.',
      },
      {
        name: 'Review cadence',
        description: 'Scheduled reviews built in, not remembered.',
      },
      {
        name: 'Auditor export',
        description: 'Everything an auditor needs, in a format they accept.',
      },
    ],
  },
]
