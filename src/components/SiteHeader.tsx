import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="grid gap-2 lg:grid-cols-[10rem_1fr] lg:gap-x-10">
      <Link
        to="/"
        aria-label="Homepage"
        className="font-mono text-xs text-zinc-400 hover:text-zinc-900"
      >
        jxd.dev
      </Link>
    </header>
  );
}
