import { create } from 'zustand'
import type { ItemCarrito, Producto, Tamano } from '@/types/product'

interface EstadoCarrito {
  items: ItemCarrito[]
  abierto: boolean
  // acciones
  abrir: () => void
  cerrar: () => void
  alternar: () => void
  agregar: (producto: Producto, tamano: Tamano, cantidad?: number) => void
  eliminar: (sku: string) => void
  cambiarCantidad: (sku: string, cantidad: number) => void
  vaciar: () => void
  // selectores derivados
  totalUnidades: () => number
  subtotal: () => number
}

/**
 * Store del carrito basado en Zustand.
 * IMPORTANTE: el estado vive únicamente en memoria durante la sesión.
 * No se usa localStorage ni sessionStorage (no disponibles en algunos
 * entornos de despliegue).
 */
export const useCarrito = create<EstadoCarrito>((set, get) => ({
  items: [],
  abierto: false,

  abrir: () => set({ abierto: true }),
  cerrar: () => set({ abierto: false }),
  alternar: () => set((s) => ({ abierto: !s.abierto })),

  agregar: (producto, tamano, cantidad = 1) => {
    const variante = producto.variantes.find((v) => v.tamano === tamano)
    if (!variante) return

    set((estado) => {
      const existente = estado.items.find((i) => i.sku === variante.sku)
      if (existente) {
        return {
          items: estado.items.map((i) =>
            i.sku === variante.sku
              ? { ...i, cantidad: i.cantidad + cantidad }
              : i,
          ),
          abierto: true,
        }
      }
      const nuevo: ItemCarrito = {
        productoId: producto.id,
        slug: producto.slug,
        nombre: producto.nombre,
        imagen: producto.imagenes[0],
        tamano,
        precioUnitario: variante.precio,
        sku: variante.sku,
        cantidad,
      }
      return { items: [...estado.items, nuevo], abierto: true }
    })
  },

  eliminar: (sku) =>
    set((estado) => ({
      items: estado.items.filter((i) => i.sku !== sku),
    })),

  cambiarCantidad: (sku, cantidad) =>
    set((estado) => ({
      items:
        cantidad <= 0
          ? estado.items.filter((i) => i.sku !== sku)
          : estado.items.map((i) =>
              i.sku === sku ? { ...i, cantidad } : i,
            ),
    })),

  vaciar: () => set({ items: [] }),

  totalUnidades: () =>
    get().items.reduce((acc, i) => acc + i.cantidad, 0),

  subtotal: () =>
    get().items.reduce((acc, i) => acc + i.precioUnitario * i.cantidad, 0),
}))
