import { createFileRoute } from '@tanstack/react-router'
import { createHandler } from '@inmargin/server'

import { margin } from '../../lib/margin'

export const Route = createFileRoute('/api/margin')({
  server: {
    handlers: {
      POST: ({ request }) => createHandler(margin)(request),
    },
  },
})
