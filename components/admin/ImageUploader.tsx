'use client'

import { useRef, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

const MAX_FILES = 8
const MAX_MB = 5

interface Props {
  value: string[]
  onChange: (urls: string[]) => void
  maxFiles?: number
}

export function ImageUploader({ value = [], onChange, maxFiles = MAX_FILES }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const remaining = Math.max(0, maxFiles - value.length)

  const uploadFile = async (file: File): Promise<string | null> => {
    if (file.size > MAX_MB * 1024 * 1024) return null
    const supabase = createClient()
    const ext = file.name.split('.').pop() ?? 'jpg'
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage.from('productos').upload(path, file)
    if (error) return null
    const { data } = supabase.storage.from('productos').getPublicUrl(path)
    return data.publicUrl
  }

  const processFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList?.length) return
      const files = Array.from(fileList).slice(0, remaining)
      if (!files.length) { setErrors([`Máximo ${maxFiles} imágenes.`]); return }
      setErrors([])
      setUploading(true)
      const urls = await Promise.all(files.map(uploadFile))
      const valid = urls.filter(Boolean) as string[]
      if (valid.length) onChange([...value, ...valid])
      if (valid.length < files.length) setErrors(['Alguna imagen no pudo subirse. Máx. 5 MB por archivo.'])
      setUploading(false)
    },
    [maxFiles, onChange, remaining, value],
  )

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    processFiles(e.dataTransfer.files)
  }

  const handleRemove = async (index: number) => {
    const url = value[index]
    onChange(value.filter((_, i) => i !== index))
    try {
      const supabase = createClient()
      const path = url.split('/productos/')[1]
      if (path) await supabase.storage.from('productos').remove([path])
    } catch {}
  }

  const handleMove = (index: number, dir: -1 | 1) => {
    const target = index + dir
    if (target < 0 || target >= value.length) return
    const next = [...value]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`cursor-pointer border-2 border-dashed p-10 text-center transition-colors ${dragOver ? 'border-stone-900 bg-stone-50' : 'border-stone-200'} ${uploading ? 'pointer-events-none opacity-50' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => { processFiles(e.target.files); e.target.value = '' }}
        />
        <p className="text-[0.65rem] uppercase tracking-widest text-stone-400">
          {uploading ? 'Subiendo…' : 'Añadir imágenes'}
        </p>
        <p className="mt-2 font-serif text-lg font-light text-stone-700">
          Arrastra fotos o haz clic
        </p>
        <p className="mt-1 text-xs text-stone-400">
          JPG · PNG · WEBP &nbsp;·&nbsp; máx {MAX_MB} MB &nbsp;·&nbsp; {value.length}/{maxFiles}
        </p>
      </div>

      {errors.map((err, i) => (
        <p key={i} className="text-xs text-red-600">{err}</p>
      ))}

      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {value.map((url, i) => (
            <div key={url + i} className="group relative aspect-[3/4] overflow-hidden bg-stone-100">
              <img src={url} alt="" className="h-full w-full object-cover" loading="lazy" />
              {i === 0 && (
                <span className="absolute left-2 top-2 bg-stone-900 px-2 py-0.5 text-[0.6rem] uppercase tracking-widest text-white">
                  Principal
                </span>
              )}
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="absolute bottom-2 right-2 grid h-7 w-7 place-items-center bg-red-600/90 text-white hover:bg-red-700"
              >
                ×
              </button>
              <div className="absolute inset-x-2 bottom-10 hidden gap-1 group-hover:flex">
                <button
                  type="button"
                  onClick={() => handleMove(i, -1)}
                  disabled={i === 0}
                  className="grid h-7 w-7 place-items-center bg-black/50 text-white disabled:opacity-30"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(i, 1)}
                  disabled={i === value.length - 1}
                  className="grid h-7 w-7 place-items-center bg-black/50 text-white disabled:opacity-30"
                >
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
