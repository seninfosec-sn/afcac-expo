import type { Metadata } from 'next'
import { Montserrat, Open_Sans } from 'next/font/google'
import { LanguageProvider } from '@/contexts/LanguageContext'
import './globals.css'
import 'maplibre-gl/dist/maplibre-gl.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-head',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'African Air Transport Convention & Expo 2026 – AFCAC',
  description:
    'La plateforme continentale de référence pour accélérer la croissance et la modernisation du secteur du transport aérien africain. Lomé, Togo — 15–19 juin 2026.',
  keywords: 'AFCAC, aviation africaine, expo 2026, Lomé, Togo, SAATM, transport aérien, AfCFTA',
  openGraph: {
    title: 'African Air Transport Convention & Expo 2026',
    description: 'Accélérer la croissance du transport aérien africain — Lomé, Togo, 15–19 juin 2026',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
