import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'green' | 'red' | 'amber' | 'blue' | 'purple' | 'default'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const badgeVariants: Record<BadgeVariant, string> = {
  green: 'bg-accent-green/10 text-accent-green border-accent-green/30',
  red: 'bg-accent-red/10 text-accent-red border-accent-red/30',
  amber: 'bg-accent-amber/10 text-accent-amber border-accent-amber/30',
  blue: 'bg-accent-blue/10 text-accent-blue border-accent-blue/30',
  purple: 'bg-accent-purple/10 text-accent-purple border-accent-purple/30',
  default: 'bg-bg-hover text-text-secondary border-border',
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
