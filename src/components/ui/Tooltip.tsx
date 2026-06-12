'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface TooltipProps {
  content: string
  children: React.ReactNode
  className?: string
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
          <span className="block px-2.5 py-1.5 rounded-lg bg-bg-surface border border-border text-xs text-text-secondary whitespace-nowrap shadow-xl">
            {content}
          </span>
          <span className="block w-2 h-2 mx-auto -mt-1 rotate-45 bg-bg-surface border-r border-b border-border" />
        </span>
      )}
    </span>
  )
}
