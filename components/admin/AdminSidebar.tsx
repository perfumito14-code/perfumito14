'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const NAV = [
  { href: '/admin', label: 'Productos', exact: true },
  { href: '/admin/productos/nuevo', label: 'Nuevo producto', exact: false },
  { href: '/admin/hero', label: 'Hero', exact: true },
  { href: '/admin/categorias', label: 'Familias olfativas', exact: true },
  { href: '/admin/envios', label: 'Envíos', exact: true },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-stone-200 bg-white md:flex" style={{ padding: '2.5rem 1.75rem' }}>
        <div className="mb-12">
          <span className="block text-[0.6rem] uppercase tracking-[0.3em] text-stone-400">
            Perfumito 14
          </span>
          <h2 className="mt-1 font-serif text-2xl font-light text-stone-900">
            Panel admin
          </h2>
        </div>

        <nav className="flex flex-col">
          <span className="mb-3 text-[0.6rem] uppercase tracking-[0.25em] text-stone-400">
            Gestión
          </span>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`border-l-2 py-2.5 pl-3 text-sm transition-colors ${
                isActive(item.href, item.exact)
                  ? 'border-stone-900 text-stone-900'
                  : 'border-transparent text-stone-400 hover:text-stone-900'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-stone-100 pt-6">
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full bg-stone-900 px-4 py-3 text-[0.6rem] uppercase tracking-widest text-white transition-opacity hover:opacity-80"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ── Mobile topbar ── */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-stone-200 bg-white px-5 md:hidden">
        <span className="font-serif text-lg font-light text-stone-900">Admin</span>
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5"
        >
          <span className={`block h-px w-5 bg-stone-900 transition-transform duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block h-px w-5 bg-stone-900 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-5 bg-stone-900 transition-transform duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </header>

      {/* ── Mobile drawer backdrop ── */}
      {menuOpen && (
        <div
          className="absolute inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <div
        className={`absolute inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-stone-200 bg-white transition-transform duration-300 md:hidden ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ padding: '2rem 1.5rem' }}
      >
        <div className="mb-10 mt-2">
          <span className="block text-[0.6rem] uppercase tracking-[0.3em] text-stone-400">
            Perfumito 14
          </span>
          <h2 className="mt-1 font-serif text-xl font-light text-stone-900">
            Panel admin
          </h2>
        </div>

        <nav className="flex flex-col">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`border-l-2 py-3 pl-3 text-base transition-colors ${
                isActive(item.href, item.exact)
                  ? 'border-stone-900 text-stone-900'
                  : 'border-transparent text-stone-400'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full bg-stone-900 px-4 py-3 text-[0.6rem] uppercase tracking-widest text-white"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  )
}
