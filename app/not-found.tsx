import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Página no encontrada',
}

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <span className="font-serif text-8xl text-border">404</span>
      <h1 className="mt-6 font-serif text-3xl text-foreground md:text-4xl">
        Esta página no existe
      </h1>
      <p className="mt-4 max-w-sm text-pretty leading-relaxed text-muted-foreground">
        Puede que la fragancia que buscas haya cambiado de nombre o ya no esté
        disponible.
      </p>
      <Link
        href="/catalogo"
        className="mt-10 rounded-sm bg-primary px-8 py-4 text-sm font-medium uppercase tracking-[0.16em] text-primary-foreground transition-all hover:bg-primary/90"
      >
        Explorar el catálogo
      </Link>
    </div>
  )
}
