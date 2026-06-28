import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getProductosDestacados } from '@/data/products'
import { ProductCard } from '@/components/catalog/ProductCard'
import { Reveal } from '@/components/ui/reveal'

export function FeaturedProducts() {
  const destacados = getProductosDestacados().slice(0, 4)

  return (
    <section className="bg-secondary/40 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
                Selección de la casa
              </span>
              <h2 className="mt-4 text-balance font-serif text-4xl leading-tight text-foreground md:text-5xl">
                Fragancias destacadas
              </h2>
            </div>
            <Link
              href="/catalogo"
              className="group flex shrink-0 items-center gap-2 text-sm font-medium uppercase tracking-[0.16em] text-foreground transition-colors hover:text-primary"
            >
              Ver todo el catálogo
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {destacados.map((producto, i) => (
            <Reveal key={producto.id} delay={i * 0.08}>
              <ProductCard producto={producto} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
