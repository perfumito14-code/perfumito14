'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag, X } from 'lucide-react'
import { useCarrito } from '@/lib/cartStore'
import { formatearPrecio } from '@/lib/format'
import { CartItem } from '@/components/cart/CartItem'
import { WhatsAppCheckoutButton } from '@/components/cart/WhatsAppCheckoutButton'

export function CartDrawer() {
  const abierto = useCarrito((s) => s.abierto)
  const cerrar = useCarrito((s) => s.cerrar)
  const items = useCarrito((s) => s.items)
  const subtotal = useCarrito((s) => s.subtotal())

  // Bloquea el scroll del body mientras el drawer está abierto.
  useEffect(() => {
    if (abierto) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [abierto])

  return (
    <AnimatePresence>
      {abierto && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-foreground/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={cerrar}
            aria-hidden="true"
          />

          <motion.aside
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-card text-card-foreground shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Tu pedido"
          >
            {/* Cabecera */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="font-serif text-xl tracking-wide">Tu pedido</h2>
              <button
                type="button"
                onClick={cerrar}
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Cerrar carrito"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Contenido */}
            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag className="size-10 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Tu pedido está vacío todavía.
                </p>
                <Link
                  href="/catalogo"
                  onClick={cerrar}
                  className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-primary underline-offset-4 hover:underline"
                >
                  Descubrir fragancias
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 divide-y divide-border overflow-y-auto px-6">
                  {items.map((item) => (
                    <CartItem key={item.sku} item={item} />
                  ))}
                </div>

                {/* Pie con total y CTA */}
                <div className="border-t border-border px-6 py-6">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm uppercase tracking-[0.16em] text-muted-foreground">
                      Subtotal
                    </span>
                    <span className="font-serif text-xl tabular-nums">
                      {formatearPrecio(subtotal)}
                    </span>
                  </div>
                  <p className="mb-5 text-xs leading-relaxed text-muted-foreground">
                    Los gastos de envío se acuerdan al confirmar tu pedido por
                    WhatsApp.
                  </p>
                  <WhatsAppCheckoutButton />
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
