import type { MetadataRoute } from 'next'
import { productos } from '@/data/products'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://perfumito14.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const productosEntries = productos.map((p) => ({
    url: `${BASE_URL}/producto/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/catalogo`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...productosEntries,
  ]
}
