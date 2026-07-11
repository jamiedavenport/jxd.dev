import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import type { LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function TouchTarget() {
  return (
    <span
      aria-hidden="true"
      className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
    />
  );
}

export function MonoLabel({
  as: Tag = "p",
  className,
  children,
}: {
  as?: "p" | "h2" | "h3" | "div";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={clsx("font-mono text-sm uppercase tracking-wide", className)}
    >
      {children}
    </Tag>
  );
}

export function DisplayHeading({
  as: Tag = "h3",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={clsx("font-display font-semibold tracking-tight", className)}
    >
      {children}
    </Tag>
  );
}

export function BodyText({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={clsx(
        "max-w-[56ch] text-base/7 text-pretty text-neutral-600 sm:text-sm/6",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Lede({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={clsx(
        "max-w-[48ch] text-xl/8 text-pretty text-neutral-600 sm:text-lg/7",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function ArrowLink({
  to,
  params,
  href,
  className,
  children,
}: {
  to?: LinkProps["to"];
  params?: LinkProps["params"];
  href?: string;
  className?: string;
  children: ReactNode;
}) {
  const cls = clsx("hover:text-red-600", className);
  const content = (
    <>
      {children} <span aria-hidden="true">→</span>
    </>
  );
  if (to) {
    return (
      <Link to={to} params={params} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {content}
    </a>
  );
}

const buttonStyles = {
  primary:
    "bg-neutral-950 px-4 py-3 text-white hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 sm:py-2.5",
  outline:
    "relative border border-neutral-950 px-3 py-1.5 font-medium hover:bg-neutral-950 hover:text-white",
};

export function ButtonLink({
  to,
  href,
  variant = "primary",
  className,
  children,
}: {
  to?: LinkProps["to"];
  href?: string;
  variant?: keyof typeof buttonStyles;
  className?: string;
  children: ReactNode;
}) {
  const cls = clsx(buttonStyles[variant], className);
  const content =
    variant === "outline" ? (
      <>
        {children}
        <TouchTarget />
      </>
    ) : (
      children
    );
  if (to) {
    return (
      <Link to={to} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {content}
    </a>
  );
}

export function TermRows({
  rows,
  className,
  columns = "sm:grid-cols-[16rem_1fr]",
  bordered = true,
  termClass = "font-medium",
  detailClass = "max-w-[56ch] text-neutral-600",
}: {
  rows: { term: string; detail: ReactNode }[];
  className?: string;
  columns?: string;
  bordered?: boolean;
  termClass?: string;
  detailClass?: string;
}) {
  return (
    <dl
      className={clsx(
        bordered && "border border-neutral-950/10",
        "text-base/7 sm:text-sm/6",
        className,
      )}
    >
      {rows.map((row, i) => (
        <div
          key={row.term}
          className={clsx(
            "grid grid-cols-1",
            columns,
            i > 0 && "border-t border-neutral-950/10",
          )}
        >
          <dt
            className={clsx(
              "px-5 pt-4 sm:border-r sm:border-neutral-950/10 sm:py-4",
              termClass,
            )}
          >
            {row.term}
          </dt>
          <dd className={clsx("px-5 pb-4 sm:py-4", detailClass)}>
            {row.detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function NumberedRows({
  items,
  className,
}: {
  items: { name: string; description: string }[];
  className?: string;
}) {
  return (
    <dl
      className={clsx(
        "border border-neutral-950/10 text-base/7 sm:text-sm/6",
        className,
      )}
    >
      {items.map((item, i) => (
        <div
          key={item.name}
          className={clsx(
            "grid grid-cols-[3.5rem_1fr] sm:grid-cols-[3.5rem_16rem_1fr]",
            i > 0 && "border-t border-neutral-950/10",
          )}
        >
          <div className="row-span-2 flex border-r border-neutral-950/10 px-4 py-4 font-mono text-sm text-red-600 sm:row-span-1 sm:items-center">
            {String(i + 1).padStart(2, "0")}
          </div>
          <dt className="px-5 pt-4 font-medium sm:border-r sm:border-neutral-950/10 sm:py-4">
            {item.name}
          </dt>
          <dd className="col-start-2 max-w-[56ch] px-5 pb-4 text-neutral-600 sm:col-start-3 sm:py-4">
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function FeatureGrid({
  items,
  className,
}: {
  items: { name: string; description: string }[];
  className?: string;
}) {
  return (
    <dl
      className={clsx(
        "grid grid-cols-1 border border-neutral-950/10 text-base/7 sm:grid-cols-2 sm:text-sm/6",
        className,
      )}
    >
      {items.map((item, i) => (
        <div
          key={item.name}
          className={clsx(
            "border-neutral-950/10 px-5 py-4",
            i > 0 && "max-sm:border-t",
            i >= 2 && "sm:border-t",
            i % 2 === 1 && "sm:border-l",
          )}
        >
          <dt className="font-medium">{item.name}</dt>
          <dd className="mt-2 max-w-[48ch] text-neutral-600">
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Quote({
  text,
  attribution,
  className,
}: {
  text: string;
  attribution: string;
  className?: string;
}) {
  return (
    <figure
      className={clsx("max-w-[48ch] border-l-2 border-red-600 pl-6", className)}
    >
      <blockquote className="text-xl/8 font-medium text-pretty text-neutral-950 sm:text-lg/8">
        <p className="relative before:absolute before:inline before:-translate-x-full before:content-['\201C'] after:inline after:content-['\201D']">
          {text}
        </p>
      </blockquote>
      <figcaption className="mt-3 font-mono text-sm text-neutral-500">
        {attribution}
      </figcaption>
    </figure>
  );
}

export function StatStrip({
  stats,
  className,
}: {
  stats: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 border border-neutral-950/10 sm:grid-cols-3",
        className,
      )}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={clsx(
            "border-neutral-950/10 px-6 py-6",
            i > 0 && "max-sm:border-t sm:border-l",
          )}
        >
          <div className="text-4xl font-semibold tracking-tight tabular-nums">
            {stat.value}
          </div>
          <div className="mt-2 text-base/7 text-neutral-600 sm:text-sm/6">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
