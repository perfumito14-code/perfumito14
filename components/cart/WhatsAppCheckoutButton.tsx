'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { useCarrito } from '@/lib/cartStore'
import { generarUrlWhatsApp } from '@/lib/whatsapp'
import { createClient } from '@/lib/supabase/client'

export function WhatsAppCheckoutButton() {
  const items = useCarrito((s) => s.items)
  const subtotal = useCarrito((s) => s.subtotal())
  const cliente = useCarrito((s) => s.cliente)
  const vaciar = useCarrito((s) => s.vaciar)
  const cerrar = useCarrito((s) => s.cerrar)
  const [enviando, setEnviando] = useState(false)

  const datosIncompletos =
    !cliente.nombre.trim() || !cliente.telefono.trim() || !cliente.direccion.trim()

  const confirmar = async () => {
    if (items.length === 0 || enviando || datosIncompletos) return
    setEnviando(true)

    const pedidoItems = items.map((i) => ({
      producto_id: i.productoId,
      slug: i.slug,
      nombre: i.nombre,
      sku: i.sku,
      tamano: i.tamano,
      ml: parseInt(i.tamano, 10),
      precio_unitario: i.precioUnitario,
      cantidad: i.cantidad,
    }))

    await createClient().from('pedidos').insert({
      items: pedidoItems,
      subtotal,
      cliente_nombre: cliente.nombre.trim(),
      cliente_telefono: cliente.telefono.trim(),
      cliente_direccion: cliente.direccion.trim(),
      cliente_email: cliente.email.trim() || null,
    })

    const url = generarUrlWhatsApp(items, subtotal, cliente)
    window.open(url, '_blank', 'noopener,noreferrer')

    setEnviando(false)
    vaciar()
    cerrar()
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={confirmar}
        disabled={items.length === 0 || enviando || datosIncompletos}
        className="flex w-full items-center justify-center gap-3 rounded-sm px-6 py-4 text-sm font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        style={{ background: '#dc70af' }}
      >
        <MessageCircle className="size-6 drop-shadow-sm" />
        {enviando ? 'Enviando…' : 'Confirmar pedido por WhatsApp'}
      </button>
      {datosIncompletos && (
        <p className="text-center text-xs text-muted-foreground">
          Completa nombre, teléfono y dirección para continuar.
        </p>
      )}
    </div>
  )
}
