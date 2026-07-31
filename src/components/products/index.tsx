import { GemMark, type GemName } from '../gems'
import { Logo as StetLogo, Mark as StetMark } from './stet'

export type ProductMarkName = GemName | 'stet'

/**
 * Renders a product's mark: its own logo where it has one, otherwise its gem.
 * `compact` drops a wordmark for the bare mark, for list rows and menus.
 */
export function ProductMark({
  name,
  className,
  compact = false,
}: {
  name: ProductMarkName
  className?: string
  compact?: boolean
}) {
  if (name === 'stet') {
    return compact ? (
      <StetMark className={className} />
    ) : (
      <StetLogo className={className} />
    )
  }
  return <GemMark name={name} className={className} />
}
