import Link from 'next/link'
import { getProductosDestacados } from '@/data/products'
import { ProductCard } from '@/components/catalog/ProductCard'
import { Reveal } from '@/components/ui/reveal'

export function FeaturedProducts() {
  const destacados = getProductosDestacados().slice(0, 4)

  return (
    <section className="border-t-2 border-black bg-stone-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* Header brutalist */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b-2 border-black pb-6">
          <div>
            <span className="text-[0.6rem] font-black uppercase tracking-[0.35em] text-red-600">
              ⚡ Disponible ahora
            </span>
            <h2 className="mt-2 font-serif text-4xl font-bold leading-tight text-black md:text-5xl">
              Lo que queda hoy.
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="border-2 border-black bg-black px-6 py-3 text-[0.65rem] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black"
          >
            Ver catálogo completo →
          </Link>
        </div>

        {/* Grid con cards brutalist */}
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {destacados.map((producto, i) => (
            <Reveal key={producto.id} delay={i * 0.07}>
              <ProductCard producto={producto} index={i} />
            </Reveal>
          ))}
        </div>

        {/* Urgency footer */}
        <div className="mt-10 border-2 border-black bg-black p-5 md:flex md:items-center md:justify-between">
          <p className="text-sm font-bold text-white">
            El stock es pequeño y rota constantemente.{' '}
            <span className="text-red-400">Si lo ves, pídelo.</span>
          </p>
          <Link
            href="/catalogo"
            className="mt-4 inline-block border-2 border-white px-6 py-3 text-[0.65rem] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black md:mt-0"
          >
            Ver todo el stock
          </Link>
        </div>

      </div>
    </section>
  )
}
