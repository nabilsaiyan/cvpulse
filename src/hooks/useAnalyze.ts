'use client'

import { useCallback, useRef } from 'react'
import { useStore } from '@/store/useStore'
import { AnalysisResultSchema } from '@/lib/schemas'
import { extractJsonFromStream } from '@/lib/utils'
import { API_ROUTES } from '@/lib/constants'
import type { AnalyzePayload, AnalysisResult, AnalysisStatus } from '@/types/analysis'

interface UseAnalyzeReturn {
  analyze: (payload: AnalyzePayload) => Promise<void>
  abort: () => void
  status: AnalysisStatus
  result: AnalysisResult | null
  error: string | null
  streamedText: string
  reset: () => void
}

export function useAnalyze(): UseAnalyzeReturn {
  const {
    status,
    result,
    error,
    streamedText,
    setStatus,
    setResult,
    setError,
    appendStreamedText,
    reset,
  } = useStore()

  const abortRef = useRef<AbortController | null>(null)

  const abort = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  const analyze = useCallback(
    async (payload: AnalyzePayload) => {
      // Cancel any in-flight request
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      // Reset to clean slate before starting
      reset()
      setStatus('analyzing')

      try {
        const response = await fetch(API_ROUTES.ANALYZE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        })

        if (!response.ok) {
          const data = await response.json().catch(() => ({ error: 'Request failed' }))
          throw new Error(
            (data as { error?: string }).error ?? `HTTP ${response.status}`
          )
        }

        if (!response.body) {
          throw new Error('Response body is empty')
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let accumulated = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })

          // Check for server-side error marker
          if (chunk.includes('__ERROR__:')) {
            const errorMessage = chunk.split('__ERROR__:')[1]?.trim()
            throw new Error(errorMessage ?? 'Server error during streaming')
          }

          accumulated += chunk
          appendStreamedText(chunk)
        }

        // Parse and validate the complete JSON response
        const jsonString = extractJsonFromStream(accumulated)
        let parsed: unknown
        try {
          parsed = JSON.parse(jsonString)
        } catch {
          throw new Error('Invalid JSON in response. Please try again.')
        }

        const validated = AnalysisResultSchema.safeParse(parsed)
        if (!validated.success) {
          console.error('[useAnalyze] Validation error:', validated.error.flatten())
          throw new Error('Response format was unexpected. Please try again.')
        }

        setResult(validated.data)
        setStatus('complete')
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          // User-initiated cancel — reset silently
          reset()
          return
        }
        const message = err instanceof Error ? err.message : 'An unexpected error occurred'
        setError(message)
        setStatus('error')
      }
    },
    [reset, setStatus, setResult, setError, appendStreamedText]
  )

  return { analyze, abort, status, result, error, streamedText, reset }
}
