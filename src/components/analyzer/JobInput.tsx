'use client'

import { useStore } from '@/store/useStore'
import { VALIDATION } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function JobInput() {
  const { jobDescription, setJobDescription } = useStore()
  const charCount = jobDescription.length
  const isValid = charCount >= VALIDATION.JOB_DESCRIPTION_MIN
  const isTooShort = charCount > 0 && !isValid

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-text-primary">
          Job Description
        </label>
        <span
          className={cn(
            'text-xs tabular-nums font-mono',
            isTooShort ? 'text-accent-amber' : 'text-text-muted'
          )}
        >
          {charCount.toLocaleString()} chars
          {isTooShort && ` · need ${VALIDATION.JOB_DESCRIPTION_MIN - charCount} more`}
        </span>
      </div>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={8}
        placeholder="Paste the full job description here…"
        className={cn(
          'w-full resize-y rounded-xl bg-bg-card border px-4 py-3',
          'text-sm text-text-primary placeholder:text-text-muted',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-accent-blue/50',
          isTooShort
            ? 'border-accent-amber/40 focus:ring-accent-amber/30'
            : 'border-border focus:border-border-strong'
        )}
      />
      {isTooShort && (
        <p className="text-xs text-accent-amber">
          Minimum {VALIDATION.JOB_DESCRIPTION_MIN} characters for accurate analysis.
        </p>
      )}
    </div>
  )
}
