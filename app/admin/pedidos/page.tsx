'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronDown, Mail, MapPin, Phone, User } from 'lucide-react'
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
  cliente_nombre: string | null
  cliente_telefono: string | null
  cliente_direccion: string | null
  cliente_email: string | null
}

const STATUSES = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'confirmado', label: 'Confirmado' },
  { value: 'pagado', label: 'Pagado' },
  { value: 'enviado', label: 'Enviado' },
  { value: 'entregado', label: 'Entregado' },
  { value: 'cancelado', label: 'Cancelado' },
]

/**
 * Semántica de color por urgencia (no éxito/fracaso): rojo = pedido nuevo
 * que requiere acción inmediata, ámbar = en preparación, azul = en camino,
 * verde = ciclo completado con éxito, gris = fuera del flujo activo.
 */
const STATUS_STYLE: Record<string, { dot: string; bg: string; text: string; border: string }> = {
  pendiente: { dot: 'bg-red-500', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  confirmado: { dot: 'bg-amber-500', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  pagado: { dot: 'bg-amber-500', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  enviado: { dot: 'bg-blue-500', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  entregado: { dot: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  cancelado: { dot: 'bg-stone-400', bg: 'bg-stone-100', text: 'text-stone-500', border: 'border-stone-200' },
}

const fmtFecha = (iso: string) =>
  new Date(iso).toLocaleString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })

function StatusSelect({ pedido, disabled, onChange }: { pedido: Pedido; disabled: boolean; onChange: (status: string) => void }) {
  const style = STATUS_STYLE[pedido.status] ?? STATUS_STYLE.pendiente
  return (
    <div className={`relative inline-flex items-center rounded-full border ${style.border} ${style.bg} py-1.5 pl-3 pr-7`}>
      <span className={`mr-2 size-1.5 shrink-0 rounded-full ${style.dot}`} aria-hidden="true" />
      <select
        value={pedido.status}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none bg-transparent text-[0.65rem] font-semibold uppercase tracking-widest outline-none ${style.text}`}
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      <ChevronDown className={`pointer-events-none absolute right-2 size-3 ${style.text}`} />
    </div>
  )
}

function DatosCliente({ pedido }: { pedido: Pedido }) {
  if (!pedido.cliente_nombre && !pedido.cliente_telefono && !pedido.cliente_direccion) {
    return (
      <p className="text-xs italic text-stone-400">
        Pedido anterior sin datos de cliente registrados.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-1.5 text-sm text-stone-600">
      {pedido.cliente_nombre && (
        <div className="flex items-center gap-2">
          <User className="size-3.5 shrink-0 text-stone-400" />
          <span className="font-medium text-stone-900">{pedido.cliente_nombre}</span>
        </div>
      )}
      {pedido.cliente_telefono && (
        <a href={`tel:${pedido.cliente_telefono}`} className="flex items-center gap-2 hover:text-primary">
          <Phone className="size-3.5 shrink-0 text-stone-400" />
          {pedido.cliente_telefono}
        </a>
      )}
      {pedido.cliente_direccion && (
        <div className="flex items-center gap-2">
          <MapPin className="size-3.5 shrink-0 text-stone-400" />
          {pedido.cliente_direccion}
        </div>
      )}
      {pedido.cliente_email && (
        <a href={`mailto:${pedido.cliente_email}`} className="flex items-center gap-2 hover:text-primary">
          <Mail className="size-3.5 shrink-0 text-stone-400" />
          {pedido.cliente_email}
        </a>
      )}
    </div>
  )
}

export default function AdminPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error: err } = await createClient()
      .from('pedidos')
      .select('id,items,subtotal,status,stock_descontado,created_at,cliente_nombre,cliente_telefono,cliente_direccion,cliente_email')
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
                <StatusSelect pedido={p} disabled={updating === p.id} onChange={(status) => cambiarStatus(p, status)} />
              </div>

              <div className="mt-4 grid gap-4 border-t border-stone-100 pt-4 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  {p.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-stone-700">
                        {item.nombre} <span className="text-stone-400">({item.tamano}) x{item.cantidad}</span>
                      </span>
                      <span className="text-stone-500">{formatearPrecio(item.precio_unitario * item.cantidad)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-100 pt-4 md:border-l md:border-t-0 md:pl-4 md:pt-0">
                  <DatosCliente pedido={p} />
                </div>
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
