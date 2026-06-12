'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Reveal } from './Reveal'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: 'Is it really free?',
    a: 'Yes. The default Gemini model has a generous free tier. For unlimited use, plug in your own free Google AI Studio key — no credit card required — or bring a Claude / OpenAI key.',
  },
  {
    q: 'Is my CV stored anywhere?',
    a: 'No. Your CV is processed in memory for the duration of the analysis and never written to a database. API keys live in your browser’s localStorage only.',
  },
  {
    q: 'What is an ATS score?',
    a: 'Applicant Tracking Systems are software that screen CVs before a human sees them — roughly 75% of large companies use one. The ATS score estimates how well your CV survives that automated filter: keyword coverage, structure, and parseability.',
  },
  {
    q: 'Which AI models can I use?',
    a: 'Gemini 2.5 Flash is the default (free). You can switch to Claude Sonnet or GPT-4o mini by adding your own API key in the provider settings.',
  },
  {
    q: 'How accurate is the analysis?',
    a: 'The analysis uses frontier AI models prompted as an experienced technical recruiter. It’s a strong signal — especially for keyword gaps, which are deterministic — but treat the qualitative feedback as expert advice, not gospel.',
  },
] as const

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-base font-medium text-text-primary group-hover:text-accent-blue transition-colors">
          {q}
        </span>
        <Plus
          className={cn(
            'w-4.5 h-4.5 text-text-muted shrink-0 transition-transform duration-300',
            open && 'rotate-45 text-accent-blue'
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-text-secondary leading-relaxed max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  return (
    <section id="faq" className="relative py-28 px-5">
      <div className="max-w-2xl mx-auto">
        <Reveal className="text-center mb-12">
          <p className="font-mono text-xs text-accent-blue tracking-[0.2em] mb-4">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Questions, answered.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="border-t border-border">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} {...faq} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
