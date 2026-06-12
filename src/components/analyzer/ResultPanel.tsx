'use client'

import { motion } from 'framer-motion'
import { Zap, CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react'
import { ScoreRing } from './ScoreRing'
import { KeywordChips } from './KeywordChips'
import { SectionCard } from './SectionCard'
import { StreamingText } from './StreamingText'
import { ResultSkeleton } from '@/components/ui/Skeleton'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { SECTION_LABELS } from '@/lib/constants'
import type { AnalysisResult } from '@/types/analysis'
import type { AnalysisStatus } from '@/types/analysis'

type BadgeVariant = 'green' | 'red' | 'amber' | 'blue' | 'default'

const chanceVariant: Record<AnalysisResult['estimatedInterviewChance'], BadgeVariant> = {
  low: 'red',
  moderate: 'amber',
  high: 'blue',
  'very high': 'green',
}

const chanceLabelMap: Record<AnalysisResult['estimatedInterviewChance'], string> = {
  low: 'Low interview chance',
  moderate: 'Moderate interview chance',
  high: 'High interview chance',
  'very high': 'Very high interview chance',
}

interface ResultPanelProps {
  status: AnalysisStatus
  result: AnalysisResult | null
  error: string | null
  streamedText: string
}

export function ResultPanel({ status, result, error, streamedText }: ResultPanelProps) {
  if (status === 'idle') {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center gap-4">
        <EmptyStateIllustration />
        <div>
          <p className="text-text-secondary text-sm">Your analysis will appear here</p>
          <p className="text-text-muted text-xs mt-1">
            Fill in the job description and upload your CV to get started
          </p>
        </div>
      </div>
    )
  }

  if (status === 'error' && error) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-4 text-center">
        <div className="w-12 h-12 rounded-full bg-accent-red/10 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-accent-red" />
        </div>
        <div>
          <p className="text-text-primary font-medium">Analysis failed</p>
          <p className="text-text-secondary text-sm mt-1 max-w-sm">{error}</p>
        </div>
      </div>
    )
  }

  if ((status === 'analyzing' || status === 'extracting') && !result) {
    return (
      <div className="space-y-4">
        {streamedText ? (
          <StreamingText text={streamedText} />
        ) : (
          <ResultSkeleton />
        )}
      </div>
    )
  }

  if (!result) return null

  const sectionEntries = [
    ['summary', result.sections.summary],
    ['experience', result.sections.experience],
    ['skills', result.sections.skills],
    ['education', result.sections.education],
  ] as const

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Score row */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <ScoreRing score={result.overallScore} label="Overall Match" size="lg" />
          <ScoreRing score={result.atsScore} label="ATS Score" size="sm" delay={200} />
          <div className="flex flex-col items-center gap-2">
            <Badge
              variant={chanceVariant[result.estimatedInterviewChance]}
              className="text-sm px-4 py-2 rounded-full"
            >
              {chanceLabelMap[result.estimatedInterviewChance]}
            </Badge>
            <span className="text-xs text-text-muted">Interview probability</span>
          </div>
        </div>
      </Card>

      {/* Keywords */}
      <Card className="p-5">
        <KeywordChips
          found={result.keywordsFound}
          missing={result.keywordsMissing}
        />
      </Card>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-accent-green" />
            Strengths
          </h3>
          <ul className="space-y-2">
            {result.strengths.map((s, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2 text-sm text-text-secondary"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <CheckCircle className="w-3.5 h-3.5 text-accent-green shrink-0 mt-0.5" />
                {s}
              </motion.li>
            ))}
          </ul>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-accent-amber" />
            Improvements
          </h3>
          <ul className="space-y-2">
            {result.improvements.map((imp, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2 text-sm text-text-secondary"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <ArrowRight className="w-3.5 h-3.5 text-accent-amber shrink-0 mt-0.5" />
                {imp}
              </motion.li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Section cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
          Section Scores
        </h3>
        {sectionEntries.map(([key, section], i) => (
          <SectionCard
            key={key}
            label={SECTION_LABELS[key]}
            section={section}
            index={i}
          />
        ))}
      </div>

      {/* Top recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-5 border-accent-blue/20 bg-accent-blue/5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-accent-blue" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary mb-1">
                Most impactful change
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                {result.topRecommendation}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

function EmptyStateIllustration() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="20" fill="rgba(59,130,246,0.05)" />
      <rect x="20" y="22" width="40" height="4" rx="2" fill="rgba(59,130,246,0.15)" />
      <rect x="20" y="32" width="32" height="3" rx="1.5" fill="rgba(59,130,246,0.1)" />
      <rect x="20" y="41" width="36" height="3" rx="1.5" fill="rgba(59,130,246,0.1)" />
      <rect x="20" y="50" width="28" height="3" rx="1.5" fill="rgba(59,130,246,0.1)" />
      <circle cx="56" cy="55" r="12" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" strokeWidth="1.5" />
      <path d="M52 55 L55 58 L60 52" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
