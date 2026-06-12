'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from './Reveal'
import { ROUTES } from '@/lib/constants'

export function CTA() {
  return (
    <section className="relative py-32 px-5 overflow-hidden">
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 65% at 50% 100%, rgba(59,130,246,0.18) 0%, rgba(168,85,247,0.06) 50%, transparent 75%)',
        }}
      />
      <div className="absolute inset-0 bg-dot-grid opacity-40 mask-fade-bottom pointer-events-none" />

      <Reveal className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] text-text-primary">
          Stop guessing why.
          <br />
          <span className="shimmer-text">Start getting interviews.</span>
        </h2>
        <p className="mt-6 text-lg text-text-secondary max-w-xl mx-auto">
          Your next application deserves better than hope. Run the analysis —
          it takes less time than writing a cover letter.
        </p>
        <div className="mt-10">
          <Link
            href={ROUTES.ANALYZE}
            className="group inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-lg font-semibold
              bg-gradient-to-r from-blue-600 to-blue-500 text-white
              hover:from-blue-500 hover:to-blue-400 hover:shadow-[0_0_48px_rgba(59,130,246,0.5)]
              transition-all duration-300"
          >
            Analyze my CV now
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <p className="mt-5 text-xs text-text-muted">Free · No signup · Results in ~10 seconds</p>
      </Reveal>
    </section>
  )
}
