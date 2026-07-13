'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { fetchSetting, updateSetting } from '@/lib/supabase/settings'
import { uploadImage, deleteImage, uploadModel, deleteModel } from '@/lib/supabase/storage'

const IMAGE_KEY = 'hero_image'
const MODEL_KEY = 'hero_model'
const MAX_MODEL_MB = 25

export default function AdminHeroPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const modelInputRef = useRef<HTMLInputElement>(null)

  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [modelUrl, setModelUrl] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [savingModel, setSavingModel] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const [modelMsg, setModelMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const load = useCallback(async () => {
    const [{ data: img }, { data: model }] = await Promise.all([
      fetchSetting(IMAGE_KEY),
      fetchSetting(MODEL_KEY),
    ])
    if (img?.url) setImageUrl(img.url)
    if (model?.url) setModelUrl(model.url)
  }, [])

  useEffect(() => {
    import('@google/model-viewer')
    load()
  }, [load])

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSaving(true)
    setMsg(null)

    const { url, error } = await uploadImage(file)
    if (error || !url) {
      setMsg({ type: 'err', text: error ?? 'Error al subir' })
      setSaving(false)
      return
    }

    if (imageUrl) {
      const oldPath = imageUrl.split('/').pop()
      if (oldPath) deleteImage(oldPath).catch(() => {})
    }

    const { error: saveErr } = await updateSetting(IMAGE_KEY, { url })
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
    const { error } = await updateSetting(IMAGE_KEY, { url: null })
    if (error) {
      setMsg({ type: 'err', text: error })
    } else {
      setImageUrl(null)
      setMsg({ type: 'ok', text: 'Restaurada la imagen por defecto' })
    }
    setSaving(false)
  }

  const uploadModelFile = useCallback(async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.glb')) {
      setModelMsg({ type: 'err', text: 'Solo se aceptan archivos .glb' })
      return
    }
    if (file.size > MAX_MODEL_MB * 1024 * 1024) {
      setModelMsg({ type: 'err', text: `Máximo ${MAX_MODEL_MB} MB por archivo.` })
      return
    }

    setSavingModel(true)
    setModelMsg(null)

    const { url, error } = await uploadModel(file)
    if (error || !url) {
      setModelMsg({ type: 'err', text: error ?? 'Error al subir' })
      setSavingModel(false)
      return
    }

    if (modelUrl) {
      const oldPath = modelUrl.split('/').pop()
      if (oldPath) deleteModel(oldPath).catch(() => {})
    }

    const { error: saveErr } = await updateSetting(MODEL_KEY, { url })
    if (saveErr) {
      setModelMsg({ type: 'err', text: saveErr })
    } else {
      setModelUrl(url)
      setModelMsg({ type: 'ok', text: 'Modelo 3D actualizado — ya se muestra en el Hero.' })
    }
    setSavingModel(false)
  }, [modelUrl])

  const handleModelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (file) uploadModelFile(file)
  }

  const handleModelDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) uploadModelFile(file)
  }

  const handleRemoveModel = async () => {
    setSavingModel(true)
    setModelMsg(null)
    if (modelUrl) {
      const path = modelUrl.split('/').pop()
      if (path) deleteModel(path).catch(() => {})
    }
    const { error } = await updateSetting(MODEL_KEY, { url: null })
    if (error) {
      setModelMsg({ type: 'err', text: error })
    } else {
      setModelUrl(null)
      setModelMsg({ type: 'ok', text: 'Modelo 3D quitado. El Hero vuelve a mostrar la imagen.' })
    }
    setSavingModel(false)
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
          Gestiona la imagen y el futuro modelo 3D de la landing page.
        </p>
      </div>

      {/* Imagen */}
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <span className="mb-3 block text-[0.6rem] uppercase tracking-[0.2em] text-stone-400">
            Vista previa — imagen
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
            <p className={`text-xs ${msg.type === 'ok' ? 'text-green-600' : 'text-red-600'}`}>
              {msg.text}
            </p>
          )}
        </div>
      </div>

      {/* Modelo 3D */}
      <div className="border-t border-stone-200 pt-10">
        <div className="mb-6">
          <span className="text-[0.6rem] uppercase tracking-[0.25em] text-stone-400">
            Próximamente
          </span>
          <h2 className="mt-1 font-serif text-2xl font-light text-stone-900">
            Modelo 3D (.glb)
          </h2>
          <p className="mt-2 text-sm text-stone-400">
            Mientras no subas un modelo, el Hero sigue mostrando la imagen de arriba.
            En cuanto subas un .glb aquí, se muestra automáticamente en su lugar,
            dentro del mismo cuadro del Hero.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <span className="mb-3 block text-[0.6rem] uppercase tracking-[0.2em] text-stone-400">
              Vista previa — modelo 3D
            </span>
            <div className="relative aspect-[4/3] overflow-hidden border border-stone-200 bg-stone-100">
              {modelUrl ? (
                <model-viewer
                  src={modelUrl}
                  alt="Modelo 3D"
                  auto-rotate
                  camera-controls
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-center text-sm text-stone-300">
                  Sin modelo 3D todavía
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div
              onDrop={handleModelDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onClick={() => !savingModel && modelInputRef.current?.click()}
              className={`cursor-pointer border-2 border-dashed p-10 text-center transition-colors ${dragOver ? 'border-stone-900 bg-stone-50' : 'border-stone-200'} ${savingModel ? 'pointer-events-none opacity-50' : ''}`}
            >
              <input
                ref={modelInputRef}
                type="file"
                accept=".glb,model/gltf-binary"
                className="hidden"
                onChange={handleModelInput}
              />
              <p className="text-[0.65rem] uppercase tracking-widest text-stone-400">
                {savingModel ? 'Subiendo…' : 'Subir modelo .glb'}
              </p>
              <p className="mt-2 font-serif text-lg font-light text-stone-700">
                Arrastra el archivo o haz clic
              </p>
              <p className="mt-1 text-xs text-stone-400">
                Formato .glb &nbsp;·&nbsp; máx {MAX_MODEL_MB} MB
              </p>
            </div>

            <button
              type="button"
              onClick={handleRemoveModel}
              disabled={savingModel || !modelUrl}
              className="w-fit border border-stone-200 px-6 py-3 text-[0.6rem] uppercase tracking-widest text-stone-600 transition-colors hover:border-stone-900 disabled:opacity-50"
            >
              {savingModel ? 'Guardando…' : 'Quitar modelo 3D'}
            </button>

            {modelMsg && (
              <p className={`text-xs ${modelMsg.type === 'ok' ? 'text-green-600' : 'text-red-600'}`}>
                {modelMsg.text}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
