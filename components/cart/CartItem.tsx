'use client'

import Image from 'next/image'
import { Minus, Plus, X } from 'lucide-react'
import type { ItemCarrito } from '@/types/product'
import { useCarrito } from '@/lib/cartStore'
import { formatearPrecio } from '@/lib/format'

export function CartItem({ item }: { item: ItemCarrito }) {
  const cambiarCantidad = useCarrito((s) => s.cambiarCantidad)
  const eliminar = useCarrito((s) => s.eliminar)
  const subtotal = item.precioUnitario * item.cantidad

  return (
    <div className="flex gap-4 py-5">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-sm bg-secondary">
        <Image
          src={item.imagen || '/placeholder.svg'}
          alt={item.nombre}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-serif text-base leading-tight text-foreground">
              {item.nombre}
            </h4>
            <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {item.tamano}
            </p>
          </div>
          <button
            type="button"
            onClick={() => eliminar(item.sku)}
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label={`Eliminar ${item.nombre}`}
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center rounded-sm border border-border">
            <button
              type="button"
              onClick={() => cambiarCantidad(item.sku, item.cantidad - 1)}
              className="flex size-8 items-center justify-center text-foreground transition-colors hover:text-primary"
              aria-label="Reducir cantidad"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-8 text-center text-sm tabular-nums">
              {item.cantidad}
            </span>
            <button
              type="button"
              onClick={() => cambiarCantidad(item.sku, item.cantidad + 1)}
              className="flex size-8 items-center justify-center text-foreground transition-colors hover:text-primary"
              aria-label="Aumentar cantidad"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
          <span className="text-sm font-medium tabular-nums text-foreground">
            {formatearPrecio(subtotal)}
          </span>
        </div>
      </div>
    </div>
  )
}
