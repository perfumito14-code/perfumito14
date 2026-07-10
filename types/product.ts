export type FamiliaOlfativa =
  | 'citrico'
  | 'amaderado'
  | 'floral'
  | 'oriental'
  | 'acuatico'
  | 'gourmand'

export type Tamano = string

export interface Variante {
  tamano: Tamano
  precio: number // en euros
  sku: string
  stock: number
}

export interface Producto {
  id: string
  slug: string
  nombre: string
  casaPerfumeria: string // p. ej. "Inspirado en la tradición de la Toscana"
  familiaOlfativa: FamiliaOlfativa
  notasSalida: string[]
  notasCorazon: string[]
  notasFondo: string[]
  descripcionCorta: string
  descripcionLarga: string
  imagenes: string[]
  variantes: Variante[]
  destacado: boolean
  nuevoLanzamiento: boolean
}

export interface ItemCarrito {
  productoId: string
  slug: string
  nombre: string
  imagen: string
  tamano: Tamano
  precioUnitario: number
  sku: string
  cantidad: number
}

export const FAMILIAS: { value: FamiliaOlfativa; label: string }[] = [
  { value: 'citrico', label: 'Cítrico' },
  { value: 'amaderado', label: 'Amaderado' },
  { value: 'floral', label: 'Floral' },
  { value: 'oriental', label: 'Oriental' },
  { value: 'acuatico', label: 'Acuático' },
  { value: 'gourmand', label: 'Gourmand' },
]

export const LABEL_FAMILIA: Record<FamiliaOlfativa, string> = {
  citrico: 'Cítrico',
  amaderado: 'Amaderado',
  floral: 'Floral',
  oriental: 'Oriental',
  acuatico: 'Acuático',
  gourmand: 'Gourmand',
}
