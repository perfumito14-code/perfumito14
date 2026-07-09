'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import type { Producto } from '@/types/product'
import { useCarrito } from '@/lib/cartStore'
import { formatearPrecio } from '@/lib/format'

export function ProductCard({ producto, index = 0 }: { producto: Producto; index?: number }) {
  const agregar = useCarrito((s) => s.agregar)
  const [principal, ...otras] = producto.variantes

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    if (principal) agregar(producto, principal.tamano)
  }

  return (
    <article className="group relative flex flex-col rounded-sm border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/producto/${producto.slug}`} className="flex flex-col">
        <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
          <Image
            src={producto.imagenes[0] || '/placeholder.svg'}
            alt={producto.nombre}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-all duration-500 group-hover:scale-105"
          />

          {producto.nuevoLanzamiento && (
            <div className="absolute left-0 top-4 px-3 py-1"
              style={{ background: '#dc70af' }}
            >
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white">
                ★ nuevo
              </span>
            </div>
          )}

          {principal && (
            <button
              type="button"
              onClick={quickAdd}
              className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 py-3 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white opacity-0 transition-all duration-200 hover:opacity-90 max-md:opacity-100"
              style={{ background: '#dc70af' }}
              aria-label={`Añadir ${producto.nombre} al pedido`}
            >
              <Plus className="size-3.5" />
              Añadir rápido
            </button>
          )}
        </div>

        <div className="flex flex-col gap-1 p-4">
          <span className="text-[0.55rem] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            {producto.casaPerfumeria}
          </span>
          <h3 className="font-serif text-base font-semibold leading-tight text-foreground">
            {producto.nombre}
          </h3>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {producto.descripcionCorta}
          </p>
          {principal && (
            <div className="mt-1 flex items-center justify-between gap-2">
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-semibold text-foreground">
                  {formatearPrecio(principal.precio)}
                </span>
                <span className="text-[0.55rem] font-medium uppercase tracking-wider text-muted-foreground">
                  {principal.tamano}
                </span>
              </div>
              {otras.length > 0 && (
                <span className="truncate text-[0.6rem] text-muted-foreground">
                  +{otras.map((v) => formatearPrecio(v.precio)).join(' · ')}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}
