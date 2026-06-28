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
              Perfumes italianos con alma artesanal
            </h2>
            <div className="mt-7 space-y-5 text-pretty leading-relaxed text-muted-foreground">
              <p>
                perfumito14 nace de la pasión por la alta perfumería italiana.
                Seleccionamos personalmente cada fragancia directamente desde
                los mejores talleres artesanales de Italia, garantizando calidad
                y autenticidad en cada frasco.
              </p>
              <p>
                Creemos en el detalle, en las materias primas nobles y en los
                procesos tradicionales. Cada perfume que ofrecemos ha sido
                elegido por su carácter único, su estela y su capacidad de
                contar una historia.
              </p>
              <p>
                Nuestra misión es acercarte la excelencia de la perfumería
                italiana premium a un solo clic, con un trato personal y cercano.
              </p>
            </div>

            <div className="mt-10 flex gap-10">
              <div>
                <p className="font-serif text-3xl text-primary">100%</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Hecho en Italia
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl text-primary">Premium</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Calidad seleccionada
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl text-primary">Directo</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Importación directa
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
