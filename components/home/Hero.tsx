'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { UrgencyTicker } from '@/components/ui/UrgencyTicker'

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Imagen de fondo */}
      <div className="relative flex flex-1 items-end overflow-hidden">
        <Image
          src="/images/hero.png"
          alt="Perfumes de lujo en formato mini"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />

        {/* Contenido */}
        <div className="relative z-10 w-full px-5 pb-12 md:px-10 md:pb-16">

          {/* Urgency badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 border-2 border-red-500 bg-red-600 px-4 py-1.5"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            <span className="text-[0.6rem] font-black uppercase tracking-[0.3em] text-white">
              Stock limitado · Rota frecuentemente
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl font-serif text-5xl font-bold leading-[1.0] text-white md:text-7xl lg:text-8xl"
          >
            Versace. Dior.
            <br />
            <span className="text-red-400">En tu bolsillo.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-lg text-base leading-relaxed text-white/80 md:text-lg"
          >
            Los perfumes de firma que todo el mundo quiere.
            En formato 30ml y 50ml. Precios que no esperabas.
            <br />
            <strong className="text-white">Hoy están. Mañana puede que no.</strong>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/catalogo"
              className="border-2 border-white bg-white px-8 py-4 text-[0.7rem] font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-transparent hover:text-white"
            >
              Ver lo que queda →
            </Link>
            <Link
              href="/#historia"
              className="border-2 border-white/40 px-8 py-4 text-[0.7rem] font-black uppercase tracking-[0.2em] text-white/80 transition-all hover:border-white hover:text-white"
            >
              Cómo funciona
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Ticker urgencia */}
      <UrgencyTicker dark />
    </section>
  )
}
