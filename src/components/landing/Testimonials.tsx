'use client'

import { Star } from 'lucide-react'
import { Reveal } from './Reveal'

interface TestimonialItem {
  quote: string
  name: string
  role: string
  initials: string
  gradient: string
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      'I applied to 40 jobs with zero callbacks. CVPulse showed me I was missing 9 of the 12 keywords every posting asked for. Three interviews the following week.',
    name: 'Sarah C.',
    role: 'Frontend Developer',
    initials: 'SC',
    gradient: 'from-blue-500 to-purple-500',
  },
  {
    quote:
      'The ATS score explained everything. My CV was a beautiful two-column design that parsers turned into soup. Switched to the suggested structure — instant difference.',
    name: 'Marcus T.',
    role: 'Data Analyst',
    initials: 'MT',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    quote:
      'As a career switcher I had no idea how to position my experience. The section-by-section feedback told me exactly what to reframe and what to cut.',
    name: 'Priya K.',
    role: 'Product Manager',
    initials: 'PK',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    quote:
      'The rewritten summary was embarrassingly better than mine. I shipped it word for word and got a recruiter reply the same day.',
    name: 'James O.',
    role: 'DevOps Engineer',
    initials: 'JO',
    gradient: 'from-green-500 to-cyan-500',
  },
  {
    quote:
      'New grad, no network, 200+ applications. This tool showed me my skills section scored 41/100. Fixed it in twenty minutes using the keyword gaps.',
    name: 'Lena W.',
    role: 'Junior Developer',
    initials: 'LW',
    gradient: 'from-amber-500 to-red-500',
  },
  {
    quote:
      'I review CVs for a living and I still use this before sending mine out. The keyword matching is deterministic — no fluff, just gaps.',
    name: 'David R.',
    role: 'Tech Recruiter',
    initials: 'DR',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    quote:
      'Watching the analysis stream in live instead of staring at a spinner is such a nice touch. And the interview probability verdict is brutally honest.',
    name: 'Amara N.',
    role: 'UX Designer',
    initials: 'AN',
    gradient: 'from-pink-500 to-purple-500',
  },
  {
    quote:
      'Used my own Gemini key, unlimited analyses, zero cost. Ran every job in my shortlist through it and prioritized the ones scoring 80+.',
    name: 'Tom H.',
    role: 'Marketing Manager',
    initials: 'TH',
    gradient: 'from-cyan-400 to-green-500',
  },
] as const

function TestimonialCard({ quote, name, role, initials, gradient }: TestimonialItem) {
  return (
    <figure className="w-[300px] sm:w-[380px] shrink-0 rounded-2xl bg-bg-card border border-border p-5
      hover:border-border-hover transition-colors duration-300">
      <div className="flex gap-0.5 mb-3" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-accent-amber text-accent-amber" />
        ))}
      </div>
      <blockquote className="text-sm text-text-secondary leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-2.5">
        <span
          className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}
        >
          {initials}
        </span>
        <span>
          <span className="block text-xs font-medium text-text-primary">{name}</span>
          <span className="block text-[11px] text-text-muted">{role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

function MarqueeRow({
  items,
  reverse = false,
  duration = '38s',
}: {
  items: TestimonialItem[]
  reverse?: boolean
  duration?: string
}) {
  return (
    <div className="marquee-row relative overflow-hidden">
      <div
        className={`animate-marquee flex w-max gap-4 pr-4 ${reverse ? 'marquee-reverse' : ''}`}
        style={{ '--marquee-duration': duration } as React.CSSProperties}
      >
        {/* Content duplicated once for a seamless -50% loop */}
        {[...items, ...items].map((item, i) => (
          <TestimonialCard key={`${item.name}-${i}`} {...item} />
        ))}
      </div>
    </div>
  )
}

export function Testimonials() {
  const firstRow = TESTIMONIALS.slice(0, 4)
  const secondRow = TESTIMONIALS.slice(4)

  return (
    <section className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(168,85,247,0.05) 0%, transparent 70%)',
        }}
      />

      <Reveal className="relative text-center mb-14 px-5">
        <p className="font-mono text-xs text-accent-blue tracking-[0.2em] mb-4">TESTIMONIALS</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
          Job seekers stopped guessing.
          <br />
          <span className="text-text-muted">So can you.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative">
          <div className="space-y-4">
            <MarqueeRow items={firstRow} duration="38s" />
            <MarqueeRow items={secondRow} reverse duration="46s" />
          </div>

          {/* Edge fade masks — siblings of the rows container so they span its full height */}
          <div className="absolute inset-y-0 left-0 w-10 sm:w-40 z-10 bg-gradient-to-r from-bg-deep to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-10 sm:w-40 z-10 bg-gradient-to-l from-bg-deep to-transparent pointer-events-none" />
        </div>
      </Reveal>
    </section>
  )
}
