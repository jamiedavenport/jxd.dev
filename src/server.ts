import handler, { createServerEntry } from '@tanstack/react-start/server-entry'

export default createServerEntry({
  fetch(request) {
    const url = new URL(request.url)
    if (url.hostname === 'jxd.dev') {
      url.hostname = 'www.jxd.dev'
      return Response.redirect(url.href, 301)
    }
    return handler.fetch(request)
  },
})
