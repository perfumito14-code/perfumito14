import { Flower2, ShoppingBag, MessageCircle, Package } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

const PASOS = [
  {
    icono: Flower2,
    titulo: 'Elige tu fragancia',
    texto: 'Explora el catálogo y descubre la composición que te representa.',
  },
  {
    icono: ShoppingBag,
    titulo: 'Añade a tu pedido',
    texto: 'Selecciona el formato de 30ml o 50ml y agrégalo a tu carrito.',
  },
  {
    icono: MessageCircle,
    titulo: 'Confirmamos por WhatsApp',
    texto: 'Envíanos tu pedido y resolvemos contigo el pago y el envío.',
  },
  {
    icono: Package,
    titulo: 'Recíbelo en casa',
    texto: 'Preparamos tu fragancia con cuidado y la enviamos a tu dirección.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="bg-primary py-24 text-primary-foreground md:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary-foreground/70">
              Sencillo y personal
            </span>
            <h2 className="mt-4 text-balance font-serif text-4xl leading-tight md:text-5xl">
              Cómo realizar tu pedido
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-primary-foreground/80">
              Olvídate de formularios interminables. Atendemos cada pedido de
              forma personal, como en una boutique de toda la vida.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {PASOS.map((paso, i) => {
            const Icono = paso.icono
            return (
              <Reveal key={paso.titulo} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="flex size-16 items-center justify-center rounded-full border border-primary-foreground/25">
                    <Icono className="size-7 text-gold" strokeWidth={1.5} />
                  </div>
                  <span className="mt-6 font-serif text-2xl text-gold">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-serif text-xl">{paso.titulo}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">
                    {paso.texto}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
