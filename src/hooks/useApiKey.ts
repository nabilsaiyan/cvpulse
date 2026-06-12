'use client'

import { useEffect } from 'react'
import { useStore } from '@/store/useStore'
import { LOCAL_STORAGE_KEYS, AI_PROVIDERS, DEFAULT_PROVIDER } from '@/lib/constants'
import type { ProviderId } from '@/lib/constants'
import { maskApiKey } from '@/lib/utils'

interface UseApiKeyReturn {
  apiKey: string
  maskedKey: string
  hasKey: boolean
  provider: ProviderId
  setApiKey: (key: string, provider: ProviderId) => void
  clearApiKey: () => void
}

export function useApiKey(): UseApiKeyReturn {
  const { apiKey, provider, setApiKey, clearApiKey } = useStore()

  // Hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const storedKey = localStorage.getItem(LOCAL_STORAGE_KEYS.API_KEY)
      const storedProvider = localStorage.getItem(LOCAL_STORAGE_KEYS.PROVIDER) as ProviderId | null
      if (storedKey) {
        const resolvedProvider =
          storedProvider && storedProvider in AI_PROVIDERS
            ? storedProvider
            : DEFAULT_PROVIDER
        // Only update store if different from current (avoids unnecessary re-renders)
        if (storedKey !== apiKey || resolvedProvider !== provider) {
          setApiKey(storedKey, resolvedProvider)
        }
      }
    } catch { /* localStorage unavailable */ }
  // Run only once on mount — intentionally empty deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    apiKey,
    maskedKey: apiKey ? maskApiKey(apiKey) : '',
    hasKey: Boolean(apiKey),
    provider,
    setApiKey,
    clearApiKey,
  }
}
