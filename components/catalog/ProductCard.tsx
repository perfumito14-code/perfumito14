'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { Producto } from '@/types/product'
import { LABEL_FAMILIA } from '@/types/product'
import { useCarrito } from '@/lib/cartStore'
import { formatearPrecio, precioDesde } from '@/lib/format'

export function ProductCard({ producto }: { producto: Producto }) {
  const agregar = useCarrito((s) => s.agregar)
  const desde = precioDesde(producto.variantes.map((v) => v.precio))
  const variante30 = producto.variantes.find((v) => v.tamano === '30ml')

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    if (variante30) agregar(producto, '30ml')
  }

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col"
    >
      <Link href={`/producto/${producto.slug}`} className="flex flex-col">
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-secondary">
          <Image
            src={producto.imagenes[0] || '/placeholder.svg'}
            alt={producto.nombre}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {producto.nuevoLanzamiento && (
            <span className="absolute left-3 top-3 rounded-sm bg-gold px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-gold-foreground">
              Novedad
            </span>
          )}

          {/* Quick-add */}
          {variante30 && (
            <button
              type="button"
              onClick={quickAdd}
              className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-sm bg-background/90 px-3 py-2 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-foreground opacity-0 shadow-sm backdrop-blur transition-all duration-300 hover:bg-primary hover:text-primary-foreground group-hover:opacity-100 max-md:opacity-100"
              aria-label={`Añadir ${producto.nombre} 30ml al pedido`}
            >
              <Plus className="size-3.5" />
              Añadir 30ml
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-col">
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-gold">
            {LABEL_FAMILIA[producto.familiaOlfativa]}
          </span>
          <h3 className="mt-1.5 font-serif text-lg leading-tight text-foreground transition-colors group-hover:text-primary">
            {producto.nombre}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {producto.descripcionCorta}
          </p>
          <span className="mt-3 text-sm font-medium text-foreground">
            Desde {formatearPrecio(desde)}
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
