'use client'

import { useState } from 'react'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { useCarrito } from '@/lib/cartStore'
import { generarUrlWhatsApp } from '@/lib/whatsapp'

export function WhatsAppCheckoutButton() {
  const items = useCarrito((s) => s.items)
  const subtotal = useCarrito((s) => s.subtotal())
  const [animando, setAnimando] = useState(false)

  const confirmar = () => {
    if (items.length === 0) return
    setAnimando(true)
    const url = generarUrlWhatsApp(items, subtotal)
    window.open(url, '_blank', 'noopener,noreferrer')
    setTimeout(() => setAnimando(false), 600)
  }

  return (
    <button
      type="button"
      onClick={confirmar}
      disabled={items.length === 0}
      className={`group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-sm px-6 py-4 text-sm font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
        animando ? 'scale-[0.98]' : ''
      }`}
      style={{
        background: 'linear-gradient(135deg, #b34062, #6b2230)',
      }}
    >
      <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(135deg, #6b2230, #b34062)',
        }}
      />
      <MessageCircle className="relative size-6 text-white drop-shadow-sm" />
      <span className="relative flex items-center gap-2">
        Confirmar pedido por WhatsApp
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </button>
  )
}
