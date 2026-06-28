'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Imagen de fondo */}
      <Image
        src="/images/hero.png"
        alt="Frasco de perfume perfumito14 en composición editorial sobre mármol y botánicos"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Velo para legibilidad */}
      <div className="absolute inset-0 bg-foreground/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/30" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs font-medium uppercase tracking-[0.4em] text-background/90"
        >
          Perfumes italianos premium
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-balance font-serif text-5xl font-medium leading-[1.05] text-background md:text-7xl"
        >
          La esencia de Italia en cada fragancia
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-background/85 md:text-lg"
        >
          Fragancias italianas premium importadas directamente desde Italia.
          Disponibles en formatos de 30ml y 50ml. Tu pedido se confirma por WhatsApp.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="/catalogo"
            className="group flex items-center gap-2.5 rounded-sm bg-background px-8 py-4 text-sm font-medium uppercase tracking-[0.16em] text-foreground transition-all hover:bg-background/90"
          >
            Descubrir el catálogo
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/#historia"
            className="text-sm font-medium uppercase tracking-[0.16em] text-background underline-offset-8 transition-colors hover:underline"
          >
            Nuestra historia
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
