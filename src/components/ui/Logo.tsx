import { APP_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface LogoProps {
  /** Mark size in px */
  size?: number
  /** Render the "ResumeIQ" wordmark next to the mark */
  withWordmark?: boolean
  className?: string
}

/** App logo — a CV document being scored. Same artwork as the favicon. */
export function Logo({ size = 26, withWordmark = true, className }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        aria-hidden
        className="shrink-0"
      >
        <defs>
          <linearGradient id="logo-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="7.5" fill="url(#logo-bg)" />
        <rect x="8" y="6" width="14.5" height="19" rx="2.4" fill="#ffffff" opacity="0.96" />
        <rect x="10.8" y="9.4" width="8.2" height="1.9" rx="0.95" fill="#3b82f6" />
        <rect x="10.8" y="13.2" width="6.4" height="1.7" rx="0.85" fill="#9ca8bd" />
        <rect x="10.8" y="16.6" width="7.4" height="1.7" rx="0.85" fill="#9ca8bd" />
        <rect x="10.8" y="20" width="5" height="1.7" rx="0.85" fill="#c2cbdb" />
        <circle cx="22.6" cy="22.6" r="6.4" fill="#22c55e" stroke="#05080f" strokeWidth="1.6" />
        <path
          d="M19.9 22.7l1.9 1.9 3.4-3.7"
          stroke="#ffffff"
          strokeWidth="1.9"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {withWordmark && (
        <span className="font-mono text-sm font-bold text-text-primary leading-none">
          {APP_NAME.slice(0, 6)}
          <span className="gradient-text">{APP_NAME.slice(6)}</span>
        </span>
      )}
    </span>
  )
}
