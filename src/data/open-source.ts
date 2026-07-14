export type OpenSourceProject = {
  name: string
  packageName: string
  description: string
  docsUrl: string
  githubUrl: string
  blogSlug?: string
}

export const openSourceProjects: OpenSourceProject[] = [
  {
    name: 'Companies House SDK',
    packageName: '@jxdltd/companies-house',
    description:
      'A typed TypeScript SDK for the Companies House Public Data API. All 34 endpoints, zero dependencies, generated from a curated OpenAPI 3.1 spec and verified against the live API daily.',
    docsUrl: 'https://companies-house.jxd.dev',
    githubUrl: 'https://github.com/jamiedavenport/companies-house',
    blogSlug: 'companies-house-sdk',
  },
]
