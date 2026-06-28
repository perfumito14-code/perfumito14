'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setError(null)
    setSubmitting(true)
    const supabase = createClient()
    const { error: err } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    if (err) {
      setError('Credenciales incorrectas. Inténtalo de nuevo.')
      setSubmitting(false)
      return
    }
    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-stone-50 px-6 py-20">
      {/* Decorative background text */}
      <span
        aria-hidden
        className="pointer-events-none absolute select-none font-serif text-stone-200"
        style={{
          fontSize: 'clamp(6rem, 20vw, 18rem)',
          fontWeight: 300,
          left: '-0.05em',
          top: '-0.1em',
          lineHeight: 0.85,
        }}
      >
        admin
      </span>

      <div className="relative z-10 w-full max-w-md border border-stone-200 bg-white p-10">
        <div className="mb-10">
          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-stone-400">
            Perfumito 14 · CMS
          </span>
          <h1 className="mt-3 font-serif text-4xl font-light text-stone-900">
            Acceso privado
          </h1>
          <p className="mt-2 text-sm text-stone-400">
            Gestión de productos y catálogo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-stone-400">
              Email
            </span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-b border-stone-200 bg-transparent py-2 text-sm text-stone-900 outline-none transition-colors focus:border-stone-900"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-stone-400">
              Contraseña
            </span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b border-stone-200 bg-transparent py-2 text-sm text-stone-900 outline-none transition-colors focus:border-stone-900"
            />
          </label>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 bg-stone-900 py-4 text-[0.6rem] uppercase tracking-widest text-white transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            {submitting ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
