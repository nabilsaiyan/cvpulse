'use client'

import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Zap, FileText, Sparkles } from 'lucide-react'

const FOUND = ['React', 'TypeScript', 'Node.js', 'REST APIs', 'Agile', 'Git']
const MISSING = ['GraphQL', 'AWS', 'Docker']

const SECTIONS = [
  { label: 'Summary', score: 78, color: '#3b82f6' },
  { label: 'Experience', score: 91, color: '#22c55e' },
  { label: 'Skills', score: 72, color: '#3b82f6' },
  { label: 'Education', score: 95, color: '#22c55e' },
] as const

const RING_RADIUS = 44
const RING_CIRC = 2 * Math.PI * RING_RADIUS

/**
 * Static, hand-crafted recreation of a real analysis result.
 * Renders instantly (no API call) — used as the hero conversion shot.
 */
export function ProductMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative max-w-5xl mx-auto"
    >
      {/* Under-glow */}
      <div
        className="absolute -inset-x-8 top-12 bottom-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(59,130,246,0.22) 0%, rgba(168,85,247,0.08) 45%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative gradient-border rounded-2xl overflow-hidden shadow-[0_24px_80px_-12px_rgba(0,0,0,0.7)]">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border bg-bg-surface/90">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex justify-center">
            <span className="px-4 py-1 rounded-md bg-bg-card text-[11px] font-mono text-text-muted border border-border">
              resumeiq.app/analyze
            </span>
          </div>
          <Sparkles className="w-3.5 h-3.5 text-accent-blue" />
        </div>

        {/* App body */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.42fr_0.58fr] bg-bg-deep">
          {/* Left — inputs (compact) */}
          <div className="hidden lg:flex flex-col gap-4 p-6 border-r border-border">
            <div>
              <p className="text-[11px] font-medium text-text-secondary mb-2">Job Description</p>
              <div className="rounded-xl bg-bg-card border border-border p-3.5 space-y-2">
                <div className="h-2 w-11/12 rounded-full bg-text-muted/25" />
                <div className="h-2 w-full rounded-full bg-text-muted/20" />
                <div className="h-2 w-4/5 rounded-full bg-text-muted/25" />
                <div className="h-2 w-9/12 rounded-full bg-text-muted/15" />
                <div className="h-2 w-10/12 rounded-full bg-text-muted/20" />
              </div>
            </div>
            <div>
              <p className="text-[11px] font-medium text-text-secondary mb-2">Your CV</p>
              <div className="flex items-center gap-3 rounded-xl bg-bg-card border border-accent-green/25 p-3.5">
                <FileText className="w-7 h-7 text-accent-green shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-text-primary truncate">sarah_chen_cv.pdf</p>
                  <p className="text-[10px] text-text-muted">Extracted · 2 pages</p>
                </div>
                <CheckCircle className="w-4 h-4 text-accent-green ml-auto shrink-0" />
              </div>
            </div>
            <div className="mt-auto rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-2.5 text-center text-xs font-medium text-white glow-blue-sm">
              Analyzed in 9.2s ✓
            </div>
          </div>

          {/* Right — results */}
          <div className="p-6 space-y-5">
            {/* Scores row */}
            <div className="flex items-center gap-6">
              <div className="relative w-28 h-28 shrink-0">
                <svg width="112" height="112" viewBox="0 0 112 112" className="-rotate-90">
                  <circle cx="56" cy="56" r={RING_RADIUS} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
                  <motion.circle
                    cx="56" cy="56" r={RING_RADIUS} fill="none"
                    stroke="#22c55e" strokeWidth="9" strokeLinecap="round"
                    strokeDasharray={RING_CIRC}
                    initial={{ strokeDashoffset: RING_CIRC }}
                    whileInView={{ strokeDashoffset: RING_CIRC * (1 - 0.87) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.8, ease: 'easeOut' }}
                    style={{ filter: 'drop-shadow(0 0 8px rgba(34,197,94,0.5))' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-mono text-3xl font-bold text-accent-green">87</span>
                  <span className="font-mono text-[9px] text-text-muted">/ 100</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-text-secondary">Overall Match</p>
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-accent-green/10 text-accent-green border border-accent-green/25">
                  Very high interview chance
                </span>
                <p className="text-xs text-text-muted">
                  ATS Score <span className="font-mono font-bold text-accent-blue">92</span>
                  <span className="mx-2 text-text-muted/40">·</span>
                  18 keywords matched
                </p>
              </div>
            </div>

            {/* Keywords */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-accent-green mr-0.5" />
                {FOUND.map((kw, i) => (
                  <motion.span
                    key={kw}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + i * 0.06 }}
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent-green/10 text-accent-green border border-accent-green/25"
                  >
                    {kw}
                  </motion.span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-accent-red mr-0.5" />
                {MISSING.map((kw, i) => (
                  <motion.span
                    key={kw}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.4 + i * 0.06 }}
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent-red/10 text-accent-red border border-accent-red/25"
                  >
                    {kw}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Section bars */}
            <div className="grid grid-cols-2 gap-2.5">
              {SECTIONS.map(({ label, score, color }, i) => (
                <div key={label} className="rounded-lg bg-bg-card border border-border p-2.5">
                  <div className="flex justify-between text-[10px] mb-1.5">
                    <span className="text-text-secondary">{label}</span>
                    <span className="font-mono font-bold" style={{ color }}>{score}</span>
                  </div>
                  <div className="h-1 rounded-full bg-bg-hover overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1.1 + i * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Top recommendation */}
            <div className="flex items-start gap-2.5 rounded-xl bg-accent-blue/5 border border-accent-blue/20 p-3">
              <Zap className="w-3.5 h-3.5 text-accent-blue shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed text-text-secondary">
                <span className="font-semibold text-text-primary">Most impactful change: </span>
                Add your Docker and AWS deployment experience from the fintech project — both appear
                5+ times in the job description.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
