'use client'

import { Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useStore } from '@/store/useStore'
import { VALIDATION } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface AnalyzeButtonProps {
  onAnalyze: () => void
  className?: string
}

export function AnalyzeButton({ onAnalyze, className }: AnalyzeButtonProps) {
  const { status, jobDescription, cvText } = useStore()

  const isAnalyzing = status === 'analyzing'
  const isExtracting = status === 'extracting'
  const isBusy = isAnalyzing || isExtracting

  const isValid =
    jobDescription.length >= VALIDATION.JOB_DESCRIPTION_MIN &&
    cvText.length >= VALIDATION.CV_TEXT_MIN

  const label = isExtracting
    ? 'Extracting PDF…'
    : isAnalyzing
    ? 'Analyzing with Claude…'
    : 'Analyze CV →'

  return (
    <Button
      onClick={onAnalyze}
      disabled={!isValid || isBusy}
      className={cn('w-full h-12 text-base gap-2', className)}
    >
      {isBusy ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Sparkles className="w-5 h-5" />
      )}
      {label}
    </Button>
  )
}
