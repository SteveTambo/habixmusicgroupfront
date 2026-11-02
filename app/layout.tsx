import './globals.css'
import type {Metadata} from 'next'
import {IBM_Plex_Mono, Inter, PT_Serif} from 'next/font/google'
import {siteDescription, siteName, siteTitle, siteUrl} from './site'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName,
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    locale: 'en_KE',
    images: [
      {
        url: '/habix-logo-ink.png',
        width: 1512,
        height: 915,
        alt: 'Habix Music Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/habix-logo-ink.png'],
  },
}

// The Tailwind `font-*` utilities map onto these variables in app/globals.css (`@theme inline`).
const serif = PT_Serif({
  variable: '--font-pt-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})
const sans = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  // @todo: understand why extrabold (800) isn't being respected when explicitly specified in this weight array
  // weight: ['500', '700', '800'],
})
const mono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})

export default function RootLayout({children}: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  )
}
