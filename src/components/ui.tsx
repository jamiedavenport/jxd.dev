import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import type { LinkProps } from '@tanstack/react-router'
import type { ReactNode } from 'react'

export function TouchTarget() {
  return (
    <span
      aria-hidden="true"
      className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
    />
  )
}

export function MonoLabel({
  as: Tag = 'p',
  className,
  children,
}: {
  as?: 'p' | 'h2' | 'h3' | 'div'
  className?: string
  children: ReactNode
}) {
  return (
    <Tag className={clsx('font-mono text-sm uppercase tracking-wide', className)}>
      {children}
    </Tag>
  )
}

export function DisplayHeading({
  as: Tag = 'h3',
  className,
  children,
}: {
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  children: ReactNode
}) {
  return (
    <Tag className={clsx('font-display font-semibold tracking-tight', className)}>
      {children}
    </Tag>
  )
}

export function BodyText({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <p
      className={clsx(
        'max-w-[56ch] text-base/7 text-pretty text-neutral-600 sm:text-sm/6',
        className,
      )}
    >
      {children}
    </p>
  )
}

export function Lede({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <p
      className={clsx(
        'max-w-[48ch] text-xl/8 text-pretty text-neutral-600 sm:text-lg/7',
        className,
      )}
    >
      {children}
    </p>
  )
}

export function ArrowLink({
  to,
  params,
  href,
  className,
  children,
}: {
  to?: LinkProps['to']
  params?: LinkProps['params']
  href?: string
  className?: string
  children: ReactNode
}) {
  const cls = clsx('hover:text-red-600', className)
  const content = (
    <>
      {children} <span aria-hidden="true">→</span>
    </>
  )
  if (to) {
    return (
      <Link to={to} params={params} className={cls}>
        {content}
      </Link>
    )
  }
  return (
    <a href={href} className={cls}>
      {content}
    </a>
  )
}

const buttonStyles = {
  primary:
    'bg-neutral-950 px-4 py-3 text-white hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 sm:py-2.5',
  outline:
    'relative border border-neutral-950 px-3 py-1.5 font-medium hover:bg-neutral-950 hover:text-white',
}

export function ButtonLink({
  to,
  href,
  variant = 'primary',
  className,
  children,
}: {
  to?: LinkProps['to']
  href?: string
  variant?: keyof typeof buttonStyles
  className?: string
  children: ReactNode
}) {
  const cls = clsx(buttonStyles[variant], className)
  const content =
    variant === 'outline' ? (
      <>
        {children}
        <TouchTarget />
      </>
    ) : (
      children
    )
  if (to) {
    return (
      <Link to={to} className={cls}>
        {content}
      </Link>
    )
  }
  return (
    <a href={href} className={cls}>
      {content}
    </a>
  )
}

function rowDividers(
  i: number,
  count: number,
  pads: readonly [string, string, string],
) {
  if (i === 0) return pads[0]
  return clsx(
    'border-t border-neutral-950/10',
    i === count - 1 ? pads[2] : pads[1],
  )
}

export function TermRows({
  rows,
  className,
  columns = 'sm:grid-cols-[16rem_1fr]',
  pads = ['pb-5', 'py-5', 'pt-5'] as const,
  termClass = 'font-medium',
  detailClass = 'max-w-[56ch] text-neutral-600',
}: {
  rows: { term: string; detail: ReactNode }[]
  className?: string
  columns?: string
  pads?: readonly [string, string, string]
  termClass?: string
  detailClass?: string
}) {
  return (
    <dl className={clsx('text-base/7 sm:text-sm/6', className)}>
      {rows.map((row, i) => (
        <div
          key={row.term}
          className={clsx(
            'grid grid-cols-1 gap-y-2 sm:gap-x-8 sm:gap-y-0',
            columns,
            rowDividers(i, rows.length, pads),
          )}
        >
          <dt className={termClass}>{row.term}</dt>
          <dd className={detailClass}>{row.detail}</dd>
        </div>
      ))}
    </dl>
  )
}

export function NumberedRows({
  items,
  className,
  pads = ['pb-5', 'py-5', 'pt-5'] as const,
}: {
  items: { name: string; description: string }[]
  className?: string
  pads?: readonly [string, string, string]
}) {
  return (
    <dl className={clsx('text-base/7 sm:text-sm/6', className)}>
      {items.map((item, i) => (
        <div
          key={item.name}
          className={clsx(
            'grid grid-cols-[3rem_1fr] gap-x-4 sm:grid-cols-[3rem_16rem_1fr] sm:gap-x-8',
            rowDividers(i, items.length, pads),
          )}
        >
          <div className="font-mono text-sm text-red-600">
            {String(i + 1).padStart(2, '0')}
          </div>
          <dt className="font-medium">{item.name}</dt>
          <dd className="col-start-2 max-w-[56ch] text-neutral-600 sm:col-start-3">
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function FeatureGrid({
  items,
  className,
}: {
  items: { name: string; description: string }[]
  className?: string
}) {
  return (
    <dl
      className={clsx(
        'grid grid-cols-1 gap-x-8 gap-y-10 text-base/7 sm:grid-cols-2 sm:text-sm/6',
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.name}>
          <dt className="font-medium">{item.name}</dt>
          <dd className="mt-2 max-w-[48ch] text-neutral-600">
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function Quote({
  text,
  attribution,
  className,
}: {
  text: string
  attribution: string
  className?: string
}) {
  return (
    <figure
      className={clsx('max-w-[48ch] border-l-2 border-red-600 pl-6', className)}
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
  )
}

export function StatStrip({
  stats,
  className,
}: {
  stats: { value: string; label: string }[]
  className?: string
}) {
  return (
    <div className={clsx('grid grid-cols-1 sm:grid-cols-3', className)}>
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={clsx(
            'border-neutral-950/10',
            i > 0 &&
              'max-sm:mt-6 max-sm:border-t max-sm:pt-6 sm:border-l sm:pl-8',
            i < stats.length - 1 && 'sm:pr-8',
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
  )
}
