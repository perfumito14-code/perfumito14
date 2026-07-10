'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatearPrecio } from '@/lib/format'

interface PedidoItem {
  producto_id: string
  slug: string
  nombre: string
  sku: string
  tamano: string
  ml: number
  precio_unitario: number
  cantidad: number
}

interface Pedido {
  id: string
  items: PedidoItem[]
  subtotal: number
  status: string
  stock_descontado: boolean
  created_at: string
}

const STATUSES = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'confirmado', label: 'Confirmado' },
  { value: 'pagado', label: 'Pagado' },
  { value: 'enviado', label: 'Enviado' },
  { value: 'entregado', label: 'Entregado' },
  { value: 'cancelado', label: 'Cancelado' },
]

const statusColor = (status: string) => {
  if (status === 'cancelado') return 'border-red-200 bg-red-50 text-red-600'
  if (status === 'entregado' || status === 'enviado' || status === 'pagado') return 'border-stone-900 bg-stone-900 text-white'
  if (status === 'confirmado') return 'border-stone-300 bg-stone-100 text-stone-700'
  return 'border-stone-200 text-stone-500'
}

const fmtFecha = (iso: string) =>
  new Date(iso).toLocaleString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })

export default function AdminPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error: err } = await createClient()
      .from('pedidos')
      .select('id,items,subtotal,status,stock_descontado,created_at')
      .order('created_at', { ascending: false })
    if (err) setError('Error cargando pedidos.')
    else setPedidos(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const cambiarStatus = async (pedido: Pedido, status: string) => {
    setUpdating(pedido.id)
    const prev = pedidos
    setPedidos((ps) => ps.map((p) => (p.id === pedido.id ? { ...p, status } : p)))
    const { error: err } = await createClient().from('pedidos').update({ status }).eq('id', pedido.id)
    if (err) { setPedidos(prev); setError('No se pudo actualizar el pedido.') }
    else load()
    setUpdating(null)
  }

  const stats = {
    total: pedidos.length,
    pendientes: pedidos.filter((p) => p.status === 'pendiente').length,
    pagados: pedidos.filter((p) => p.status === 'pagado' || p.status === 'enviado' || p.status === 'entregado').length,
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <span className="text-[0.6rem] uppercase tracking-[0.25em] text-stone-400">Ventas</span>
        <h1 className="mt-1 font-serif text-4xl font-light text-stone-900">Pedidos</h1>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', value: stats.total },
          { label: 'Pendientes', value: stats.pendientes },
          { label: 'Pagados+', value: stats.pagados },
        ].map((s) => (
          <div key={s.label} className="border border-stone-200 bg-white p-5">
            <span className="text-[0.6rem] uppercase tracking-widest text-stone-400">{s.label}</span>
            <span className="mt-1 block font-serif text-3xl font-light text-stone-900">{s.value}</span>
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="text-sm text-stone-400">Cargando pedidos…</p>
      ) : pedidos.length === 0 ? (
        <div className="border border-stone-200 bg-white p-16 text-center">
          <p className="font-serif text-xl font-light text-stone-400">Todavía no hay pedidos.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {pedidos.map((p) => (
            <div key={p.id} className="border border-stone-200 bg-white p-5 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-stone-400">{fmtFecha(p.created_at)}</p>
                  <p className="mt-1 font-serif text-xl text-stone-900">{formatearPrecio(p.subtotal)}</p>
                </div>
                <select
                  value={p.status}
                  disabled={updating === p.id}
                  onChange={(e) => cambiarStatus(p, e.target.value)}
                  className={`border px-3 py-2 text-[0.6rem] uppercase tracking-widest outline-none ${statusColor(p.status)}`}
                >
                  {STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div className="mt-4 flex flex-col gap-1.5 border-t border-stone-100 pt-4">
                {p.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-stone-700">
                      {item.nombre} <span className="text-stone-400">({item.tamano}) x{item.cantidad}</span>
                    </span>
                    <span className="text-stone-500">{formatearPrecio(item.precio_unitario * item.cantidad)}</span>
                  </div>
                ))}
              </div>

              {p.stock_descontado && (
                <p className="mt-3 text-[0.6rem] uppercase tracking-widest text-stone-400">
                  Stock ya descontado
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
