'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { useCarrito } from '@/lib/cartStore'
import { fetchSetting } from '@/lib/supabase/settings'

const HERO_PLACEHOLDER = '/images/hero.png'

export function Hero() {
  const abrirCarrito = useCarrito((s) => s.abrir)
  const [heroSrc, setHeroSrc] = useState<string | null>(null)

  useEffect(() => {
    fetchSetting('hero_image').then(({ data }) => {
      if (data?.url) setHeroSrc(data.url)
    })
  }, [])

  const src = heroSrc ?? HERO_PLACEHOLDER

  return (
    <section className="relative overflow-hidden bg-background pt-28 md:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 md:grid-cols-2 md:gap-16 md:px-8 md:pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-sm"
        >
          <Image
            src={src}
            alt="perfumito14"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        <div className="flex flex-col">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs font-medium uppercase tracking-[0.4em] text-primary"
          >
            Perfumes originales · 5ml, 7ml y 15ml
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-balance font-serif text-4xl font-medium leading-[1.05] text-foreground md:text-6xl"
          >
            Las fragancias que quieres,<br />en el tamaño que necesitas
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Versace, Dior, YSL, Carolina Herrera, Paco Rabanne. Originales, en 5ml, 7ml y 15ml.
            Pide por WhatsApp y recíbelo en casa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <Link
              href="/catalogo"
              className="group flex items-center gap-2.5 rounded-sm px-8 py-4 text-sm font-medium uppercase tracking-[0.16em] text-white transition-all hover:opacity-90"
              style={{ background: '#dc70af' }}
            >
              Ver catálogo
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              type="button"
              onClick={abrirCarrito}
              className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.16em] text-foreground underline-offset-8 transition-colors hover:underline"
            >
              <ShoppingBag className="size-4" />
              Mi pedido
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
