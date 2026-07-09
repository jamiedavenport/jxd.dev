import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { PlainAnalytics } from "@plainalpha/analytics/react";

import "#/lib/analytics";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
      { rel: "icon", type: "image/jpeg", href: "/me.jpeg" },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <HeadContent />
      </head>
      <body>
        <PlainAnalytics
          publicKey="pa_pub_01KW04810A9G8KMKVZ69BWTDZF"
          host="https://alpha.plain.jxd.dev"
        />
        <div id="app" className="isolate">
          <main>{children ?? <Outlet />}</main>
        </div>
        <TanStackDevtools
          config={{ position: "bottom-right" }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <p className="font-mono text-xs text-zinc-400">404</p>
        <h1 className="mt-6 text-3xl font-medium tracking-tight lg:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-prose leading-relaxed text-zinc-600">
          The page you're looking for doesn't exist or has moved.
        </p>
        <p className="mt-8 font-mono text-xs text-zinc-500">
          →{" "}
          <Link
            to="/"
            className="text-zinc-700 underline underline-offset-4 hover:text-zinc-900"
          >
            back to jxd.dev
          </Link>
        </p>
      </div>
    </div>
  );
}
