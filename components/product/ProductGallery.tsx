'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function ProductGallery({
  imagenes,
  nombre,
}: {
  imagenes: string[]
  nombre: string
}) {
  const [activa, setActiva] = useState(0)
  const lista = imagenes.length > 0 ? imagenes : ['/placeholder.svg']

  return (
    <div className="flex flex-col gap-4">
      <div className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary">
        <Image
          src={lista[activa] || '/placeholder.svg'}
          alt={`${nombre} — vista ${activa + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      {lista.length > 1 && (
        <div className="flex gap-3">
          {lista.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActiva(i)}
              className={cn(
                'relative size-20 overflow-hidden rounded-sm border bg-secondary transition-colors',
                activa === i
                  ? 'border-primary'
                  : 'border-border hover:border-primary/50',
              )}
              aria-label={`Ver imagen ${i + 1}`}
            >
              <Image
                src={img || '/placeholder.svg'}
                alt={`${nombre} miniatura ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
