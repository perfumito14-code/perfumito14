import { ShoppingBag, MessageCircle, Package } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

const PASOS = [
  {
    icono: ShoppingBag,
    titulo: 'Elige',
    texto: 'Selecciona tu perfume favorito y el tamaño que quieras.',
  },
  {
    icono: MessageCircle,
    titulo: 'Pide por WhatsApp',
    texto: 'Te confirmamos disponibilidad, precio final y envío.',
  },
  {
    icono: Package,
    titulo: 'Recíbelo',
    texto: 'Recibe tu fragancia en casa en 24-48h.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-primary py-20 text-primary-foreground md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary-foreground/70">
              Así de fácil
            </span>
            <h2 className="mt-4 text-balance font-serif text-4xl leading-tight md:text-5xl">
              Comprar en 3 pasos
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-3">
          {PASOS.map((paso, i) => {
            const Icono = paso.icono
            return (
              <Reveal key={paso.titulo} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="flex size-16 items-center justify-center rounded-full border border-primary-foreground/25">
                    <Icono className="size-7" strokeWidth={1.5} />
                  </div>
                  <span className="mt-5 font-serif text-2xl opacity-70">
                    0{i + 1}
                  </span>
                  <h3 className="mt-1 font-serif text-xl">{paso.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">
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