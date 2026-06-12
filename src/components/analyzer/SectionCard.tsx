'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { cn } from '@/lib/utils'
import { getScoreColor } from '@/lib/utils'
import type { SectionAnalysis } from '@/types/analysis'

interface SectionCardProps {
  label: string
  section: SectionAnalysis
  index: number
}

export function SectionCard({ label, section, index }: SectionCardProps) {
  const [rewriteOpen, setRewriteOpen] = useState(false)
  const { class: colorClass } = getScoreColor(section.score)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: 'easeOut' }}
    >
      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-text-primary">{label}</span>
          <span className={cn('font-mono text-sm font-bold', colorClass)}>
            {section.score}
          </span>
        </div>
        <ProgressBar value={section.score} colorByScore delay={index * 80} />
        <p className="text-sm text-text-secondary leading-relaxed">{section.feedback}</p>

        {section.rewrite && (
          <div>
            <button
              onClick={() => setRewriteOpen((v) => !v)}
              className="flex items-center gap-1.5 text-xs text-accent-blue hover:text-blue-400 transition-colors focus-visible:outline-none"
            >
              {rewriteOpen ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
              {rewriteOpen ? 'Hide' : 'See'} suggested rewrite
            </button>
            {rewriteOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 p-3 rounded-lg bg-accent-blue/5 border border-accent-blue/15 text-sm text-text-secondary leading-relaxed"
              >
                {section.rewrite}
              </motion.div>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  )
}
