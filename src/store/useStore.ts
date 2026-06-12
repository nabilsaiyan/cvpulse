import { create } from 'zustand'
import type { AnalysisResult, AnalysisStatus } from '@/types/analysis'
import { LOCAL_STORAGE_KEYS, DEFAULT_PROVIDER } from '@/lib/constants'
import type { ProviderId } from '@/lib/constants'

interface Store {
  // Analysis state
  status: AnalysisStatus
  result: AnalysisResult | null
  error: string | null
  streamedText: string
  jobDescription: string
  cvText: string
  cvFileName: string | null
  // API key + provider (shared across all components)
  apiKey: string
  provider: ProviderId
  setJobDescription: (v: string) => void
  setCvText: (v: string) => void
  setCvFileName: (v: string | null) => void
  setStatus: (s: AnalysisStatus) => void
  setResult: (r: AnalysisResult) => void
  setError: (e: string | null) => void
  appendStreamedText: (chunk: string) => void
  setApiKey: (key: string, provider: ProviderId) => void
  clearApiKey: () => void
  reset: () => void
}

const initialAnalysisState = {
  status: 'idle' as AnalysisStatus,
  result: null,
  error: null,
  streamedText: '',
  jobDescription: '',
  cvText: '',
  cvFileName: null,
}

export const useStore = create<Store>((set) => ({
  ...initialAnalysisState,
  apiKey: '',
  provider: DEFAULT_PROVIDER,

  setJobDescription: (v) => set({ jobDescription: v }),
  setCvText: (v) => set({ cvText: v }),
  setCvFileName: (v) => set({ cvFileName: v }),
  setStatus: (s) => set({ status: s }),
  setResult: (r) => set({ result: r }),
  setError: (e) => set({ error: e }),
  appendStreamedText: (chunk) =>
    set((state) => ({ streamedText: state.streamedText + chunk })),

  setApiKey: (key, provider) => {
    const trimmed = key.trim()
    set({ apiKey: trimmed, provider })
    try {
      if (trimmed) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.API_KEY, trimmed)
        localStorage.setItem(LOCAL_STORAGE_KEYS.PROVIDER, provider)
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.API_KEY)
        localStorage.removeItem(LOCAL_STORAGE_KEYS.PROVIDER)
      }
    } catch { /* ignore */ }
  },

  clearApiKey: () => {
    set({ apiKey: '', provider: DEFAULT_PROVIDER })
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.API_KEY)
      localStorage.removeItem(LOCAL_STORAGE_KEYS.PROVIDER)
    } catch { /* ignore */ }
  },

  reset: () => set({ ...initialAnalysisState }),
}))
