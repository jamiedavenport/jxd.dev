export function SiteFooter() {
  return (
    <footer className="mt-20 grid gap-2 border-t border-zinc-200 pt-6 font-mono text-xs text-zinc-500 lg:mt-28 lg:grid-cols-[10rem_1fr] lg:gap-x-10">
      <p className="text-zinc-400">// eof</p>
      <div className="flex items-center justify-end">
        <a
          href="mailto:contact@jxd.dev"
          className="text-zinc-400 hover:text-zinc-900"
        >
          contact@jxd.dev
        </a>
      </div>
    </footer>
  );
}
