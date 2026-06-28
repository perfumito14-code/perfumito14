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
    // Abre WhatsApp en una nueva pestaña.
    // El carrito se mantiene intacto a propósito: si el usuario no llega a
    // enviar el mensaje, no pierde su pedido.
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      type="button"
      onClick={confirmar}
      disabled={items.length === 0}
      className="flex w-full items-center justify-center gap-2.5 rounded-sm bg-primary px-6 py-4 text-sm font-medium uppercase tracking-[0.16em] text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <MessageCircle className="size-5" />
      Confirmar pedido por WhatsApp
    </button>
  )
}
