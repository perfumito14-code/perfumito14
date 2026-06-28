'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Zona {
  id: string
  nombre: string
  precio: number | null
  activo: boolean
}

const DEFAULT_ZONAS: Zona[] = [
  { id: 'peninsular', nombre: 'Península', precio: 4.99, activo: true },
  { id: 'baleares', nombre: 'Baleares', precio: 7.99, activo: true },
  { id: 'canarias', nombre: 'Canarias', precio: 9.99, activo: true },
  { id: 'internacional', nombre: 'Internacional', precio: null, activo: false },
]

export default function EnviosPage() {
  const [zonas, setZonas] = useState<Zona[]>(DEFAULT_ZONAS)
  const [umbral, setUmbral] = useState(60)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const [r1, r2] = await Promise.all([
        supabase.from('settings').select('value').eq('key', 'envios_zonas').single(),
        supabase.from('settings').select('value').eq('key', 'envio_gratis_umbral').single(),
      ])
      if (r1.data?.value) setZonas(r1.data.value as Zona[])
      if (r2.data?.value != null) setUmbral(Number(r2.data.value))
      setLoading(false)
    }
    load()
  }, [])

  const updateZona = (id: string, field: keyof Zona, value: unknown) =>
    setZonas((prev) => prev.map((z) => (z.id === id ? { ...z, [field]: value } : z)))

  const addZona = () =>
    setZonas((prev) => [...prev, { id: `zona_${Date.now()}`, nombre: 'Nueva zona', precio: null, activo: true }])

  const deleteZona = (id: string) =>
    setZonas((prev) => prev.filter((z) => z.id !== id))

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()
    await Promise.all([
      supabase.from('settings').upsert({ key: 'envios_zonas', value: zonas }),
      supabase.from('settings').upsert({ key: 'envio_gratis_umbral', value: umbral }),
    ])
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (loading) return <p className="text-sm text-stone-400">Cargando…</p>

  return (
    <div className="max-w-xl">
      <div className="mb-10">
        <span className="text-[0.6rem] uppercase tracking-[0.25em] text-stone-400">Configuración</span>
        <h1 className="mt-1 font-serif text-4xl font-light text-stone-900">Zonas de envío</h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-400">
          Las zonas sin precio no se muestran en el checkout — el cliente consulta directamente por WhatsApp.
        </p>
      </div>

      {/* Umbral envío gratis */}
      <div className="mb-6 border border-stone-200 bg-white p-6">
        <label className="flex flex-col gap-3">
          <span className="text-[0.6rem] uppercase tracking-[0.2em] text-stone-400">Umbral envío gratis</span>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="0"
              step="1"
              value={umbral}
              onChange={(e) => setUmbral(Number(e.target.value))}
              className="w-24 border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-900 outline-none transition-colors focus:border-stone-900"
            />
            <span className="text-sm text-stone-400">€ — por encima de este importe el envío es gratis</span>
          </div>
        </label>
      </div>

      {/* Zonas */}
      <div className="mb-3 flex flex-col gap-2">
        {zonas.map((zona) => (
          <div
            key={zona.id}
            className={`flex items-center gap-3 border border-stone-200 bg-white px-5 py-4 transition-opacity ${zona.activo ? '' : 'opacity-50'}`}
          >
            {/* Toggle */}
            <button
              type="button"
              onClick={() => updateZona(zona.id, 'activo', !zona.activo)}
              className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${zona.activo ? 'bg-stone-900' : 'bg-stone-200'}`}
            >
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${zona.activo ? 'left-[1.125rem]' : 'left-0.5'}`} />
            </button>

            {/* Nombre */}
            <input
              type="text"
              value={zona.nombre}
              onChange={(e) => updateZona(zona.id, 'nombre', e.target.value)}
              className="flex-1 border-b border-transparent bg-transparent py-0.5 text-sm text-stone-900 outline-none transition-colors focus:border-stone-300"
            />

            {/* Precio */}
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="—"
                value={zona.precio ?? ''}
                disabled={!zona.activo}
                onChange={(e) => updateZona(zona.id, 'precio', e.target.value === '' ? null : Number(e.target.value))}
                className="w-20 border border-stone-200 bg-stone-50 px-2 py-1 text-right text-sm text-stone-900 outline-none transition-colors focus:border-stone-900 disabled:opacity-40"
              />
              <span className="text-xs text-stone-400">€</span>
            </div>

            {/* Eliminar */}
            <button
              type="button"
              onClick={() => deleteZona(zona.id)}
              className="text-stone-300 transition-colors hover:text-red-500"
              title="Eliminar zona"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addZona}
        className="mb-8 w-full border border-dashed border-stone-200 py-3 text-[0.6rem] uppercase tracking-widest text-stone-400 transition-colors hover:border-stone-400 hover:text-stone-600"
      >
        + Añadir zona
      </button>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="bg-stone-900 px-10 py-3 text-[0.6rem] uppercase tracking-widest text-white transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {saving ? 'Guardando…' : saved ? '✓ Guardado' : 'Guardar cambios'}
      </button>
    </div>
  )
}
