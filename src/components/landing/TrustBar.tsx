'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Reveal } from './Reveal'
import { GeminiIcon, ClaudeIcon, OpenAIIcon } from '@/components/ui/BrandIcons'

const STATS = [
  { value: 10, suffix: 's', label: 'Average analysis time' },
  { value: 25, suffix: '+', label: 'Data points per report' },
  { value: 3, suffix: '', label: 'AI models supported' },
  { value: 100, suffix: '%', label: 'Browser-side key storage' },
] as const

const PROVIDERS = [
  { name: 'Gemini 2.5 Flash', Icon: GeminiIcon },
  { name: 'Claude Sonnet', Icon: ClaudeIcon },
  { name: 'GPT-4o mini', Icon: OpenAIIcon },
] as const

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1200
    let frame: number
    let start: number | null = null
    const tick = (t: number) => {
      if (start === null) start = t
      const progress = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target])

  return (
    <span ref={ref} className="font-mono text-4xl font-bold text-text-primary tabular-nums">
      {value}
      <span className="gradient-text">{suffix}</span>
    </span>
  )
}

export function TrustBar() {
  return (
    <section className="relative py-16 px-5 border-y border-border bg-bg-surface/50">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="text-center text-xs font-medium text-text-muted uppercase tracking-[0.2em] mb-6">
            Powered by the models you already trust
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-14">
            {PROVIDERS.map(({ name, Icon }) => (
              <span
                key={name}
                className="group inline-flex items-center gap-2.5 opacity-70 hover:opacity-100 transition-opacity"
              >
                <Icon className="w-5 h-5 text-text-primary" />
                <span className="font-mono text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                  {name}
                </span>
              </span>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="text-center">
                <CountUp target={stat.value} suffix={stat.suffix} />
                <p className="mt-1.5 text-xs text-text-muted">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
