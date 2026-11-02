import Image from 'next/image'
import Link from 'next/link'

import WalletConnect from './WalletConnect'

export default function WebsiteLayout({children}: LayoutProps<'/'>) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-habix-ink text-white">
        <nav
          aria-label="Main navigation"
          className="relative mx-auto flex w-full max-w-[100rem] items-center gap-3 px-4 py-1 md:gap-5 md:px-16 md:py-2 lg:px-32"
        >
          <Link aria-label="Habix Music Group home" className="shrink-0" href="/">
            <Image
              alt="Habix Music Group"
              className="h-auto w-[68px] md:w-[88px]"
              height={915}
              loading="eager"
              sizes="(max-width: 768px) 68px, 88px"
              src="/habix-logo-ink.png"
              width={1512}
            />
          </Link>
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1.5 text-[11px] md:flex lg:gap-5 lg:text-base">
            <Link
              className="text-white/75 transition hover:text-habix-coral"
              href="/#sound"
            >
              What we do
            </Link>
            <Link
              className="text-white/75 transition hover:text-habix-coral"
              href="/#labels"
            >
              Labels
            </Link>
            <Link
              className="text-white/75 transition hover:text-habix-coral"
              href="/#playlists"
            >
              Playlists
            </Link>
            <Link
              className="text-white/75 transition hover:text-habix-coral"
              href="/#about"
            >
              About
            </Link>
          </div>
          <div className="ml-auto">
            <WalletConnect />
          </div>
        </nav>
      </header>

      <main className="w-full grow">{children}</main>

      <footer className="bg-habix-ink text-white">
        <div className="mx-auto flex w-full max-w-[100rem] flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:px-16 md:py-10 lg:px-32">
          <Link aria-label="Habix Music Group home" className="w-fit" href="/">
            <Image
              alt="Habix Music Group"
              className="h-auto w-[92px]"
              height={915}
              sizes="92px"
              src="/habix-logo-ink.png"
              width={1512}
            />
          </Link>
          <Link className="text-sm font-medium transition hover:text-habix-coral" href="/#labels">
            Explore our labels <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="border-t border-white/15 px-4 py-4 text-center text-xs text-white/55">
          © 2024 Habix Music Group. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
