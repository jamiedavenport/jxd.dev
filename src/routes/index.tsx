import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6">
      <h1 className="text-4xl font-semibold tracking-tight">JXD</h1>
      <p className="mt-4 text-lg text-neutral-600">
        Production-grade software, shipped in weeks, not quarters.
      </p>
    </main>
  )
}
