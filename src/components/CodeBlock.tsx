import type { ReactNode } from "react";

export function WindowFrame({
  title,
  right,
  children,
  className = "",
}: {
  title?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`my-6 overflow-hidden bg-zinc-950 text-white ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
          <span className="font-mono text-xs text-white/60">{title}</span>
          {right && (
            <span className="font-mono text-[0.625rem] tracking-[0.15em] text-white/40 uppercase">
              {right}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

export function CodeBlock({
  file,
  tag,
  html,
  className = "",
}: {
  file: string;
  tag?: string;
  html: string;
  className?: string;
}) {
  return (
    <WindowFrame title={file} right={tag} className={className}>
      <div
        className="overflow-x-auto p-4 text-[0.8125rem] lg:p-5"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </WindowFrame>
  );
}
