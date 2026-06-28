import { Quote } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

// Testimonios placeholder, editables.
const TESTIMONIOS = [
  {
    texto:
      'Llevo años buscando un perfume que no oliera como todos los demás. Notte Veneziana es exactamente eso: intenso, elegante y absolutamente único.',
    nombre: 'Lucía Fernández',
    ciudad: 'Madrid',
  },
  {
    texto:
      'La atención por WhatsApp fue impecable. Me asesoraron en la elección y el pedido llegó perfectamente presentado. Una experiencia de lujo de verdad.',
    nombre: 'Marco Bianchi',
    ciudad: 'Barcelona',
  },
  {
    texto:
      'Agrumi di Sicilia me transporta a mis veranos en la costa. La calidad de las materias primas se nota en cada nota. Repetiré sin duda.',
    nombre: 'Carlota Ruiz',
    ciudad: 'Valencia',
  },
]

export function Testimonials() {
  return (
    <section className="bg-background py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Voces de nuestros clientes
            </span>
            <h2 className="mt-4 text-balance font-serif text-4xl leading-tight text-foreground md:text-5xl">
              Lo que cuentan de Aurélio
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {TESTIMONIOS.map((t, i) => (
            <Reveal key={t.nombre} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-sm border border-border bg-card p-8">
                <Quote className="size-8 text-gold" />
                <blockquote className="mt-6 flex-1 text-pretty leading-relaxed text-foreground">
                  {t.texto}
                </blockquote>
                <figcaption className="mt-8 border-t border-border pt-5">
                  <p className="font-serif text-lg text-foreground">
                    {t.nombre}
                  </p>
                  <p className="text-sm text-muted-foreground">{t.ciudad}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
