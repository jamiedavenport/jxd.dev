import clsx from 'clsx'
import type { ReactNode } from 'react'
import { MonoLabel } from './ui'

const defaultFaces = [
  'border-neutral-950/20 bg-white/70',
  'border-neutral-950/30 bg-white/70',
  'border-red-600/70 bg-red-600/3',
]

const defaultZ = ['translate-z-0', 'translate-z-16', 'translate-z-32']

export function IsoStack({
  className,
  boxClass = 'size-52 sm:size-64',
  faces = defaultFaces,
  zClasses = defaultZ,
  topChildren,
}: {
  className?: string
  boxClass?: string
  faces?: string[]
  zClasses?: string[]
  topChildren?: ReactNode
}) {
  return (
    <div
      aria-hidden="true"
      className={clsx('flex items-center justify-center', className)}
    >
      <div
        className={clsx(
          'relative transform-3d [transform:rotateX(55deg)rotateZ(-45deg)]',
          boxClass,
        )}
      >
        {faces.map((face, i) => (
          <div
            key={face}
            className={clsx(
              'absolute inset-0 rounded-xl border',
              zClasses[i],
              face,
            )}
          >
            {i === faces.length - 1 ? topChildren : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export function IsoChips() {
  return (
    <>
      <div className="absolute top-5 left-5 size-10 rounded-md border border-red-600/60 bg-red-600/10" />
      <div className="absolute top-5 left-18 size-10 rounded-md border border-neutral-950/25 bg-white/60" />
      <div className="absolute top-18 left-5 h-10 w-23 rounded-md border border-neutral-950/25 bg-white/60" />
    </>
  )
}

export function IsoLegend({
  entries,
  className,
}: {
  entries: string[]
  className?: string
}) {
  return (
    <div className={clsx('font-mono text-sm text-neutral-500', className)}>
      {entries.map((entry, i) => (
        <p key={entry} className={clsx(i > 0 && 'mt-1')}>
          <span className={clsx(i === 0 && 'text-red-600')}>
            {String(entries.length - i).padStart(2, '0')}
          </span>{' '}
          / {entry}
        </p>
      ))}
    </div>
  )
}

const weeks = [
  { name: 'Week 01', event: 'First deploy' },
  { name: 'Week 02', event: 'Deploy' },
  { name: 'Week 03', event: 'Deploy' },
  { name: 'Week 04', event: 'Deploy' },
]

export function CadenceDiagram({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={clsx('max-w-2xl', className)}>
      <div className="grid grid-cols-4">
        {weeks.map((week, i) => (
          <div key={week.name}>
            <div className="flex items-center">
              <span
                className={clsx(
                  'size-3 shrink-0 border',
                  i === 0
                    ? 'border-red-600 bg-red-600/10'
                    : 'border-neutral-950/40 bg-white',
                )}
              />
              {i < weeks.length - 1 ? (
                <span className="h-px flex-1 bg-neutral-950/15" />
              ) : null}
            </div>
            <div className="mt-3 pr-4 font-mono text-sm text-neutral-500">
              <p>{week.name}</p>
              <p className={clsx(i === 0 && 'text-red-600')}>{week.event}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const agencyLayers = ['You', 'Account manager', 'Delivery lead', 'Junior bench']

export function LayersDiagram({ className }: { className?: string }) {
  return (
    <div className={clsx('grid max-w-xl grid-cols-2 gap-x-6 sm:gap-x-8', className)}>
      <div className="flex flex-col">
        <MonoLabel className="text-neutral-500">Typical agency</MonoLabel>
        <div className="mt-4 flex flex-1 flex-col">
          {agencyLayers.map((layer, i) => (
            <div key={layer} className={clsx('flex flex-col', i > 0 && 'flex-1')}>
              {i > 0 ? (
                <div className="mx-auto min-h-4 w-px flex-1 bg-neutral-950/20" />
              ) : null}
              <div className="border border-neutral-950/20 px-3 py-2 text-center font-mono text-sm text-neutral-500">
                {layer}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <MonoLabel className="text-neutral-500">JXD</MonoLabel>
        <div className="mt-4 flex flex-1 flex-col">
          <div className="border border-neutral-950/20 px-3 py-2 text-center font-mono text-sm text-neutral-500">
            You
          </div>
          <div className="mx-auto min-h-4 w-px flex-1 bg-red-600/50" />
          <div className="border border-red-600 px-3 py-2 text-center font-mono text-sm text-red-600">
            Engineer
          </div>
        </div>
      </div>
    </div>
  )
}
