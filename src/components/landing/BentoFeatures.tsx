'use client'

import { motion } from 'framer-motion'
import { Gauge, Key, PenLine, Radio, TrendingUp } from 'lucide-react'
import { Reveal } from './Reveal'

const CHIP_ROWS = [
  { label: 'React', found: true },
  { label: 'TypeScript', found: true },
  { label: 'GraphQL', found: false },
  { label: 'Node.js', found: true },
  { label: 'AWS', found: false },
  { label: 'Agile', found: true },
  { label: 'Docker', found: false },
  { label: 'CI/CD', found: false },
  { label: 'REST', found: true },
] as const

const MINI_SECTIONS = [
  { label: 'Summary', score: 78 },
  { label: 'Experience', score: 91 },
  { label: 'Skills', score: 72 },
  { label: 'Education', score: 95 },
] as const

function BentoCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-bg-card border border-border p-6
        hover:border-border-hover transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  )
}

export function BentoFeatures() {
  return (
    <section id="features" className="relative py-28 px-5 bg-bg-surface/40">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="font-mono text-xs text-accent-blue tracking-[0.2em] mb-4">FEATURES</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Everything the recruiter sees.
            <br />
            <span className="text-text-muted">Before they see it.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {/* Keyword gap — wide */}
          <Reveal className="lg:col-span-2">
            <BentoCard className="h-full">
              <h3 className="text-base font-semibold text-text-primary mb-1.5">Keyword Gap Analysis</h3>
              <p className="text-sm text-text-secondary mb-5 max-w-md">
                Every keyword the job description demands, cross-checked against your CV.
                Green means matched. Red means an ATS just filtered you out.
              </p>
              <div className="flex flex-wrap gap-2">
                {CHIP_ROWS.map((chip, i) => (
                  <motion.span
                    key={chip.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      chip.found
                        ? 'bg-accent-green/10 text-accent-green border-accent-green/25'
                        : 'bg-accent-red/10 text-accent-red border-accent-red/25'
                    }`}
                  >
                    {chip.found ? '✓' : '✗'} {chip.label}
                  </motion.span>
                ))}
              </div>
            </BentoCard>
          </Reveal>

          {/* ATS score — tall */}
          <Reveal delay={0.08} className="lg:row-span-2">
            <BentoCard className="h-full flex flex-col">
              <div className="flex items-center gap-2 mb-1.5">
                <Gauge className="w-4 h-4 text-accent-blue" />
                <h3 className="text-base font-semibold text-text-primary">ATS Score</h3>
              </div>
              <p className="text-sm text-text-secondary mb-6">
                75% of CVs are rejected by software before a human reads them. Know your
                pass probability before you hit apply.
              </p>
              <div className="flex-1 flex flex-col items-center justify-center gap-5">
                <div className="relative w-36 h-36">
                  <svg width="144" height="144" viewBox="0 0 144 144" className="-rotate-90">
                    <circle cx="72" cy="72" r="58" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="11" />
                    <motion.circle
                      cx="72" cy="72" r="58" fill="none"
                      stroke="#3b82f6" strokeWidth="11" strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 58}
                      initial={{ strokeDashoffset: 2 * Math.PI * 58 }}
                      whileInView={{ strokeDashoffset: 2 * Math.PI * 58 * (1 - 0.92) }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
                      style={{ filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.45))' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-mono text-4xl font-bold text-accent-blue">92</span>
                    <span className="font-mono text-[10px] text-text-muted">ATS PASS</span>
                  </div>
                </div>
                <div className="w-full space-y-2">
                  {MINI_SECTIONS.map(({ label, score }, i) => (
                    <div key={label} className="flex items-center gap-2.5">
                      <span className="text-[11px] text-text-muted w-20 shrink-0">{label}</span>
                      <div className="flex-1 h-1 rounded-full bg-bg-hover overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-accent-blue/80"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${score}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.5 + i * 0.1 }}
                        />
                      </div>
                      <span className="font-mono text-[11px] text-text-secondary w-6 text-right">{score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>
          </Reveal>

          {/* AI rewrites */}
          <Reveal delay={0.12}>
            <BentoCard className="h-full">
              <div className="flex items-center gap-2 mb-1.5">
                <PenLine className="w-4 h-4 text-accent-purple" />
                <h3 className="text-base font-semibold text-text-primary">AI Rewrites</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Weak sections rewritten — not just flagged.
              </p>
              <div className="space-y-2 font-mono text-[10px] leading-relaxed">
                <div className="rounded-lg bg-accent-red/5 border border-accent-red/15 p-2.5 text-text-muted line-through decoration-accent-red/40">
                  Responsible for various development tasks…
                </div>
                <div className="rounded-lg bg-accent-green/5 border border-accent-green/20 p-2.5 text-text-secondary">
                  Shipped 3 customer-facing features serving 40k users, cutting load time 35%…
                </div>
              </div>
            </BentoCard>
          </Reveal>

          {/* Live streaming */}
          <Reveal delay={0.16}>
            <BentoCard className="h-full">
              <div className="flex items-center gap-2 mb-1.5">
                <Radio className="w-4 h-4 text-accent-cyan" />
                <h3 className="text-base font-semibold text-text-primary">Real-time Streaming</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Watch the analysis build token-by-token. No spinners, no waiting in the dark.
              </p>
              <div className="rounded-lg bg-bg-deep border border-border p-3 font-mono text-[10px] text-text-muted">
                <span className="text-accent-cyan">{'>'}</span> analyzing experience section…
                <span className="cursor-blink text-accent-blue ml-0.5">▌</span>
              </div>
            </BentoCard>
          </Reveal>

          {/* Interview probability */}
          <Reveal delay={0.2}>
            <BentoCard className="h-full">
              <div className="flex items-center gap-2 mb-1.5">
                <TrendingUp className="w-4 h-4 text-accent-green" />
                <h3 className="text-base font-semibold text-text-primary">Interview Probability</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                A clear verdict — low, moderate, high, or very high — so you know whether
                to apply now or fix first.
              </p>
              <div className="flex gap-1.5">
                {(['Low', 'Moderate', 'High', 'Very high'] as const).map((level, i) => (
                  <span
                    key={level}
                    className={`flex-1 text-center py-1.5 rounded-md text-[10px] font-medium border ${
                      i === 3
                        ? 'bg-accent-green/15 text-accent-green border-accent-green/30'
                        : 'bg-bg-hover/50 text-text-muted border-border'
                    }`}
                  >
                    {level}
                  </span>
                ))}
              </div>
            </BentoCard>
          </Reveal>

          {/* BYOK */}
          <Reveal delay={0.24}>
            <BentoCard className="h-full">
              <div className="flex items-center gap-2 mb-1.5">
                <Key className="w-4 h-4 text-accent-amber" />
                <h3 className="text-base font-semibold text-text-primary">Your Key, Your Data</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Bring your own Gemini, Claude, or OpenAI key for unlimited use. Stored in
                your browser — never on our servers.
              </p>
              <div className="rounded-lg bg-bg-deep border border-border px-3 py-2 font-mono text-[10px] text-text-muted flex items-center justify-between">
                <span>AIzaSyD•••••••••••3kF
                </span>
                <span className="text-accent-green">localStorage ✓</span>
              </div>
            </BentoCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
