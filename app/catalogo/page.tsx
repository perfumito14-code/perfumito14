import type { Metadata } from 'next'
import { productos } from '@/data/products'
import { CatalogView } from '@/components/catalog/CatalogView'

export const metadata: Metadata = {
  title: 'Catálogo',
  description:
    'Descubre toda la colección de perfumes italianos premium perfumito14. Filtra por familia olfativa y formato (30ml / 50ml).',
}

export default function CatalogoPage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/40 pt-28 md:pt-36">
        <div className="mx-auto max-w-7xl px-5 pb-12 text-center md:px-8 md:pb-16">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
            La colección completa
          </span>
          <h1 className="mt-4 text-balance font-serif text-5xl leading-tight text-foreground md:text-6xl">
            Nuestras fragancias
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Cada perfume es una historia italiana embotellada. Encuentra la tuya
            filtrando por familia olfativa o formato.
          </p>
        </div>
      </section>

      <CatalogView productos={productos} />
    </>
  )
}
