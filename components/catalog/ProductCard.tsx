'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import type { Producto } from '@/types/product'
import { useCarrito } from '@/lib/cartStore'
import { formatearPrecio, precioDesde } from '@/lib/format'

const ROTATIONS = ['-rotate-1', 'rotate-1', '-rotate-[0.5deg]', 'rotate-[1.5deg]']

export function ProductCard({ producto, index = 0 }: { producto: Producto; index?: number }) {
  const agregar = useCarrito((s) => s.agregar)
  const desde = precioDesde(producto.variantes.map((v) => v.precio))
  const variante30 = producto.variantes.find((v) => v.tamano === '30ml')
  const badgeRotation = ROTATIONS[index % ROTATIONS.length]

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    if (variante30) agregar(producto, '30ml')
  }

  return (
    <article className="group relative flex flex-col border-2 border-black bg-white transition-all duration-150 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#000]">
      <Link href={`/producto/${producto.slug}`} className="flex flex-col">

        {/* Imagen */}
        <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
          <Image
            src={producto.imagenes[0] || '/placeholder.svg'}
            alt={producto.nombre}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-all duration-500 group-hover:scale-105"
          />

          {/* Stock limitado — sticker rotado */}
          <div className={`absolute -right-2 top-5 ${badgeRotation} bg-red-600 px-2.5 py-1 shadow-sm`}>
            <span className="text-[0.55rem] font-black uppercase tracking-[0.2em] text-white">
              stock limitado
            </span>
          </div>

          {/* Nuevo */}
          {producto.nuevoLanzamiento && (
            <div className="absolute left-0 top-4 bg-black px-3 py-1">
              <span className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-white">
                ★ nuevo
              </span>
            </div>
          )}

          {/* Quick add — visible siempre en mobile, hover en desktop */}
          {variante30 && (
            <button
              type="button"
              onClick={quickAdd}
              className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 bg-black py-3 text-[0.6rem] font-black uppercase tracking-[0.2em] text-white opacity-0 transition-all duration-200 group-hover:opacity-100 max-md:opacity-100"
              aria-label={`Añadir ${producto.nombre} 30ml al pedido`}
            >
              <Plus className="size-3.5" />
              Añadir 30ml
            </button>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1 border-t-2 border-black p-3">
          <span className="text-[0.55rem] font-black uppercase tracking-[0.25em] text-stone-400">
            {producto.familiaOlfativa}
          </span>
          <h3 className="font-serif text-base font-bold leading-tight text-black">
            {producto.nombre}
          </h3>
          <p className="line-clamp-1 text-xs text-stone-500">
            {producto.descripcionCorta}
          </p>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-sm font-black text-black">
              desde {formatearPrecio(desde)}
            </span>
            <span className="text-[0.55rem] font-bold uppercase tracking-wider text-stone-400">
              30 · 50 ml
            </span>
          </div>
        </div>

      </Link>
    </article>
  )
}
