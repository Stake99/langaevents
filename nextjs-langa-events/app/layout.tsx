import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const quicksand = Quicksand({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Langa Events - Event Planning & Management',
  description: 'Professional event planning and management services for weddings, corporate events, brand activations, and social gatherings.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
