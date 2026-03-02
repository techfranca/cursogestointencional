import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/contexts/AuthContext'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Jornada de 15 Dias — Conexão Conjugal',
  description: 'Material de apoio para fortalecer o vínculo conjugal com atividades diárias, reflexões e questionário de percepção.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/icon-light-32x32.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
