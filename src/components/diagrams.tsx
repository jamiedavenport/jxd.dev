import clsx from 'clsx'
import { motion, useReducedMotion } from 'motion/react'
import { MonoLabel } from './ui'

function CircuitLayer() {
  const pads = [
    [45, 22],
    [70, 16],
    [80, 45],
    [74, 72],
    [55, 82],
    [26, 74],
    [18, 55],
    [24, 28],
  ]
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className="absolute inset-0 size-full text-neutral-950/20"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        d="M45 40V24M55 40V18h15M60 45h20M60 55h14v17M55 60v22M45 60v14H26M40 55H18M40 45H24V28"
      />
      {pads.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x - 2}
          y={y - 2}
          width="4"
          height="4"
          fill="white"
          stroke="currentColor"
          strokeWidth="0.75"
        />
      ))}
      <rect
        x="40"
        y="40"
        width="20"
        height="20"
        fill="white"
        fillOpacity="0.7"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      <rect
        x="45"
        y="45"
        width="10"
        height="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
      />
    </svg>
  )
}

const codeLines = ['w-24', 'ml-4 w-32', 'ml-8 w-24', 'ml-8 w-28', 'ml-4 w-16', 'w-10', 'w-28 mt-3', 'ml-4 w-20']

function CodeLayer() {
  return (
    <div className="absolute inset-6 flex flex-col gap-3">
      {codeLines.map((line, i) => (
        <div
          key={i}
          className={clsx('h-1.5 bg-neutral-950/15', line, i === 0 && 'bg-red-600/30')}
        />
      ))}
    </div>
  )
}

function UiLayer() {
  return (
    <>
      <div className="absolute inset-x-4 top-4 flex h-6 items-center gap-1.5 border border-neutral-950/25 bg-white/60 px-2">
        <span className="size-1.5 bg-neutral-950/25" />
        <span className="size-1.5 bg-neutral-950/25" />
      </div>
      <div className="absolute top-12 bottom-4 left-4 w-13 border border-neutral-950/25 bg-white/60" />
      <div className="absolute top-12 right-4 left-19 h-13 border border-red-600/60 bg-red-600/10" />
      <div className="absolute top-27 right-4 bottom-4 left-19 border border-neutral-950/25 bg-white/60" />
    </>
  )
}

const heroLayers = [
  { name: 'hardware', z: 0, face: 'border-neutral-950/20 bg-white/70', Content: CircuitLayer },
  { name: 'code', z: 72, face: 'border-neutral-950/30 bg-white/70', Content: CodeLayer },
  { name: 'ui', z: 144, face: 'border-red-600/70 bg-red-600/3', Content: UiLayer },
]

export function HeroStack({ className }: { className?: string }) {
  const reduce = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className={clsx('flex items-center justify-center py-10', className)}
    >
      <div className="relative size-52 transform-3d [transform:rotateX(55deg)rotateZ(-45deg)] sm:size-72">
        {heroLayers.map((layer, i) => (
          <motion.div
            key={layer.name}
            initial={reduce ? false : { z: 0 }}
            animate={{ z: layer.z }}
            transition={{
              type: 'spring',
              stiffness: 90,
              damping: 18,
              delay: 0.1 + i * 0.15,
            }}
            className={clsx('absolute inset-0 border', layer.face)}
          >
            <layer.Content />
          </motion.div>
        ))}
      </div>
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
