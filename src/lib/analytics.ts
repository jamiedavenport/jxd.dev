import { OpenPanel } from '@openpanel/web'

// Screen views follow client-side navigation automatically.
export const op = new OpenPanel({
  clientId: 'a6f6914d-fb80-47b0-aabc-a2c167c60826',
  trackScreenViews: true,
  trackOutgoingLinks: true,
  disabled: !import.meta.env.PROD,
})
