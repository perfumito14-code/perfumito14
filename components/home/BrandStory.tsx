import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'

export function BrandStory() {
  return (
    <section id="historia" className="bg-background py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:gap-20 md:px-8">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="/images/brand-story.png"
              alt="Maestro perfumista componiendo una fragancia en su atelier"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Nuestra historia
            </span>
            <h2 className="mt-5 text-balance font-serif text-4xl leading-tight text-foreground md:text-5xl">
              Tres generaciones componiendo emociones
            </h2>
            <div className="mt-7 space-y-5 text-pretty leading-relaxed text-muted-foreground">
              <p>
                Nacida en un pequeño atelier de la Toscana, Aurélio mantiene
                viva la tradición de la alta perfumería italiana. Cada fragancia
                comienza en el campo: flores recogidas al amanecer, cítricos
                madurados al sol y maderas seleccionadas una a una.
              </p>
              <p>
                No buscamos la producción en masa, sino el detalle. Nuestras
                composiciones se elaboran en pequeños lotes, dejando reposar las
                esencias el tiempo necesario para que cada nota encuentre su
                lugar.
              </p>
              <p>
                El resultado son perfumes con alma, pensados para quien entiende
                el aroma como una forma de memoria y de identidad.
              </p>
            </div>

            <div className="mt-10 flex gap-10">
              <div>
                <p className="font-serif text-3xl text-primary">62</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Años de oficio
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl text-primary">100%</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Hecho en Italia
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl text-primary">Petit</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Lotes pequeños
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
