export default function LoadingCatalogo() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      {/* Skeleton header */}
      <section className="border-b border-border bg-secondary/40 pt-28 md:pt-36">
        <div className="mx-auto max-w-7xl px-5 pb-12 text-center md:px-8 md:pb-16">
          <div className="mx-auto h-3 w-32 animate-pulse rounded-sm bg-border" />
          <div className="mx-auto mt-6 h-10 w-64 animate-pulse rounded-sm bg-border" />
          <div className="mx-auto mt-4 h-4 w-80 animate-pulse rounded-sm bg-border" />
        </div>
      </section>

      <div className="mt-12 grid gap-12 lg:grid-cols-[240px_1fr]">
        {/* Skeleton sidebar */}
        <aside className="hidden space-y-6 lg:block">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-8 animate-pulse rounded-sm bg-border"
              style={{ width: `${70 + i * 5}%` }}
            />
          ))}
        </aside>

        {/* Skeleton grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col">
              <div className="aspect-[3/4] animate-pulse rounded-sm bg-secondary" />
              <div className="mt-4 h-3 w-16 animate-pulse rounded-sm bg-border" />
              <div className="mt-2 h-5 w-32 animate-pulse rounded-sm bg-border" />
              <div className="mt-2 h-3 w-full animate-pulse rounded-sm bg-border" />
              <div className="mt-3 h-4 w-20 animate-pulse rounded-sm bg-border" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
