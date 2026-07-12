import { Link } from '@tanstack/react-router'
import { Children } from 'react'
import { GemMark } from './gems'
import type { PolicyComponents } from '@policystack/react/policy'

// React 19 rejects <tr> directly inside <table> during hydration. The Table
// slot receives the rendered header row (a <thead>) followed by bare body
// rows, so keep the header and wrap the rest in an explicit <tbody>.
export const policyComponents: PolicyComponents = {
  Link: ({ node }) => (
    <a
      href={node.href}
      target={node.href.startsWith('http') ? '_blank' : undefined}
      rel={node.href.startsWith('http') ? 'noreferrer' : undefined}
    >
      {node.value}
    </a>
  ),
  Table: ({ children }) => {
    const [header, ...rows] = Children.toArray(children)
    return (
      <table>
        {header}
        <tbody>{rows}</tbody>
      </table>
    )
  },
}

export function PoweredByGarnet() {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: 'garnet' }}
      className="mt-12 flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-neutral-500 hover:text-neutral-950"
    >
      <GemMark name="garnet" className="size-4 shrink-0" />
      Powered by Garnet
    </Link>
  )
}
