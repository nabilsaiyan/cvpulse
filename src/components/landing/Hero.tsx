'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'
import { ProductMockup } from './ProductMockup'
import { ROUTES } from '@/lib/constants'

/* Deterministic particle field — stable across SSR/CSR (no Math.random) */
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  x: (i * 41 + 17) % 100,
  y: (i * 29 + 11) % 90,
  size: 1 + (i % 3),
  duration: 5 + (i % 5) * 2,
  delay: (i * 0.7) % 6,
  opacity: 0.08 + (i % 4) * 0.07,
}))

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }),
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 px-5 noise">
      {/* Aurora glow blobs */}
      <div
        className="aurora absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(59,130,246,0.16) 0%, rgba(168,85,247,0.07) 45%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Line grid, fading down */}
      <div className="absolute inset-0 bg-line-grid mask-fade-bottom pointer-events-none" />

      {/* Particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="particle absolute rounded-full bg-accent-blue pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-blue/25 bg-accent-blue/[0.06] backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-accent-blue" />
            <span className="font-mono text-xs text-accent-blue tracking-wide">
              AI-POWERED CV ANALYSIS
            </span>
            <span className="px-1.5 py-0.5 rounded-full bg-accent-green/15 text-accent-green text-[10px] font-bold">
              FREE
            </span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-7 text-[2.6rem] sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight text-text-primary"
        >
          Your CV is getting
          <br />
          <span className="gradient-text">rejected by robots.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
        >
          75% of CVs never reach a human. Paste any job description, upload your CV,
          and see exactly what the ATS sees — match score, missing keywords, and
          AI rewrites that fix it. <span className="text-text-primary font-medium">In seconds.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <Link
            href={ROUTES.ANALYZE}
            className="group inline-flex items-center gap-2 h-13 px-7 py-3.5 rounded-full text-base font-semibold
              bg-gradient-to-r from-blue-600 to-blue-500 text-white
              hover:from-blue-500 hover:to-blue-400 hover:shadow-[0_0_32px_rgba(59,130,246,0.45)]
              transition-all duration-300"
          >
            Analyze my CV — it&apos;s free
            <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 h-13 px-7 py-3.5 rounded-full text-base font-medium
              text-text-secondary border border-border hover:border-border-hover hover:text-text-primary hover:bg-bg-hover
              transition-all duration-300"
          >
            See how it works
            <ChevronDown className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Micro trust line */}
        <motion.p
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-6 text-xs text-text-muted"
        >
          No signup · No credit card · Your CV never leaves the analysis
        </motion.p>
      </div>

      {/* Product mockup — the conversion shot */}
      <div className="relative mt-16 px-1">
        <ProductMockup />
      </div>
    </section>
  )
}
