import { createFileRoute } from '@tanstack/react-router'
import { createAnalyticsHandler } from '@stetcms/analytics/server'

import config from '#/stet.config'

const handler = createAnalyticsHandler(config.analytics)

export const Route = createFileRoute('/api/analytics')({
  server: {
    handlers: {
      POST: ({ request }) => handler(request),
    },
  },
})
