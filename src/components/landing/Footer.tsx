import Link from 'next/link'
import { Globe } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { AUTHOR_URL, ROUTES } from '@/lib/constants'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  )
}

const PRODUCT_LINKS = [
  { label: 'Analyzer', href: ROUTES.ANALYZE },
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'FAQ', href: '/#faq' },
] as const

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/nabilsaiyan', icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/nabil-amhaouch', icon: LinkedinIcon },
  { label: 'Portfolio', href: AUTHOR_URL, icon: Globe },
] as const

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-surface/60">
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="sm:col-span-1">
            <Logo />
            <p className="mt-3 text-sm text-text-muted leading-relaxed max-w-xs">
              AI-powered CV analysis. Know your match score, fix your keyword gaps,
              land the interview.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">
              Product
            </p>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">
              Connect
            </p>
            <ul className="space-y-2.5">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-7 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <p>
            Built by{' '}
            <a
              href={AUTHOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent-blue transition-colors"
            >
              Nabil Amhaouch
            </a>{' '}
            · Powered by AI
          </p>
          <p>Open source · MIT License</p>
        </div>
      </div>
    </footer>
  )
}
