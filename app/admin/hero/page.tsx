'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { fetchSetting, updateSetting } from '@/lib/supabase/settings'
import { uploadImage, deleteImage } from '@/lib/supabase/storage'

const SETTING_KEY = 'hero_image'

export default function AdminHeroPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const load = useCallback(async () => {
    const { data } = await fetchSetting(SETTING_KEY)
    if (data?.url) setImageUrl(data.url)
  }, [])

  useEffect(() => { load() }, [load])

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSaving(true)
    setMsg(null)

    const { url, path, error } = await uploadImage(file)
    if (error || !url) {
      setMsg({ type: 'err', text: error ?? 'Error al subir' })
      setSaving(false)
      return
    }

    if (imageUrl) {
      const oldPath = imageUrl.split('/').pop()
      if (oldPath) deleteImage(oldPath).catch(() => {})
    }

    const { error: saveErr } = await updateSetting(SETTING_KEY, { url })
    if (saveErr) {
      setMsg({ type: 'err', text: saveErr })
    } else {
      setImageUrl(url)
      setMsg({ type: 'ok', text: 'Imagen actualizada' })
    }
    setSaving(false)
  }

  const handleRestore = async () => {
    setSaving(true)
    setMsg(null)
    if (imageUrl) {
      const path = imageUrl.split('/').pop()
      if (path) deleteImage(path).catch(() => {})
    }
    const { error } = await updateSetting(SETTING_KEY, { url: null })
    if (error) {
      setMsg({ type: 'err', text: error })
    } else {
      setImageUrl(null)
      setMsg({ type: 'ok', text: 'Restaurada la imagen por defecto' })
    }
    setSaving(false)
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <span className="text-[0.6rem] uppercase tracking-[0.25em] text-stone-400">
          Personalización
        </span>
        <h1 className="mt-1 font-serif text-4xl font-light text-stone-900">
          Hero
        </h1>
        <p className="mt-2 text-sm text-stone-400">
          Sube la imagen principal de la landing page.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Preview */}
        <div>
          <span className="mb-3 block text-[0.6rem] uppercase tracking-[0.2em] text-stone-400">
            Vista previa
          </span>
          <div className="relative aspect-[4/3] overflow-hidden border border-stone-200 bg-stone-100">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Hero"
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-stone-300">
                Imagen por defecto
              </div>
            )}
          </div>
        </div>

        {/* Upload */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="mb-3 block text-[0.6rem] uppercase tracking-[0.2em] text-stone-400">
              Subir imagen
            </span>
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFile}
              className="block w-full text-sm text-stone-400 file:mr-4 file:border file:border-stone-200 file:bg-white file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-widest file:text-stone-600 file:hover:border-stone-900"
            />
            <p className="mt-2 text-xs text-stone-400">
              PNG, JPG o WebP. Máximo 5MB.
              {imageUrl && ' Se borrará la imagen anterior automáticamente.'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleRestore}
            disabled={saving || !imageUrl}
            className="w-fit border border-stone-200 px-6 py-3 text-[0.6rem] uppercase tracking-widest text-stone-600 transition-colors hover:border-stone-900 disabled:opacity-50"
          >
            {saving ? 'Guardando…' : 'Restaurar imagen por defecto'}
          </button>

          {msg && (
            <p
              className={`text-xs ${
                msg.type === 'ok' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {msg.text}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
