import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}
import { WHATSAPP_NUMERO } from '@/lib/whatsapp'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="contacto"
      className="border-t border-border bg-card text-card-foreground"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <span className="font-serif text-3xl font-semibold tracking-[0.18em]">
              AURÉLIO
            </span>
            <p className="mt-5 max-w-sm text-pretty leading-relaxed text-muted-foreground">
              Perfumería italiana de autor. Composiciones a mano con materias
              primas nobles, pensadas para quien entiende la fragancia como una
              forma de memoria.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Explorar
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo"
                  className="transition-colors hover:text-primary"
                >
                  Catálogo completo
                </Link>
              </li>
              <li>
                <Link
                  href="/#historia"
                  className="transition-colors hover:text-primary"
                >
                  Nuestra historia
                </Link>
              </li>
              <li>
                <Link
                  href="/#como-funciona"
                  className="transition-colors hover:text-primary"
                >
                  Cómo comprar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-gold" />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMERO}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  Pedidos por WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-gold" />
                <a
                  href="mailto:ciao@aurelio.example"
                  className="transition-colors hover:text-primary"
                >
                  ciao@aurelio.example
                </a>
              </li>
              <li className="flex items-center gap-3">
                <InstagramIcon className="size-4 text-gold" />
                <a
                  href="#"
                  className="transition-colors hover:text-primary"
                >
                  @aurelio.profumi
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 text-gold" />
                <span>Via delle Essenze, 12 — Firenze, Italia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {year} Aurélio Profumi. Todos los derechos reservados.</p>
          <p className="max-w-xl text-pretty">
            Catálogo de demostración con productos ficticios. Los nombres y
            fragancias mostrados son orientativos y serán sustituidos por el
            catálogo real del proveedor.
          </p>
        </div>
      </div>
    </footer>
  )
}
