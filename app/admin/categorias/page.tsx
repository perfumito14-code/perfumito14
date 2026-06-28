'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Categoria {
  id: string
  nombre: string
  orden: number
  activo: boolean
}

const slugify = (str: string) =>
  str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function CategoriasPage() {
  const [items, setItems] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newNombre, setNewNombre] = useState('')
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editNombre, setEditNombre] = useState('')
  const [saving, setSaving] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    const { data, error: err } = await createClient().from('categorias').select('*').order('orden')
    if (err) setError(err.message)
    else setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    const nombre = newNombre.trim()
    if (!nombre) return
    setAdding(true)
    const maxOrden = items.length ? Math.max(...items.map((i) => i.orden)) : 0
    const { error: err } = await createClient().from('categorias').insert({
      id: slugify(nombre),
      nombre,
      orden: maxOrden + 1,
      activo: true,
    })
    if (err) setError(err.message)
    else { setNewNombre(''); await load() }
    setAdding(false)
  }

  const handleToggle = async (item: Categoria) => {
    setSaving(item.id)
    await createClient().from('categorias').update({ activo: !item.activo }).eq('id', item.id)
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, activo: !i.activo } : i)))
    setSaving(null)
  }

  const handleDelete = async (item: Categoria) => {
    if (!confirm(`¿Eliminar "${item.nombre}"? Los productos de esta familia no se borran.`)) return
    setSaving(item.id)
    await createClient().from('categorias').delete().eq('id', item.id)
    setItems((prev) => prev.filter((i) => i.id !== item.id))
    setSaving(null)
  }

  const handleEditSave = async (item: Categoria) => {
    const nombre = editNombre.trim()
    setEditingId(null)
    if (!nombre || nombre === item.nombre) return
    setSaving(item.id)
    await createClient().from('categorias').update({ nombre }).eq('id', item.id)
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, nombre } : i)))
    setSaving(null)
  }

  return (
    <div className="max-w-xl">
      <div className="mb-10">
        <span className="text-[0.6rem] uppercase tracking-[0.25em] text-stone-400">Panel admin</span>
        <h1 className="mt-1 font-serif text-4xl font-light text-stone-900">Familias olfativas</h1>
        <p className="mt-2 text-sm text-stone-400">
          Estas categorías aparecen como filtros en el catálogo y como opciones en el formulario de producto.
        </p>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <form onSubmit={handleAdd} className="mb-8 flex gap-3">
        <input
          type="text"
          placeholder="Nueva familia olfativa…"
          value={newNombre}
          onChange={(e) => setNewNombre(e.target.value)}
          maxLength={60}
          className="flex-1 border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition-colors focus:border-stone-900"
        />
        <button
          type="submit"
          disabled={adding || !newNombre.trim()}
          className="bg-stone-900 px-6 py-3 text-[0.6rem] uppercase tracking-widest text-white transition-opacity hover:opacity-80 disabled:opacity-40"
        >
          {adding ? '…' : 'Añadir'}
        </button>
      </form>

      {loading ? (
        <p className="text-sm text-stone-400">Cargando…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-stone-400">No hay categorías todavía.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li
              key={item.id}
              className={`flex items-center gap-3 border border-stone-200 bg-white px-4 py-3 transition-opacity ${saving === item.id ? 'opacity-50' : item.activo ? 'opacity-100' : 'opacity-40'}`}
            >
              {editingId === item.id ? (
                <input
                  autoFocus
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                  onBlur={() => handleEditSave(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleEditSave(item)
                    if (e.key === 'Escape') setEditingId(null)
                  }}
                  className="flex-1 border-b border-stone-900 bg-transparent py-0.5 text-sm text-stone-900 outline-none"
                />
              ) : (
                <span
                  className="flex-1 cursor-pointer text-sm text-stone-900 transition-colors hover:text-stone-500"
                  onClick={() => { setEditingId(item.id); setEditNombre(item.nombre) }}
                  title="Clic para editar nombre"
                >
                  {item.nombre}
                </span>
              )}
              <span className="hidden font-mono text-[0.65rem] text-stone-300 sm:block">{item.id}</span>
              <button
                type="button"
                onClick={() => handleToggle(item)}
                disabled={!!saving}
                className={`border px-2.5 py-1 text-[0.6rem] uppercase tracking-widest transition-colors disabled:opacity-40 ${item.activo ? 'border-stone-200 text-stone-400' : 'border-stone-900 text-stone-900'}`}
              >
                {item.activo ? 'ON' : 'OFF'}
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item)}
                disabled={!!saving}
                className="text-stone-300 transition-colors hover:text-red-500 disabled:opacity-40"
                aria-label="Eliminar"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 text-xs text-stone-300">Clic en el nombre para editar. El ID se genera automáticamente al crear.</p>
    </div>
  )
}
