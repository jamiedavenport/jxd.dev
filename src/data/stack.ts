import type { TechLogoName } from '../components/logos'

export const stack: {
  term: string
  items: { name: string; logo: TechLogoName }[]
}[] = [
  {
    term: 'Interface',
    items: [
      { name: 'TypeScript', logo: 'typescript' },
      { name: 'React', logo: 'react' },
      { name: 'TanStack', logo: 'tanstack' },
      { name: 'Next.js', logo: 'nextjs' },
      { name: 'Vue', logo: 'vue' },
      { name: 'Expo', logo: 'expo' },
      { name: 'Tailwind', logo: 'tailwind' },
    ],
  },
  {
    term: 'API',
    items: [
      { name: 'Node.js', logo: 'nodejs' },
      { name: 'Go', logo: 'go' },
      { name: 'Laravel', logo: 'laravel' },
      { name: 'tRPC', logo: 'trpc' },
      { name: 'Stripe', logo: 'stripe' },
    ],
  },
  {
    term: 'Data and AI',
    items: [
      { name: 'Postgres', logo: 'postgres' },
      { name: 'SQLite', logo: 'sqlite' },
      { name: 'Redis', logo: 'redis' },
      { name: 'Claude', logo: 'claude' },
      { name: 'AI SDK', logo: 'aisdk' },
    ],
  },
  {
    term: 'Infrastructure',
    items: [
      { name: 'Cloudflare', logo: 'cloudflare' },
      { name: 'AWS', logo: 'aws' },
      { name: 'Kubernetes', logo: 'kubernetes' },
      { name: 'Terraform', logo: 'terraform' },
    ],
  },
  {
    term: 'Quality',
    items: [
      { name: 'GitHub Actions', logo: 'githubactions' },
      { name: 'Playwright', logo: 'playwright' },
      { name: 'Vitest', logo: 'vitest' },
      { name: 'OpenTelemetry', logo: 'opentelemetry' },
    ],
  },
]
