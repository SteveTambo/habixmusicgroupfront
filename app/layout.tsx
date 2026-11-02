import './globals.css'
import type {Metadata} from 'next'
import {IBM_Plex_Mono, Inter, PT_Serif} from 'next/font/google'

const siteTitle = 'Habix Music Group | Independent Music & Entertainment'
const siteDescription =
  'An independent music and entertainment company spanning recorded music, artist development, merchandising, and audiovisual production. From Nairobi to Africa and beyond.'

export const metadata: Metadata = {
  metadataBase: new URL('https://music.habixgroup.top'),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    type: 'website',
    siteName: 'Habix Music Group',
    title: siteTitle,
    description: siteDescription,
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
