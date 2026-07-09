import { createClient } from '@supabase/supabase-js'
import type { Producto } from '@/types/product'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

const SELECT =
  'id,slug,nombre,casa_perfumeria,familia_olfativa,notas_salida,notas_corazon,notas_fondo,descripcion_corta,descripcion_larga,imagenes,variantes,destacado,nuevo_lanzamiento,activo'

interface VarianteRow {
  ml: number
  precio: number
}

interface ProductoRow {
  id: string
  slug: string
  nombre: string
  casa_perfumeria: string | null
  familia_olfativa: string
  notas_salida: string[] | null
  notas_corazon: string[] | null
  notas_fondo: string[] | null
  descripcion_corta: string | null
  descripcion_larga: string | null
  imagenes: string[] | null
  variantes: VarianteRow[] | null
  destacado: boolean
  nuevo_lanzamiento: boolean
  activo: boolean
}

function mapRow(row: ProductoRow): Producto {
  const variantes = (row.variantes ?? [])
    .slice()
    .sort((a, b) => a.ml - b.ml)
    .map((v) => ({
      tamano: `${v.ml}ml`,
      precio: v.precio,
      sku: `${row.slug}-${v.ml}ml`,
    }))

  return {
    id: row.id,
    slug: row.slug,
    nombre: row.nombre,
    casaPerfumeria: row.casa_perfumeria ?? '',
    familiaOlfativa: row.familia_olfativa as Producto['familiaOlfativa'],
    notasSalida: row.notas_salida ?? [],
    notasCorazon: row.notas_corazon ?? [],
    notasFondo: row.notas_fondo ?? [],
    descripcionCorta: row.descripcion_corta ?? '',
    descripcionLarga: row.descripcion_larga ?? '',
    imagenes: row.imagenes && row.imagenes.length > 0 ? row.imagenes : ['/placeholder.svg'],
    variantes,
    destacado: row.destacado,
    nuevoLanzamiento: row.nuevo_lanzamiento,
  }
}

export async function getProductos(): Promise<Producto[]> {
  const { data, error } = await supabase
    .from('productos')
    .select(SELECT)
    .eq('activo', true)
    .order('created_at', { ascending: false })
  if (error || !data) return []
  return data.map(mapRow)
}

export async function getProductoPorSlug(slug: string): Promise<Producto | undefined> {
  const { data, error } = await supabase
    .from('productos')
    .select(SELECT)
    .eq('slug', slug)
    .eq('activo', true)
    .maybeSingle()
  if (error || !data) return undefined
  return mapRow(data)
}

export async function getProductosDestacados(): Promise<Producto[]> {
  const { data, error } = await supabase
    .from('productos')
    .select(SELECT)
    .eq('activo', true)
    .eq('destacado', true)
    .order('created_at', { ascending: false })
  if (error || !data) return []
  return data.map(mapRow)
}

export async function getRelacionados(producto: Producto, limite = 3): Promise<Producto[]> {
  const { data, error } = await supabase
    .from('productos')
    .select(SELECT)
    .eq('activo', true)
    .eq('familia_olfativa', producto.familiaOlfativa)
    .neq('id', producto.id)
    .limit(limite)
  if (error || !data) return []
  return data.map(mapRow)
}

export async function getAllSlugs(): Promise<string[]> {
  const { data, error } = await supabase.from('productos').select('slug').eq('activo', true)
  if (error || !data) return []
  return data.map((r) => r.slug)
}
