'use client'

interface Props {
  open: boolean
  title: string
  message: string
  loading?: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function ConfirmDialog({ open, title, message, loading, onCancel, onConfirm }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm border border-stone-200 bg-white p-8">
        <h3 className="font-serif text-xl text-stone-900">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-stone-500">{message}</p>
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-2.5 text-[0.65rem] uppercase tracking-widest text-stone-400 transition-colors hover:text-stone-900 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 px-5 py-2.5 text-[0.65rem] uppercase tracking-widest text-white transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            {loading ? 'Eliminando…' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  )
}
