'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { getScoreColor } from '@/lib/utils'
import { ANIMATION_DURATIONS } from '@/lib/constants'

interface ScoreRingProps {
  score: number
  label: string
  size?: 'lg' | 'sm'
  delay?: number
}

export function ScoreRing({ score, label, size = 'lg', delay = 0 }: ScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const [animatedOffset, setAnimatedOffset] = useState(1000)
  const frameRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const hasStarted = useRef(false)

  const isLg = size === 'lg'
  const svgSize = isLg ? 140 : 88
  const strokeWidth = isLg ? 10 : 7
  const radius = (svgSize - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const targetOffset = circumference - (score / 100) * circumference

  const { class: colorClass, stroke: strokeColor } = getScoreColor(score)

  useEffect(() => {
    const timeout = setTimeout(() => {
      hasStarted.current = true
      const duration = ANIMATION_DURATIONS.SCORE_RING
      const countDuration = ANIMATION_DURATIONS.SCORE_COUNT

      const animate = (timestamp: number) => {
        if (!startRef.current) startRef.current = timestamp
        const elapsed = timestamp - startRef.current
        const progress = Math.min(elapsed / duration, 1)
        // easeOut cubic
        const eased = 1 - Math.pow(1 - progress, 3)

        setAnimatedOffset(circumference - eased * (circumference - targetOffset))

        const countProgress = Math.min(elapsed / countDuration, 1)
        const countEased = 1 - Math.pow(1 - countProgress, 3)
        setAnimatedScore(Math.round(countEased * score))

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate)
        }
      }

      frameRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [score, circumference, targetOffset, delay])

  const cx = svgSize / 2
  const cy = svgSize / 2

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: svgSize, height: svgSize }}>
        <svg
          width={svgSize}
          height={svgSize}
          className="-rotate-90"
          style={{ overflow: 'visible' }}
        >
          {/* Track */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animatedOffset}
            style={{
              filter: `drop-shadow(0 0 6px ${strokeColor}80)`,
            }}
          />
        </svg>
        {/* Score number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={cn(
              'font-mono font-bold leading-none',
              colorClass,
              isLg ? 'text-3xl' : 'text-xl'
            )}
          >
            {animatedScore}
          </span>
          {isLg && (
            <span className="text-xs text-text-muted mt-0.5 font-mono">/ 100</span>
          )}
        </div>
      </div>
      <span className={cn('text-text-secondary', isLg ? 'text-sm' : 'text-xs')}>
        {label}
      </span>
    </div>
  )
}
