'use client'

import { ShoppingBag } from 'lucide-react'
import type { Producto } from '@/types/product'
import { useCarrito } from '@/lib/cartStore'

interface Props {
  producto: Producto
  tamano: string
  disabled?: boolean
}

export function AddToCartButton({ producto, tamano, disabled = false }: Props) {
  const agregar = useCarrito((s) => s.agregar)

  return (
    <button
      type="button"
      onClick={() => !disabled && agregar(producto, tamano)}
      disabled={disabled}
      className="flex w-full items-center justify-center gap-2.5 rounded-sm bg-primary px-8 py-4 text-sm font-medium uppercase tracking-[0.16em] text-primary-foreground transition-all hover:bg-primary/90 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
    >
      <ShoppingBag className="size-5" />
      {disabled ? 'Agotado' : 'Añadir al pedido'}
    </button>
  )
}
