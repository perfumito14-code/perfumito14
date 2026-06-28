import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'

export function BrandStory() {
  return (
    <section id="historia" className="bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-stretch gap-0 px-5 md:grid-cols-2 md:px-8">

        {/* Imagen */}
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden border-2 border-black">
            <Image
              src="/images/brand-story.png"
              alt="Perfumes de firma en perfumito14"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover grayscale"
            />
            {/* Sticker sobre imagen */}
            <div className="absolute bottom-6 left-6 rotate-[-2deg] border-2 border-black bg-white px-4 py-2">
              <p className="text-[0.6rem] font-black uppercase tracking-[0.25em] text-black">
                ★ Oportunidad única de compra
              </p>
            </div>
          </div>
        </Reveal>

        {/* Texto */}
        <Reveal delay={0.15}>
          <div className="flex flex-col justify-center border-2 border-l-0 border-black bg-black p-10 md:p-14">

            <span className="text-[0.6rem] font-black uppercase tracking-[0.35em] text-red-500">
              No somos artesanales
            </span>

            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
              Somos los que traen lo que todo el mundo quiere.
            </h2>

            <div className="mt-7 space-y-4 text-sm leading-relaxed text-white/70">
              <p>
                Versace, Carolina Herrera, Dior, YSL, Paco Rabanne.
                Marcas que ya conoces, que ya quieres, que ya hueles en la calle
                y preguntas <em>"¿qué perfume llevas?"</em>
              </p>
              <p>
                Los tenemos en 30ml y 50ml — el formato que te permite
                tener el perfume que quieres sin pagar el frasco grande.
                Precio real. Fragancia real.
              </p>
              <p className="border-l-4 border-red-500 pl-4 text-white">
                El stock es pequeño y rota. Si lo ves hoy,
                no esperes a mañana.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 divide-x divide-white/20 border-t border-white/20 pt-8">
              {[
                { valor: '30ml', label: 'Formato mínimo' },
                { valor: '50ml', label: 'Formato estándar' },
                { valor: 'WA', label: 'Pedido directo' },
              ].map((s) => (
                <div key={s.label} className="px-4 first:pl-0 last:pr-0">
                  <p className="font-serif text-2xl font-bold text-white">{s.valor}</p>
                  <p className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
