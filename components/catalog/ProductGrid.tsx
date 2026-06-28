import type { Producto } from '@/types/product'
import { ProductCard } from '@/components/catalog/ProductCard'
import { Reveal } from '@/components/ui/reveal'

export function ProductGrid({ productos }: { productos: Producto[] }) {
  if (productos.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-sm border border-dashed border-border py-20 text-center">
        <p className="font-serif text-2xl text-foreground">
          Sin resultados
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          No encontramos fragancias con estos filtros. Prueba a ajustar tu
          selección.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {productos.map((producto, i) => (
        <Reveal key={producto.id} delay={(i % 3) * 0.08}>
          <ProductCard producto={producto} index={i} />
        </Reveal>
      ))}
    </div>
  )
}
