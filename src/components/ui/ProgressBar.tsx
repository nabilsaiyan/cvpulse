'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { getScoreColor } from '@/lib/utils'
import { ANIMATION_DURATIONS } from '@/lib/constants'

interface ProgressBarProps {
  value: number
  className?: string
  colorByScore?: boolean
  delay?: number
}

export function ProgressBar({
  value,
  className,
  colorByScore = false,
  delay = 0,
}: ProgressBarProps) {
  const [width, setWidth] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setWidth(value)
    }, delay)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [value, delay])

  const color = colorByScore ? getScoreColor(value).stroke : '#3b82f6'

  return (
    <div className={cn('h-1.5 w-full rounded-full bg-bg-hover overflow-hidden', className)}>
      <div
        className="h-full rounded-full transition-all ease-out"
        style={{
          width: `${width}%`,
          backgroundColor: color,
          transitionDuration: `${ANIMATION_DURATIONS.PROGRESS_BAR}ms`,
        }}
      />
    </div>
  )
}
