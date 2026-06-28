import type { ItemCarrito } from '@/types/product'
import { formatearPrecio } from '@/lib/format'

/**
 * TODO: reemplazar con el número real de WhatsApp Business.
 * Formato internacional SIN signos ni espacios (código de país + número).
 * Ejemplo España: 34600111222
 *
 * Puede sobreescribirse con la variable de entorno NEXT_PUBLIC_WHATSAPP_NUMBER.
 */
export const WHATSAPP_NUMERO =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34637746490'

/**
 * Construye el texto del pedido, ya formateado y legible.
 */
export function construirMensajePedido(
  items: ItemCarrito[],
  total: number,
): string {
  const lineas = items.map((i) => {
    const subtotalLinea = i.precioUnitario * i.cantidad
    return `- ${i.nombre} (${i.tamano}) x${i.cantidad} — ${formatearPrecio(
      subtotalLinea,
    )}`
  })

  return [
    'Hola, quiero hacer este pedido en perfumito14:',
    '',
    ...lineas,
    '',
    `Total: ${formatearPrecio(total)}`,
    '',
    'Mi nombre es:',
    'Mi dirección de envío es:',
  ].join('\n')
}

/**
 * Genera la URL completa de WhatsApp con el pedido codificado.
 */
export function generarUrlWhatsApp(
  items: ItemCarrito[],
  total: number,
): string {
  const mensaje = construirMensajePedido(items, total)
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`
}
