export default function LoadingProducto() {
  return (
    <div className="mx-auto max-w-7xl px-5 pt-28 md:px-8 md:pt-36">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2">
        {[60, 20, 80].map((w, i) => (
          <div
            key={i}
            className="h-3 animate-pulse rounded-sm bg-border"
            style={{ width: w }}
          />
        ))}
      </div>

      {/* Galería + info skeleton */}
      <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-2 md:gap-16">
        {/* Galería */}
        <div className="flex flex-col gap-4">
          <div className="aspect-[4/5] animate-pulse rounded-sm bg-secondary" />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4 pt-2">
          <div className="h-3 w-20 animate-pulse rounded-sm bg-border" />
          <div className="h-10 w-3/4 animate-pulse rounded-sm bg-border" />
          <div className="h-3 w-1/2 animate-pulse rounded-sm bg-border" />
          <div className="mt-4 space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-3 w-full animate-pulse rounded-sm bg-border" />
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <div className="h-16 w-28 animate-pulse rounded-sm bg-border" />
            <div className="h-16 w-28 animate-pulse rounded-sm bg-border" />
          </div>
          <div className="mt-4 h-8 w-24 animate-pulse rounded-sm bg-border" />
          <div className="mt-2 h-14 w-full animate-pulse rounded-sm bg-border" />
        </div>
      </div>
    </div>
  )
}
