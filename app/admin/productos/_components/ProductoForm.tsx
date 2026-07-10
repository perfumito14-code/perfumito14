'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { NotesTagger } from '@/components/admin/NotesTagger'

interface Categoria { id: string; nombre: string }

interface VarianteForm {
  ml: string
  precio: string
  stock: string
}

interface FormData {
  nombre: string
  casaPerfumeria: string
  familiaOlfativa: string
  notasSalida: string[]
  notasCorazon: string[]
  notasFondo: string[]
  descripcionCorta: string
  descripcionLarga: string
  imagenes: string[]
  variantes: VarianteForm[]
  destacado: boolean
  nuevoLanzamiento: boolean
  activo: boolean
}

const slugify = (str: string) =>
  str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const emptyVariante = (): VarianteForm => ({ ml: '', precio: '', stock: '' })

const emptyForm = (): FormData => ({
  nombre: '',
  casaPerfumeria: '',
  familiaOlfativa: 'floral',
  notasSalida: [],
  notasCorazon: [],
  notasFondo: [],
  descripcionCorta: '',
  descripcionLarga: '',
  imagenes: [],
  variantes: [emptyVariante()],
  destacado: false,
  nuevoLanzamiento: false,
  activo: true,
})

export function ProductoForm({ id }: { id?: string }) {
  const router = useRouter()
  const isEdit = Boolean(id)

  const [form, setForm] = useState<FormData>(emptyForm())
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(isEdit)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    createClient()
      .from('categorias')
      .select('id,nombre')
      .eq('activo', true)
      .order('orden')
      .then(({ data }) => setCategorias(data ?? []))
  }, [])

  useEffect(() => {
    if (!isEdit || !id) return
    createClient()
      .from('productos')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error: err }) => {
        if (err || !data) { setError('No se pudo cargar el producto.'); setLoading(false); return }
        const variantes: { ml: number; precio: number; stock: number }[] = data.variantes ?? []
        setForm({
          nombre: data.nombre ?? '',
          casaPerfumeria: data.casa_perfumeria ?? '',
          familiaOlfativa: data.familia_olfativa ?? 'floral',
          notasSalida: data.notas_salida ?? [],
          notasCorazon: data.notas_corazon ?? [],
          notasFondo: data.notas_fondo ?? [],
          descripcionCorta: data.descripcion_corta ?? '',
          descripcionLarga: data.descripcion_larga ?? '',
          imagenes: data.imagenes ?? [],
          variantes: variantes.length > 0
            ? variantes
                .slice()
                .sort((a, b) => a.ml - b.ml)
                .map((v) => ({ ml: String(v.ml), precio: String(v.precio), stock: String(v.stock ?? 0) }))
            : [emptyVariante()],
          destacado: !!data.destacado,
          nuevoLanzamiento: !!data.nuevo_lanzamiento,
          activo: data.activo ?? true,
        })
        setLoading(false)
      })
  }, [id, isEdit])

  const set = (key: keyof FormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (fieldErrors[key]) setFieldErrors((prev) => { const next = { ...prev }; delete next[key]; return next })
  }

  const setVariante = (index: number, key: keyof VarianteForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      variantes: prev.variantes.map((v, i) => (i === index ? { ...v, [key]: value } : v)),
    }))
    if (fieldErrors.variantes) setFieldErrors((prev) => { const next = { ...prev }; delete next.variantes; return next })
  }

  const addVariante = () => {
    setForm((prev) => ({ ...prev, variantes: [...prev.variantes, emptyVariante()] }))
  }

  const removeVariante = (index: number) => {
    setForm((prev) => ({ ...prev, variantes: prev.variantes.filter((_, i) => i !== index) }))
  }

  const validate = () => {
    const errors: Record<string, string> = {}
    if (!form.nombre.trim()) errors.nombre = 'El nombre es requerido'
    const validas = form.variantes.filter((v) => v.ml.trim() && v.precio.trim())
    if (validas.length === 0) errors.variantes = 'Añade al menos un volumen (ml) con su precio'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting || !validate()) return
    setError(null)
    setSubmitting(true)

    const variantesPayload = form.variantes
      .filter((v) => v.ml.trim() && v.precio.trim())
      .map((v) => ({ ml: Number(v.ml), precio: Number(v.precio), stock: v.stock.trim() ? Number(v.stock) : 0 }))
      .sort((a, b) => a.ml - b.ml)

    const payload = {
      slug: slugify(form.nombre),
      nombre: form.nombre.trim(),
      casa_perfumeria: form.casaPerfumeria.trim(),
      familia_olfativa: form.familiaOlfativa,
      notas_salida: form.notasSalida,
      notas_corazon: form.notasCorazon,
      notas_fondo: form.notasFondo,
      descripcion_corta: form.descripcionCorta.trim(),
      descripcion_larga: form.descripcionLarga.trim(),
      imagenes: form.imagenes,
      variantes: variantesPayload,
      destacado: form.destacado,
      nuevo_lanzamiento: form.nuevoLanzamiento,
      activo: form.activo,
    }

    const supabase = createClient()
    const { error: err } = isEdit
      ? await supabase.from('productos').update(payload).eq('id', id)
      : await supabase.from('productos').insert(payload)

    setSubmitting(false)
    if (err) { setError(err.message || 'No se pudo guardar el producto.'); return }
    router.push('/admin')
    router.refresh()
  }

  if (loading) return <p className="text-sm text-stone-400">Cargando producto…</p>

  const fallbackFamilias = ['citrico', 'amaderado', 'floral', 'oriental', 'acuatico', 'gourmand']

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <Link href="/admin" className="text-[0.6rem] uppercase tracking-widest text-stone-400 transition-colors hover:text-stone-900">
          ← Volver a productos
        </Link>
        <h1 className="mt-2 font-serif text-4xl font-light text-stone-900">
          {isEdit ? 'Editar producto' : 'Nuevo producto'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Información básica */}
        <Section title="Información básica">
          <div className="grid gap-5">
            <Field label="Nombre" required error={fieldErrors.nombre}>
              <input type="text" value={form.nombre} onChange={(e) => set('nombre', e.target.value)}
                placeholder="Notte Veneziana"
                className="w-full border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition-colors focus:border-stone-900" />
            </Field>

            <Field label="Casa / Inspiración">
              <input type="text" value={form.casaPerfumeria} onChange={(e) => set('casaPerfumeria', e.target.value)}
                placeholder="Inspirado en las noches de Venecia"
                className="w-full border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition-colors focus:border-stone-900" />
            </Field>

            <Field label="Familia olfativa" required>
              <select value={form.familiaOlfativa} onChange={(e) => set('familiaOlfativa', e.target.value)}
                className="w-full border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition-colors focus:border-stone-900">
                {(categorias.length > 0 ? categorias : fallbackFamilias.map((f) => ({ id: f, nombre: f.charAt(0).toUpperCase() + f.slice(1) }))).map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </Field>

            <Field label="Descripción corta">
              <input type="text" value={form.descripcionCorta} onChange={(e) => set('descripcionCorta', e.target.value)}
                placeholder="Una línea que defina la fragancia"
                className="w-full border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition-colors focus:border-stone-900" />
            </Field>

            <Field label="Descripción larga">
              <textarea rows={5} value={form.descripcionLarga} onChange={(e) => set('descripcionLarga', e.target.value)}
                placeholder="Relato completo de la fragancia…"
                className="w-full resize-y border border-stone-200 bg-white px-4 py-3 text-sm leading-relaxed text-stone-900 outline-none transition-colors focus:border-stone-900" />
            </Field>
          </div>
        </Section>

        {/* Volumen y precio */}
        <Section title="Volumen, precio y stock" hint="Añade cada presentación (ml) con su precio y unidades disponibles. Si el stock llega a 0, esa variante se muestra como agotada en la web.">
          <div className="flex flex-col gap-3">
            {form.variantes.map((v, i) => (
              <div key={i} className="flex items-end gap-3">
                <Field label="ml">
                  <input type="number" min="0" step="1" value={v.ml} onChange={(e) => setVariante(i, 'ml', e.target.value)}
                    placeholder="5"
                    className="w-24 border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition-colors focus:border-stone-900" />
                </Field>
                <Field label="Precio (€)">
                  <input type="number" min="0" step="0.01" value={v.precio} onChange={(e) => setVariante(i, 'precio', e.target.value)}
                    placeholder="12.00"
                    className="w-32 border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition-colors focus:border-stone-900" />
                </Field>
                <Field label="Stock">
                  <input type="number" min="0" step="1" value={v.stock} onChange={(e) => setVariante(i, 'stock', e.target.value)}
                    placeholder="10"
                    className="w-24 border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition-colors focus:border-stone-900" />
                </Field>
                {form.variantes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariante(i)}
                    aria-label="Quitar variante"
                    className="mb-[1px] flex h-[46px] w-[46px] items-center justify-center border border-stone-200 text-stone-400 transition-colors hover:border-red-300 hover:text-red-500"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
            ))}
            {fieldErrors.variantes && <span className="text-xs text-red-600">{fieldErrors.variantes}</span>}

            <button
              type="button"
              onClick={addVariante}
              className="mt-1 flex w-fit items-center gap-2 border border-stone-300 px-4 py-2.5 text-[0.6rem] uppercase tracking-widest text-stone-600 transition-colors hover:border-stone-900 hover:text-stone-900"
            >
              <Plus className="size-3.5" />
              Añadir variante
            </button>
          </div>
        </Section>

        {/* Pirámide olfativa */}
        <Section title="Pirámide olfativa" hint="Escribe cada nota y pulsa Enter o coma para añadirla.">
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Notas de salida">
              <NotesTagger value={form.notasSalida} onChange={(v) => set('notasSalida', v)} placeholder="Bergamota, Limón…" />
            </Field>
            <Field label="Notas de corazón">
              <NotesTagger value={form.notasCorazon} onChange={(v) => set('notasCorazon', v)} placeholder="Rosa, Jazmín…" />
            </Field>
            <Field label="Notas de fondo">
              <NotesTagger value={form.notasFondo} onChange={(v) => set('notasFondo', v)} placeholder="Sándalo, Ámbar…" />
            </Field>
          </div>
        </Section>

        {/* Visibilidad */}
        <Section title="Visibilidad y destacados">
          <div className="flex flex-col gap-3">
            <FlagRow label="Destacado" hint="Aparece en la sección de fragancias destacadas del home" checked={form.destacado} onChange={(v) => set('destacado', v)} />
            <FlagRow label="Nuevo lanzamiento" hint="Marcado como novedad en el catálogo" checked={form.nuevoLanzamiento} onChange={(v) => set('nuevoLanzamiento', v)} />
            <FlagRow label="Visible en la tienda" hint="Desactívalo para ocultar el producto sin borrarlo" checked={form.activo} onChange={(v) => set('activo', v)} />
          </div>
        </Section>

        {/* Imágenes */}
        <Section title="Imágenes" hint="La primera imagen será la principal en el catálogo.">
          <ImageUploader value={form.imagenes} onChange={(v) => set('imagenes', v)} />
        </Section>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center justify-end gap-4 border-t border-stone-200 pt-6">
          <Link href="/admin" className="px-5 py-3 text-[0.6rem] uppercase tracking-widest text-stone-400 transition-colors hover:text-stone-900">
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="bg-stone-900 px-8 py-3 text-[0.6rem] uppercase tracking-widest text-white transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            {submitting ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear producto'}
          </button>
        </div>
      </form>
    </div>
  )
}

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="border border-stone-200 bg-white p-6 md:p-8">
      <div className="mb-6">
        <h2 className="font-serif text-xl text-stone-900">{title}</h2>
        {hint && <p className="mt-1 text-xs text-stone-400">{hint}</p>}
      </div>
      {children}
    </section>
  )
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[0.6rem] uppercase tracking-[0.2em] text-stone-400">
        {label}{required && <span className="ml-1 text-red-400">·</span>}
      </span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  )
}

function FlagRow({ label, hint, checked, onChange }: { label: string; hint: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between border border-stone-200 bg-stone-50 px-5 py-4 text-left transition-colors hover:bg-stone-100"
    >
      <div>
        <span className="block font-serif text-base text-stone-900">{label}</span>
        <span className="mt-0.5 block text-xs text-stone-400">{hint}</span>
      </div>
      <span className={`shrink-0 border px-3 py-1.5 text-[0.6rem] uppercase tracking-widest transition-colors ${checked ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-300 text-stone-400'}`}>
        {checked ? 'Sí' : 'No'}
      </span>
    </button>
  )
}
