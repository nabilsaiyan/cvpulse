import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  glow?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-bg-card border border-border rounded-xl',
          hoverable && 'hover:border-border-hover hover:bg-bg-hover transition-all duration-200 cursor-pointer',
          glow && 'glow-blue-sm',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
