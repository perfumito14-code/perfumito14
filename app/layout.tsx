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
  metadataBase: new URL('https://maison-aurelio.example'),
  title: {
    default: 'Aurélio · Perfumería italiana de autor',
    template: '%s · Aurélio',
  },
  description:
    'Fragancias italianas de nicho, compuestas a mano con materias primas nobles. Disponibles en 30ml y 50ml. Tu pedido se confirma de forma personal por WhatsApp.',
  keywords: [
    'perfume italiano',
    'perfumería de nicho',
    'fragancias artesanales',
    'eau de parfum',
    'Aurélio',
  ],
  generator: 'v0.app',
  openGraph: {
    title: 'Aurélio · Perfumería italiana de autor',
    description:
      'Fragancias italianas de nicho compuestas a mano. 30ml y 50ml. Pedido por WhatsApp.',
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
