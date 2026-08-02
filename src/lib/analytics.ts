import { useEffect } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { createAnalytics } from '@stetcms/analytics/client'

// Type-only: keeps the plan's module graph (and its key) out of the browser.
import type config from '#/stet.config'

export const analytics = createAnalytics<(typeof config)['analytics']>({
  endpoint: '/api/analytics',
  autoPageviews: false,
})

export function usePageviews(): void {
  // One selector, so href and route always come from the same snapshot, and
  // only while idle: mid-navigation the location has advanced but the matches
  // have not, so reading them then labels the new page with the old route.
  const { isIdle, href, route } = useRouterState({
    select: (state) => ({
      isIdle: state.status === 'idle',
      href: state.location.href,
      route: state.matches.at(-1)?.fullPath,
    }),
  })
  useEffect(() => {
    if (!isIdle) return
    // The router's href, not window.location: the router has already advanced
    // when this runs and window.location has not, so letting the client read it
    // would label every pageview with the previous page.
    analytics.pageview(`${window.location.origin}${href}`, { route })
  }, [isIdle, href, route])
}
