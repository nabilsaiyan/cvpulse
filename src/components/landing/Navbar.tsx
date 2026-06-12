'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-bg-deep/75 backdrop-blur-xl border-b border-border'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href={ROUTES.HOME} className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <Link
          href={ROUTES.ANALYZE}
          className="group inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-sm font-medium
            bg-text-primary text-bg-deep hover:bg-white transition-all duration-200"
        >
          Try it free
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </nav>
    </header>
  )
}
