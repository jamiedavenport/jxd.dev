export type StaticEntry = {
  slug: string
  outPath: string
  eyebrow: string
  title: string
  description: string
}

export const staticEntries: ReadonlyArray<StaticEntry> = [
  {
    slug: 'home',
    outPath: 'public/og/home.png',
    eyebrow: '',
    title: 'Jamie Davenport',
    description: 'Software engineer, entrepreneur, investor.',
  },
]
