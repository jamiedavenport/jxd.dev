import { defineAnalytics } from '@stetcms/analytics'
import { defineStet } from '@stetcms/config'

export default defineStet({
  // Pageviews are built in ($pageview). Add typed custom events here.
  analytics: defineAnalytics({ events: {} }),
})
