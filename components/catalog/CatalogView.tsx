'use client'

import { useMemo, useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { FamiliaOlfativa, Producto, Tamano } from '@/types/product'
import { ProductFilters } from '@/components/catalog/ProductFilters'
import { ProductGrid } from '@/components/catalog/ProductGrid'

export function CatalogView({ productos }: { productos: Producto[] }) {
  const [familias, setFamilias] = useState<FamiliaOlfativa[]>([])
  const [tamanos, setTamanos] = useState<Tamano[]>([])
  const [filtrosMovil, setFiltrosMovil] = useState(false)

  const toggleFamilia = (f: FamiliaOlfativa) =>
    setFamilias((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    )

  const toggleTamano = (t: Tamano) =>
    setTamanos((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    )

  const limpiar = () => {
    setFamilias([])
    setTamanos([])
  }

  const filtrados = useMemo(() => {
    return productos.filter((p) => {
      const okFamilia =
        familias.length === 0 || familias.includes(p.familiaOlfativa)
      const okTamano =
        tamanos.length === 0 ||
        p.variantes.some((v) => tamanos.includes(v.tamano))
      return okFamilia && okTamano
    })
  }, [productos, familias, tamanos])

  const totalActivos = familias.length + tamanos.length

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      {/* Barra superior móvil */}
      <div className="mb-8 flex items-center justify-between lg:hidden">
        <p className="text-sm text-muted-foreground">
          {filtrados.length}{' '}
          {filtrados.length === 1 ? 'fragancia' : 'fragancias'}
        </p>
        <button
          type="button"
          onClick={() => setFiltrosMovil(true)}
          className="flex items-center gap-2 rounded-sm border border-border px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-foreground"
        >
          <SlidersHorizontal className="size-4" />
          Filtros
          {totalActivos > 0 && (
            <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[0.6rem] text-primary-foreground">
              {totalActivos}
            </span>
          )}
        </button>
      </div>

      <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
        {/* Filtros laterales (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <ProductFilters
              familiasActivas={familias}
              tamanosActivos={tamanos}
              onToggleFamilia={toggleFamilia}
              onToggleTamano={toggleTamano}
              onLimpiar={limpiar}
              totalActivos={totalActivos}
            />
          </div>
        </aside>

        {/* Resultados */}
        <div>
          <p className="mb-8 hidden text-sm text-muted-foreground lg:block">
            {filtrados.length}{' '}
            {filtrados.length === 1 ? 'fragancia' : 'fragancias'}
          </p>
          <ProductGrid productos={filtrados} />
        </div>
      </div>

      {/* Panel de filtros móvil */}
      <AnimatePresence>
        {filtrosMovil && (
          <>
            <motion.div
              className="fixed inset-0 z-[70] bg-foreground/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFiltrosMovil(false)}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-[80] max-h-[85vh] overflow-y-auto rounded-t-xl bg-card p-6 lg:hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-serif text-xl">Filtros</span>
                <button
                  type="button"
                  onClick={() => setFiltrosMovil(false)}
                  aria-label="Cerrar filtros"
                >
                  <X className="size-5" />
                </button>
              </div>
              <ProductFilters
                familiasActivas={familias}
                tamanosActivos={tamanos}
                onToggleFamilia={toggleFamilia}
                onToggleTamano={toggleTamano}
                onLimpiar={limpiar}
                totalActivos={totalActivos}
              />
              <button
                type="button"
                onClick={() => setFiltrosMovil(false)}
                className="mt-8 w-full rounded-sm bg-primary py-3.5 text-sm font-medium uppercase tracking-[0.16em] text-primary-foreground"
              >
                Ver {filtrados.length} resultados
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
