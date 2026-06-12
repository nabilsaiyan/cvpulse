'use client'

import { ClipboardPaste, FileUp, Target } from 'lucide-react'
import { Reveal } from './Reveal'

const STEPS = [
  {
    icon: ClipboardPaste,
    step: '01',
    title: 'Paste the job description',
    description:
      'Copy the full posting — requirements, responsibilities, qualifications. More detail means a sharper analysis.',
  },
  {
    icon: FileUp,
    step: '02',
    title: 'Drop in your CV',
    description:
      'Upload the PDF or paste the text. We extract every section server-side — nothing is stored.',
  },
  {
    icon: Target,
    step: '03',
    title: 'Get your fix list',
    description:
      'ATS score, keyword gaps, per-section feedback, and a rewritten summary — streamed live as the AI works.',
  },
] as const

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 px-5">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="font-mono text-xs text-accent-blue tracking-[0.2em] mb-4">HOW IT WORKS</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            From rejection to interview
            <br />
            <span className="text-text-muted">in three steps.</span>
          </h2>
        </Reveal>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-[4.5rem] left-[18%] right-[18%] h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />

          {STEPS.map(({ icon: Icon, step, title, description }, i) => (
            <Reveal key={step} delay={i * 0.12}>
              <div className="group relative h-full rounded-2xl bg-bg-card border border-border p-7
                hover:border-border-hover hover:bg-bg-hover hover:-translate-y-1 transition-all duration-300">
                <span className="absolute top-5 right-6 font-mono text-xs text-text-muted/60">{step}</span>
                <div className="w-14 h-14 rounded-2xl bg-accent-blue/10 border border-accent-blue/20
                  flex items-center justify-center mb-5 group-hover:scale-110 group-hover:glow-blue-sm transition-all duration-300">
                  <Icon className="w-6.5 h-6.5 text-accent-blue" />
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-2.5">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
