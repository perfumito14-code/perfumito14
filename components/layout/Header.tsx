'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useCarrito } from '@/lib/cartStore'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/#historia', label: 'Sobre Nosotros' },
  { href: '/#contacto', label: 'Contacto' },
]

export function Header() {
  const abrir = useCarrito((s) => s.abrir)
  const unidades = useCarrito((s) => s.items.reduce((a, i) => a + i.cantidad, 0))
  const [scrolled, setScrolled] = useState(false)
  const [menuMovil, setMenuMovil] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-border/70 bg-background/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        {/* Navegación izquierda (desktop) */}
        <nav className="hidden flex-1 items-center gap-8 md:flex">
          {NAV.slice(0, 2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Botón menú móvil */}
        <button
          type="button"
          onClick={() => setMenuMovil(true)}
          className="flex items-center justify-center text-foreground md:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="size-6" />
        </button>

        {/* Logo central */}
        <Link
          href="/"
          className="flex flex-1 flex-col items-center justify-center md:flex-none"
          aria-label="Aurélio, inicio"
        >
          <span className="font-serif text-2xl font-semibold leading-none tracking-[0.22em] text-foreground md:text-[1.7rem]">
            AURÉLIO
          </span>
          <span className="mt-1 hidden text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground md:block">
            Profumi d&apos;autore
          </span>
        </Link>

        {/* Navegación derecha (desktop) + carrito */}
        <div className="flex flex-1 items-center justify-end gap-8">
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.slice(2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={abrir}
            className="relative flex items-center justify-center text-foreground transition-colors hover:text-primary"
            aria-label={`Abrir carrito, ${unidades} artículos`}
          >
            <ShoppingBag className="size-5" />
            {unidades > 0 && (
              <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-primary text-[0.6rem] font-semibold text-primary-foreground">
                {unidades}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {menuMovil && (
          <motion.div
            className="fixed inset-0 z-[60] bg-background md:hidden"
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-serif text-xl font-semibold tracking-[0.22em]">
                AURÉLIO
              </span>
              <button
                type="button"
                onClick={() => setMenuMovil(false)}
                aria-label="Cerrar menú"
              >
                <X className="size-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-2 px-5 pt-8">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuMovil(false)}
                  className="border-b border-border/60 py-4 font-serif text-2xl text-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
