import { LegalBases, Voluntary, defineConfig } from '@policystack/sdk'

export default defineConfig({
  company: {
    name: 'JXD',
    legalName: 'JXD Ltd',
    address: 'London, United Kingdom',
    contact: { email: 'hello@jxd.dev' },
  },
  effectiveDate: '2026-07-12',
  jurisdictions: ['uk', 'eea'],
  data: {
    collected: {
      'Contact information': ['Name', 'Email address', 'Message contents'],
      'Usage data': ['IP address', 'Pages requested'],
    },
    context: {
      'Contact information': {
        purpose: 'To respond to enquiries and run engagements',
        lawfulBasis: LegalBases.LegitimateInterests,
        retention: 'For the duration of our correspondence',
        provision: Voluntary('None. You can choose not to contact us.'),
      },
      'Usage data': {
        purpose: 'To operate the site securely and diagnose problems',
        lawfulBasis: LegalBases.LegitimateInterests,
        retention: '30 days',
        provision: Voluntary('None. The site works without it.'),
      },
    },
  },
  thirdParties: [
    {
      name: 'Cloudflare',
      purpose: 'Hosting and content delivery',
      policyUrl: 'https://www.cloudflare.com/privacypolicy/',
    },
  ],
  cookies: {
    used: {
      essential: true,
      analytics: true,
      functional: false,
      marketing: false,
    },
    context: {
      essential: { lawfulBasis: LegalBases.LegalObligation },
      analytics: { lawfulBasis: LegalBases.Consent },
      functional: { lawfulBasis: LegalBases.Consent },
      marketing: { lawfulBasis: LegalBases.Consent },
    },
  },
  automatedDecisionMaking: [],
})
