import type { ComponentPropsWithoutRef } from "react";
import { WindowFrame } from "./CodeBlock";

type PreProps = ComponentPropsWithoutRef<"pre"> & {
  "data-file"?: string;
  "data-tag"?: string;
};

export const mdxComponents = {
  pre: ({ "data-file": file, "data-tag": tag, ...props }: PreProps) => (
    <WindowFrame title={file} right={tag}>
      <div className="overflow-x-auto p-4 text-[0.8125rem] lg:p-5">
        <pre {...props} />
      </div>
    </WindowFrame>
  ),
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h2
      className="mt-12 text-2xl font-semibold tracking-tight text-zinc-900"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h3
      className="mt-8 text-xl font-semibold tracking-tight text-zinc-900"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h4
      className="mt-6 text-lg font-semibold tracking-tight text-zinc-900"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-5 text-pretty text-zinc-700" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-6 border-l-2 border-zinc-300 pl-5 text-pretty text-zinc-600 italic [&>p]:mt-0"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-zinc-700" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-zinc-700" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-blue-600 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-600"
      {...props}
    />
  ),
  img: (props: ComponentPropsWithoutRef<"img">) => (
    <img
      className="my-6 w-full rounded-md ring-1 ring-zinc-200"
      {...props}
    />
  ),
  code: ({
    className,
    children,
    ...props
  }: ComponentPropsWithoutRef<"code">) => {
    const isInline =
      typeof children === "string" && !children.includes("\n") && !className;
    if (!isInline) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded-sm bg-zinc-100 px-1.5 py-0.5 text-[0.875em] text-zinc-900 ring-1 ring-zinc-200 whitespace-nowrap"
        {...props}
      >
        {children}
      </code>
    );
  },
};
