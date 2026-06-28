import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://perfumito14.vercel.app'),
  title: {
    default: 'perfumito14 · Perfumes italianos premium',
    template: '%s · perfumito14',
  },
  description:
    'Perfumes italianos premium. Fragancias de nicho importadas directamente desde Italia. Tu pedido se confirma de forma personal por WhatsApp.',
  keywords: [
    'perfume italiano',
    'perfumería de nicho',
    'fragancias artesanales',
    'perfumes italianos premium',
    'perfumito14',
  ],
  openGraph: {
    title: 'perfumito14 · Perfumes italianos premium',
    description:
      'Perfumes italianos premium importados desde Italia. Pedido por WhatsApp.',
    type: 'website',
    locale: 'es_ES',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#faf8f5',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
