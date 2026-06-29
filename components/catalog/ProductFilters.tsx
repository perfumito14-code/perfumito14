'use client'

import type { FamiliaOlfativa } from '@/types/product'
import { FAMILIAS } from '@/types/product'
import { cn } from '@/lib/utils'

interface Props {
  familiasActivas: FamiliaOlfativa[]
  tamanosActivos: string[]
  volumesDisponibles: string[]
  onToggleFamilia: (f: FamiliaOlfativa) => void
  onToggleTamano: (t: string) => void
  onLimpiar: () => void
  totalActivos: number
}

export function ProductFilters({
  familiasActivas,
  tamanosActivos,
  volumesDisponibles,
  onToggleFamilia,
  onToggleTamano,
  onLimpiar,
  totalActivos,
}: Props) {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
          Filtrar
        </h2>
        {totalActivos > 0 && (
          <button
            type="button"
            onClick={onLimpiar}
            className="text-xs uppercase tracking-[0.14em] text-primary underline-offset-4 hover:underline"
          >
            Limpiar
          </button>
        )}
      </div>

      <fieldset>
        <legend className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Familia olfativa
        </legend>
        <div className="flex flex-wrap gap-2">
          {FAMILIAS.map((f) => {
            const activo = familiasActivas.includes(f.value)
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => onToggleFamilia(f.value)}
                aria-pressed={activo}
                className={cn(
                  'rounded-sm border px-3.5 py-2 text-xs font-medium tracking-wide transition-colors',
                  activo
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50',
                )}
              >
                {f.label}
              </button>
            )
          })}
        </div>
      </fieldset>

      {volumesDisponibles.length > 0 && (
        <fieldset>
          <legend className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Formato
          </legend>
          <div className="flex flex-wrap gap-2">
            {volumesDisponibles.map((t) => {
              const activo = tamanosActivos.includes(t)
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => onToggleTamano(t)}
                  aria-pressed={activo}
                  className={cn(
                    'rounded-sm border px-4 py-2 text-xs font-medium tracking-wide transition-colors',
                    activo
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-foreground hover:border-primary/50',
                  )}
                >
                  {t}
                </button>
              )
            })}
          </div>
        </fieldset>
      )}
    </div>
  )
}
