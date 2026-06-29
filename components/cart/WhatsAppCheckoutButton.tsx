'use client'

import { MessageCircle } from 'lucide-react'
import { useCarrito } from '@/lib/cartStore'
import { generarUrlWhatsApp } from '@/lib/whatsapp'

export function WhatsAppCheckoutButton() {
  const items = useCarrito((s) => s.items)
  const subtotal = useCarrito((s) => s.subtotal())

  const confirmar = () => {
    if (items.length === 0) return
    const url = generarUrlWhatsApp(items, subtotal)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      type="button"
      onClick={confirmar}
      disabled={items.length === 0}
      className="flex w-full items-center justify-center gap-3 rounded-sm px-6 py-4 text-sm font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      style={{ background: '#dc70af' }}
    >
      <MessageCircle className="size-6 drop-shadow-sm" />
      Confirmar pedido por WhatsApp
    </button>
  )
}
