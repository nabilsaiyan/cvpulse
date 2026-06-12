'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { JobInput } from '@/components/analyzer/JobInput'
import { CVUpload } from '@/components/analyzer/CVUpload'
import { AnalyzeButton } from '@/components/analyzer/AnalyzeButton'
import { ResultPanel } from '@/components/analyzer/ResultPanel'
import { ApiKeyModal } from '@/components/analyzer/ApiKeyModal'
import { useAnalyze } from '@/hooks/useAnalyze'
import { useApiKey } from '@/hooks/useApiKey'
import { useStore } from '@/store/useStore'
import { Logo } from '@/components/ui/Logo'
import { AI_PROVIDERS, DEFAULT_PROVIDER } from '@/lib/constants'
import Link from 'next/link'

export default function AnalyzePage() {
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false)
  const { analyze, status, result, error, streamedText } = useAnalyze()
  const { hasKey, maskedKey, provider, apiKey } = useApiKey()
  const { jobDescription, cvText } = useStore()

  const activeProvider = hasKey ? provider : DEFAULT_PROVIDER
  const providerInfo = AI_PROVIDERS[activeProvider]

  const handleAnalyze = () => {
    if (!jobDescription.trim() || !cvText.trim()) {
      toast.error('Please fill in both the job description and your CV.')
      return
    }
    analyze({
      jobDescription,
      cvText,
      apiKey: apiKey || undefined,
      provider: activeProvider,
    })
  }

  return (
    <div className="relative min-h-screen bg-bg-deep">
      {/* Ambient backdrop */}
      <div
        className="absolute top-0 inset-x-0 h-[420px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 90% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 65%)',
        }}
      />

      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-bg-deep/75 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo size={24} />
          </Link>
          <button
            onClick={() => setApiKeyModalOpen(true)}
            className="flex items-center gap-1.5 px-3 h-8 rounded-full text-xs border transition-all
              text-text-secondary hover:text-text-primary hover:bg-bg-hover border-border hover:border-border-hover"
          >
            <Settings className="w-3.5 h-3.5" />
            {hasKey ? (
              <>
                <span className="font-mono">{maskedKey}</span>
                <span className="text-text-muted">·</span>
                <span>{providerInfo.label}</span>
              </>
            ) : (
              'Choose AI provider'
            )}
          </button>
        </div>
      </header>

      {/* Provider banner */}
      <div className={`relative border-b ${providerInfo.isFree ? 'border-border bg-accent-green/5' : 'border-border bg-accent-blue/5'}`}>
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs">
          <span className={providerInfo.isFree ? 'text-accent-green' : 'text-accent-blue'}>
            {providerInfo.isFree ? (
              <>
                <span className="font-semibold">Free tier</span>
                {' · '}Using {providerInfo.label}
                {!hasKey && ' · Add your own key for dedicated access'}
              </>
            ) : (
              <>
                Using <span className="font-semibold">{providerInfo.label}</span>
                {' · '}<span className="font-mono">{maskedKey}</span>
              </>
            )}
          </span>
          <button
            onClick={() => setApiKeyModalOpen(true)}
            className="flex items-center gap-1 hover:underline text-text-muted hover:text-text-secondary transition-colors"
          >
            <Sparkles className="w-3 h-3" />
            {hasKey ? 'Change provider' : 'Add your own key →'}
          </button>
        </div>
      </div>

      {/* Main layout */}
      <main className="relative max-w-7xl mx-auto px-4 py-8 pb-28 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-8 items-start">
          {/* Left: Inputs */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h1 className="text-xl font-bold text-text-primary">Analyze your CV</h1>
              <p className="text-sm text-text-secondary mt-1">
                Paste a job description and upload your CV to get an instant match score.
              </p>
            </div>
            <JobInput />
            <CVUpload />
            <div className="hidden lg:block">
              <AnalyzeButton onAnalyze={handleAnalyze} />
            </div>
          </motion.div>

          {/* Right: Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <ResultPanel
              status={status}
              result={result}
              error={error}
              streamedText={streamedText}
            />
          </motion.div>
        </div>
      </main>

      {/* Mobile sticky button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-bg-deep/90 backdrop-blur-sm border-t border-border">
        <AnalyzeButton onAnalyze={handleAnalyze} />
      </div>

      <ApiKeyModal open={apiKeyModalOpen} onClose={() => setApiKeyModalOpen(false)} />
    </div>
  )
}
