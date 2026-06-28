'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'

interface ProductoRow {
  id: string
  slug: string
  nombre: string
  familia_olfativa: string
  descripcion_corta: string
  imagenes: string[]
  precio_30ml: number | null
  precio_50ml: number | null
  destacado: boolean
  nuevo_lanzamiento: boolean
  activo: boolean
}

const fmt = (n: number | null) =>
  n != null
    ? new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(n)
    : '—'

const FAMILIAS = ['citrico', 'amaderado', 'floral', 'oriental', 'acuatico', 'gourmand']

export default function AdminProductosPage() {
  const [productos, setProductos] = useState<ProductoRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [busqueda, setBusqueda] = useState('')
  const [familia, setFamilia] = useState('')
  const [confirmTarget, setConfirmTarget] = useState<ProductoRow | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()
    let q = supabase
      .from('productos')
      .select('id,slug,nombre,familia_olfativa,descripcion_corta,imagenes,precio_30ml,precio_50ml,destacado,nuevo_lanzamiento,activo')
      .order('created_at', { ascending: false })
    if (familia) q = q.eq('familia_olfativa', familia)
    if (busqueda) q = q.or(`nombre.ilike.%${busqueda}%,descripcion_corta.ilike.%${busqueda}%`)
    const { data, error: err } = await q
    if (err) setError('Error cargando productos.')
    else setProductos(data ?? [])
    setLoading(false)
  }, [familia, busqueda])

  useEffect(() => { load() }, [load])

  const handleToggle = async (p: ProductoRow, field: 'destacado' | 'nuevo_lanzamiento' | 'activo') => {
    const prev = productos
    const next = !p[field]
    setProductos((ps) => ps.map((x) => (x.id === p.id ? { ...x, [field]: next } : x)))
    const { error: err } = await createClient().from('productos').update({ [field]: next }).eq('id', p.id)
    if (err) { setProductos(prev); setError('No se pudo actualizar.') }
  }

  const handleDelete = async () => {
    if (!confirmTarget) return
    setDeleting(true)
    const { error: err } = await createClient().from('productos').delete().eq('id', confirmTarget.id)
    setDeleting(false)
    if (err) { setError('No se pudo eliminar.'); return }
    setProductos((ps) => ps.filter((p) => p.id !== confirmTarget.id))
    setConfirmTarget(null)
  }

  const stats = {
    total: productos.length,
    activos: productos.filter((p) => p.activo).length,
    destacados: productos.filter((p) => p.destacado).length,
    novedades: productos.filter((p) => p.nuevo_lanzamiento).length,
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-[0.6rem] uppercase tracking-[0.25em] text-stone-400">Catálogo</span>
          <h1 className="mt-1 font-serif text-4xl font-light text-stone-900">Productos</h1>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="bg-stone-900 px-6 py-3 text-[0.6rem] uppercase tracking-widest text-white transition-opacity hover:opacity-80"
        >
          + Nuevo producto
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total', value: stats.total },
          { label: 'Activos', value: stats.activos },
          { label: 'Destacados', value: stats.destacados },
          { label: 'Novedades', value: stats.novedades },
        ].map((s) => (
          <div key={s.label} className="border border-stone-200 bg-white p-5">
            <span className="text-[0.6rem] uppercase tracking-widest text-stone-400">{s.label}</span>
            <span className="mt-1 block font-serif text-3xl font-light text-stone-900">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Buscar por nombre…"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="min-w-48 flex-1 border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition-colors focus:border-stone-900"
        />
        <select
          value={familia}
          onChange={(e) => setFamilia(e.target.value)}
          className="border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition-colors focus:border-stone-900"
        >
          <option value="">Todas las familias</option>
          {FAMILIAS.map((f) => (
            <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* List */}
      {loading ? (
        <p className="text-sm text-stone-400">Cargando productos…</p>
      ) : productos.length === 0 ? (
        <div className="border border-stone-200 bg-white p-16 text-center">
          <p className="font-serif text-xl font-light text-stone-400">No hay productos todavía.</p>
        </div>
      ) : (
        <div className="border border-stone-200 bg-white">
          {/* Desktop table head */}
          <div
            className="hidden border-b border-stone-100 md:grid"
            style={{ gridTemplateColumns: '5rem 1fr 9rem 11rem 9rem 7rem', padding: '0.75rem 1.25rem', gap: '1rem', alignItems: 'center' }}
          >
            {['', 'Producto', 'Familia', 'Precio', 'Estado', ''].map((h, i) => (
              <span key={i} className="text-[0.6rem] uppercase tracking-[0.22em] text-stone-400">{h}</span>
            ))}
          </div>

          {productos.map((p) => (
            <div key={p.id} className="border-b border-stone-100 last:border-b-0">
              {/* Mobile card */}
              <div className="flex gap-3 p-4 md:hidden">
                <div className="h-20 w-14 shrink-0 overflow-hidden bg-stone-100">
                  {p.imagenes?.[0] && <img src={p.imagenes[0]} alt={p.nombre} className="h-full w-full object-cover" loading="lazy" />}
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <p className="truncate font-serif text-base text-stone-900">{p.nombre}</p>
                    <p className="text-xs capitalize text-stone-400">{p.familia_olfativa}</p>
                    <p className="mt-0.5 text-xs text-stone-500">{fmt(p.precio_30ml)} / {fmt(p.precio_50ml)}</p>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Toggle label="Dest" active={p.destacado} onClick={() => handleToggle(p, 'destacado')} />
                    <Toggle label="Nov" active={p.nuevo_lanzamiento} onClick={() => handleToggle(p, 'nuevo_lanzamiento')} />
                    <Toggle label="On" active={p.activo} onClick={() => handleToggle(p, 'activo')} />
                    <Link href={`/admin/productos/${p.id}`} className="border border-stone-200 px-2.5 py-1 text-[0.6rem] uppercase tracking-widest text-stone-600 transition-colors hover:border-stone-900">Editar</Link>
                    <button type="button" onClick={() => setConfirmTarget(p)} className="border border-red-200 px-2.5 py-1 text-[0.6rem] uppercase tracking-widest text-red-500 transition-colors hover:border-red-400">Borrar</button>
                  </div>
                </div>
              </div>

              {/* Desktop row */}
              <div
                className="hidden md:grid md:items-center"
                style={{ gridTemplateColumns: '5rem 1fr 9rem 11rem 9rem 7rem', padding: '1.25rem', gap: '1rem' }}
              >
                <div className="h-16 w-12 overflow-hidden bg-stone-100">
                  {p.imagenes?.[0] && <img src={p.imagenes[0]} alt={p.nombre} className="h-full w-full object-cover" loading="lazy" />}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-serif text-base text-stone-900">{p.nombre}</p>
                  <p className="mt-0.5 truncate text-xs text-stone-400">{p.descripcion_corta}</p>
                </div>
                <span className="text-sm capitalize text-stone-500">{p.familia_olfativa}</span>
                <div>
                  <p className="text-sm text-stone-900">{fmt(p.precio_30ml)} <span className="text-xs text-stone-400">30ml</span></p>
                  <p className="text-sm text-stone-900">{fmt(p.precio_50ml)} <span className="text-xs text-stone-400">50ml</span></p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <Toggle label="Dest" active={p.destacado} onClick={() => handleToggle(p, 'destacado')} />
                  <Toggle label="Nov" active={p.nuevo_lanzamiento} onClick={() => handleToggle(p, 'nuevo_lanzamiento')} />
                  <Toggle label="On" active={p.activo} onClick={() => handleToggle(p, 'activo')} />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/admin/productos/${p.id}`} className="border border-stone-200 px-3 py-2 text-[0.6rem] uppercase tracking-widest text-stone-600 transition-colors hover:border-stone-900 hover:text-stone-900">Editar</Link>
                  <button type="button" onClick={() => setConfirmTarget(p)} className="border border-red-200 px-3 py-2 text-[0.6rem] uppercase tracking-widest text-red-500 transition-colors hover:border-red-400">Borrar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!confirmTarget}
        title="Eliminar producto"
        message={confirmTarget ? `"${confirmTarget.nombre}" se eliminará definitivamente. Esta acción no se puede deshacer.` : ''}
        loading={deleting}
        onCancel={() => setConfirmTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}

function Toggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-2 py-1 text-[0.6rem] uppercase tracking-widest transition-colors ${active ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 text-stone-400'}`}
    >
      {label}
    </button>
  )
}
