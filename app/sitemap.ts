import type { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/supabase/products'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://perfumito14.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs()
  const productosEntries = slugs.map((slug) => ({
    url: `${BASE_URL}/producto/${slug}`,
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
