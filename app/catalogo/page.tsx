import type { Metadata } from 'next'
import { getProductos } from '@/lib/supabase/products'
import { CatalogView } from '@/components/catalog/CatalogView'

export const metadata: Metadata = {
  title: 'Catálogo',
  description:
    'Descubre toda la colección de perfumes italianos premium perfumito14. Filtra por familia olfativa y formato (5ml, 7ml y 15ml).',
}

export default async function CatalogoPage() {
  const productos = await getProductos()

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
