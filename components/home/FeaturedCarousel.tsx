import { getProductosDestacados } from '@/lib/supabase/products'
import { Reveal } from '@/components/ui/reveal'
import { CarouselTrack } from '@/components/home/CarouselTrack'

export async function FeaturedCarousel() {
  const productos = await getProductosDestacados()

  if (productos.length === 0) return null

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Selección especial
            </span>
            <h2 className="mt-4 text-balance font-serif text-4xl leading-tight text-foreground md:text-5xl">
              Fragancias destacadas
            </h2>
          </div>
        </Reveal>

        <div className="mt-14">
          <CarouselTrack productos={productos} />
        </div>
      </div>
    </section>
  )
}
