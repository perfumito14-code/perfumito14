'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Producto } from '@/types/product'
import { ProductCard } from '@/components/catalog/ProductCard'

export function CarouselTrack({ productos }: { productos: Producto[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {productos.map((producto, i) => (
          <div
            key={producto.id}
            className="w-[72%] shrink-0 snap-start sm:w-[42%] lg:w-[23%]"
          >
            <ProductCard producto={producto} index={i} />
          </div>
        ))}
      </div>

      {productos.length > 1 && (
        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Ver anteriores"
            className="flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Ver siguientes"
            className="flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  )
}
