import type { Producto } from '@/types/product'

const CAPAS = [
  { key: 'notasSalida', titulo: 'Notas de salida', desc: 'La primera impresión' },
  { key: 'notasCorazon', titulo: 'Notas de corazón', desc: 'El alma de la fragancia' },
  { key: 'notasFondo', titulo: 'Notas de fondo', desc: 'La estela que perdura' },
] as const

export function ScentPyramid({ producto }: { producto: Producto }) {
  return (
    <div className="space-y-px overflow-hidden rounded-sm border border-border">
      {CAPAS.map((capa, i) => {
        const notas = producto[capa.key]
        return (
          <div
            key={capa.key}
            className="bg-card px-6 py-6 transition-colors"
            style={{
              // Cada capa ligeramente más profunda, evocando la pirámide olfativa.
              backgroundColor: `color-mix(in oklab, var(--card), var(--secondary) ${i * 28}%)`,
            }}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h4 className="font-serif text-lg text-foreground">
                  {capa.titulo}
                </h4>
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {capa.desc}
                </p>
              </div>
              <div className="mt-2 flex flex-wrap gap-2 sm:mt-0 sm:justify-end">
                {notas.map((n) => (
                  <span
                    key={n}
                    className="rounded-sm border border-gold/40 bg-background/60 px-3 py-1 text-xs text-foreground"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
