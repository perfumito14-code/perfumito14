'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    // TODO: conectar a servicio de email cuando esté disponible.
    console.log('[v0] Newsletter submit:', email)
    setEnviado(true)
    setEmail('')
  }

  return (
    <section className="bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-5 text-center md:px-8">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
            Círculo Aurélio
          </span>
          <h2 className="mt-4 text-balance font-serif text-4xl leading-tight text-foreground md:text-5xl">
            Recibe nuestras novedades
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            Suscríbete para conocer en primicia nuevos lanzamientos, ediciones
            limitadas y la historia detrás de cada fragancia.
          </p>

          <form
            onSubmit={onSubmit}
            className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="h-12 flex-1 rounded-sm border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2 rounded-sm bg-primary px-6 text-sm font-medium uppercase tracking-[0.14em] text-primary-foreground transition-all hover:bg-primary/90"
            >
              {enviado ? (
                <>
                  <Check className="size-4" /> Suscrito
                </>
              ) : (
                'Suscribirme'
              )}
            </button>
          </form>
          {enviado && (
            <p className="mt-4 text-sm text-muted-foreground">
              Gracias por unirte al círculo Aurélio.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
