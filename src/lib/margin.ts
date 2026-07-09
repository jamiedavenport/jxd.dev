// Server-only: carries the API key. The browser side must import only
// `type Margin` from here.
import { createMargin } from '@inmargin/server'

export const margin = createMargin({
  site: 'jxd.dev',
  apiKey: process.env.MARGIN_API_KEY,
  // Pageviews are automatic; add typed custom events here as needed.
  events: {},
})

export type Margin = typeof margin
