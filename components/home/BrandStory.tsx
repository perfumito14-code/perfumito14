import { Reveal } from '@/components/ui/reveal'

export function BrandStory() {
  return (
    <section id="historia" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            perfumito14
          </span>
          <h2 className="mt-4 text-balance font-serif text-4xl leading-tight text-foreground md:text-5xl">
            Perfumes originales,<br />sin pagar el frasco grande
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Las mejores marcas en formatos de 5ml, 7ml y 15ml. Directo desde Italia,
            con stock rotativo. Si lo ves, llévatelo.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex justify-center gap-12 sm:gap-20">
            <div>
              <p className="font-serif text-3xl text-primary">100%</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Original
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl text-primary">5ml</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Desde 12€
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl text-primary">WA</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Pedido directo
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
