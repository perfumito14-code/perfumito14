'use client'

import { ShoppingBag } from 'lucide-react'
import type { Producto, Tamano } from '@/types/product'
import { useCarrito } from '@/lib/cartStore'

interface Props {
  producto: Producto
  tamano: Tamano
}

export function AddToCartButton({ producto, tamano }: Props) {
  const agregar = useCarrito((s) => s.agregar)

  return (
    <button
      type="button"
      onClick={() => agregar(producto, tamano)}
      className="flex w-full items-center justify-center gap-2.5 rounded-sm bg-primary px-8 py-4 text-sm font-medium uppercase tracking-[0.16em] text-primary-foreground transition-all hover:bg-primary/90 active:translate-y-px"
    >
      <ShoppingBag className="size-5" />
      Añadir al pedido
    </button>
  )
}
