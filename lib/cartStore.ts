import { create } from 'zustand'
import type { ItemCarrito, Producto, Tamano } from '@/types/product'

export interface DatosCliente {
  nombre: string
  telefono: string
  direccion: string
  email: string
}

const clienteVacio: DatosCliente = {
  nombre: '',
  telefono: '',
  direccion: '',
  email: '',
}

interface EstadoCarrito {
  items: ItemCarrito[]
  abierto: boolean
  cliente: DatosCliente
  // acciones
  abrir: () => void
  cerrar: () => void
  alternar: () => void
  agregar: (producto: Producto, tamano: Tamano, cantidad?: number) => void
  eliminar: (sku: string) => void
  cambiarCantidad: (sku: string, cantidad: number) => void
  vaciar: () => void
  setCliente: (patch: Partial<DatosCliente>) => void
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
  cliente: clienteVacio,

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

  setCliente: (patch) =>
    set((estado) => ({ cliente: { ...estado.cliente, ...patch } })),

  totalUnidades: () =>
    get().items.reduce((acc, i) => acc + i.cantidad, 0),

  subtotal: () =>
    get().items.reduce((acc, i) => acc + i.precioUnitario * i.cantidad, 0),
}))
