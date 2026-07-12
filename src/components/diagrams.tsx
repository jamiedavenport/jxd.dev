import clsx from 'clsx'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { MonoLabel } from './ui'

const chipIdle = 'border-neutral-950/25 bg-white/60'
const chipActive = 'border-red-600/60 bg-red-600/10'

function InterfaceLayer({ active }: { active: boolean }) {
  return (
    <>
      <div
        className={clsx(
          'absolute top-5 left-5 size-10 rounded-md border',
          active ? chipActive : chipIdle,
        )}
      />
      <div
        className={clsx(
          'absolute top-5 left-18 size-10 rounded-md border',
          chipIdle,
        )}
      />
      <div
        className={clsx(
          'absolute top-18 left-5 h-10 w-23 rounded-md border',
          chipIdle,
        )}
      />
      <div
        className={clsx(
          'absolute right-5 bottom-5 h-14 w-26 rounded-md border',
          chipIdle,
        )}
      />
    </>
  )
}

const pills = ['top-6 left-5 w-28', 'top-16 left-9 w-32', 'top-26 left-5 w-24']

function ApiLayer({ active }: { active: boolean }) {
  return (
    <>
      {pills.map((pos, i) => (
        <div
          key={pos}
          className={clsx(
            'absolute flex h-7 items-center gap-2 rounded-full border px-2.5',
            pos,
            active && i === 0 ? chipActive : chipIdle,
          )}
        >
          <span
            className={clsx(
              'size-2 rounded-full',
              active && i === 0 ? 'bg-red-600/70' : 'bg-neutral-950/20',
            )}
          />
          <span className="h-1 flex-1 rounded-full bg-neutral-950/10" />
        </div>
      ))}
    </>
  )
}

function InfraLayer({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-5 grid grid-cols-3 grid-rows-3 gap-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            'rounded-md border',
            active && i === 0 ? chipActive : 'border-neutral-950/15 bg-white/40',
          )}
        />
      ))}
    </div>
  )
}

const heroLayers = [
  { name: 'Infrastructure', z: 0, Content: InfraLayer },
  { name: 'API', z: 64, Content: ApiLayer },
  { name: 'Interface', z: 128, Content: InterfaceLayer },
]

export function HeroStack({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(2)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setActive((a) => (a + 2) % 3), 3000)
    return () => clearInterval(id)
  }, [reduce])

  return (
    <div className={className}>
      <div
        aria-hidden="true"
        className="flex items-center justify-center py-10"
      >
        <div className="relative size-52 transform-3d [transform:rotateX(55deg)rotateZ(-45deg)] sm:size-72">
          {heroLayers.map((layer, i) => (
            <motion.div
              key={layer.name}
              initial={reduce ? false : { opacity: 0, z: 0 }}
              animate={{ opacity: 1, z: layer.z }}
              transition={{
                type: 'spring',
                stiffness: 110,
                damping: 20,
                delay: 0.15 + i * 0.18,
              }}
              className="absolute inset-0 transform-3d"
            >
              <motion.div
                animate={{ z: !reduce && active === i ? 16 : 0 }}
                transition={{ type: 'spring', stiffness: 250, damping: 24 }}
                onMouseEnter={() => setActive(i)}
                className={clsx(
                  'absolute inset-0 rounded-xl border',
                  active === i
                    ? 'border-red-600/70 bg-red-600/3'
                    : i === 1
                      ? 'border-neutral-950/30 bg-white/70'
                      : 'border-neutral-950/20 bg-white/70',
                )}
              >
                <layer.Content active={active === i} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-4 text-center font-mono text-sm text-neutral-500">
        {[...heroLayers].reverse().map((layer, idx) => {
          const i = heroLayers.length - 1 - idx
          return (
            <p key={layer.name} className={clsx(idx > 0 && 'mt-1')}>
              <span className={clsx(active === i && 'text-red-600')}>
                {String(i + 1).padStart(2, '0')}
              </span>{' '}
              /{' '}
              <span className={clsx(active === i && 'text-neutral-950')}>
                {layer.name}
              </span>
            </p>
          )
        })}
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
