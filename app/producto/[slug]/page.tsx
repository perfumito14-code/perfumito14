import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import {
  getProductoPorSlug,
  getRelacionados,
  productos,
} from '@/data/products'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductInfo } from '@/components/product/ProductInfo'
import { ScentPyramid } from '@/components/product/ScentPyramid'
import { ProductCard } from '@/components/catalog/ProductCard'

export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const producto = getProductoPorSlug(slug)
  if (!producto) return { title: 'Producto no encontrado' }
  return {
    title: producto.nombre,
    description: producto.descripcionCorta,
    openGraph: {
      title: `${producto.nombre} · perfumito14`,
      description: producto.descripcionCorta,
      images: producto.imagenes,
    },
  }
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const producto = getProductoPorSlug(slug)
  if (!producto) notFound()

  const relacionados = getRelacionados(producto)

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pt-28 md:px-8 md:pt-36">
        {/* Migas de pan */}
        <nav
          aria-label="Migas de pan"
          className="flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-muted-foreground"
        >
          <Link href="/" className="transition-colors hover:text-primary">
            Inicio
          </Link>
          <ChevronRight className="size-3.5" />
          <Link
            href="/catalogo"
            className="transition-colors hover:text-primary"
          >
            Catálogo
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">{producto.nombre}</span>
        </nav>

        {/* Galería + info */}
        <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-2 md:gap-16">
          <ProductGallery
            imagenes={producto.imagenes}
            nombre={producto.nombre}
          />
          <ProductInfo producto={producto} />
        </div>

        {/* Pirámide olfativa */}
        <section className="mt-20 md:mt-28">
          <div className="mb-8 text-center">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Composición
            </span>
            <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
              Pirámide olfativa
            </h2>
          </div>
          <div className="mx-auto max-w-3xl">
            <ScentPyramid producto={producto} />
          </div>
        </section>
      </div>

      {/* Relacionados */}
      {relacionados.length > 0 && (
        <section className="mt-24 border-t border-border bg-secondary/40 py-20 md:mt-32 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 className="text-balance font-serif text-3xl text-foreground md:text-4xl">
              También te puede interesar
            </h2>
            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
              {relacionados.map((p) => (
                <ProductCard key={p.id} producto={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
