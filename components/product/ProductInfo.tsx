'use client'

import { useState } from 'react'
import type { Producto, Tamano } from '@/types/product'
import { LABEL_FAMILIA } from '@/types/product'
import { formatearPrecio } from '@/lib/format'
import { AddToCartButton } from '@/components/product/AddToCartButton'
import { cn } from '@/lib/utils'

export function ProductInfo({ producto }: { producto: Producto }) {
  const [tamano, setTamano] = useState<string>(
    producto.variantes[0]?.tamano ?? '',
  )
  const variante =
    producto.variantes.find((v) => v.tamano === tamano) ?? producto.variantes[0]

  return (
    <div className="flex flex-col">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
        {LABEL_FAMILIA[producto.familiaOlfativa]}
      </span>
      <h1 className="mt-3 text-balance font-serif text-4xl leading-tight text-foreground md:text-5xl">
        {producto.nombre}
      </h1>
      <p className="mt-3 text-sm italic text-muted-foreground">
        {producto.casaPerfumeria}
      </p>

      <p className="mt-6 text-pretty text-lg leading-relaxed text-foreground/90">
        {producto.descripcionCorta}
      </p>
      <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
        {producto.descripcionLarga}
      </p>

      {/* Selector de tamaño */}
      <div className="mt-9">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-foreground">
          Formato
        </span>
        <div className="mt-3 flex gap-3">
          {producto.variantes.map((v) => (
            <button
              key={v.sku}
              type="button"
              onClick={() => setTamano(v.tamano)}
              aria-pressed={tamano === v.tamano}
              className={cn(
                'flex flex-col items-start rounded-sm border px-5 py-3 transition-colors',
                tamano === v.tamano
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50',
              )}
            >
              <span className="text-sm font-medium text-foreground">
                {v.tamano}
              </span>
              <span className="text-sm text-muted-foreground">
                {formatearPrecio(v.precio)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Precio + CTA */}
      <div className="mt-9 flex items-baseline gap-3">
        <span className="font-serif text-3xl text-foreground">
          {formatearPrecio(variante.precio)}
        </span>
        <span className="text-sm text-muted-foreground">
          / {variante.tamano} · IVA incluido
        </span>
      </div>

      <div className="mt-6">
        <AddToCartButton producto={producto} tamano={tamano} />
        <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
          Tu pedido se confirma de forma personal por WhatsApp. Sin pagos online
          en este paso.
        </p>
      </div>
    </div>
  )
}
