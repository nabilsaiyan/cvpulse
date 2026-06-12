'use client'

import { useState } from 'react'
import { Eye, EyeOff, ExternalLink, Trash2, CheckCircle } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { GeminiIcon, ClaudeIcon, OpenAIIcon } from '@/components/ui/BrandIcons'
import { useApiKey } from '@/hooks/useApiKey'
import { AI_PROVIDERS, DEFAULT_PROVIDER } from '@/lib/constants'
import type { ProviderId } from '@/lib/constants'
import { cn } from '@/lib/utils'

const PROVIDER_ICONS: Record<ProviderId, React.ComponentType<{ className?: string }>> = {
  gemini: GeminiIcon,
  claude: ClaudeIcon,
  openai: OpenAIIcon,
}

interface ApiKeyModalProps {
  open: boolean
  onClose: () => void
}

export function ApiKeyModal({ open, onClose }: ApiKeyModalProps) {
  const { maskedKey, hasKey, provider: savedProvider, setApiKey, clearApiKey } = useApiKey()
  const [selectedProvider, setSelectedProvider] = useState<ProviderId>(savedProvider)
  const [inputValue, setInputValue] = useState('')
  const [showKey, setShowKey] = useState(false)

  const currentProviderInfo = AI_PROVIDERS[selectedProvider]

  const handleSave = () => {
    if (inputValue.trim()) {
      setApiKey(inputValue.trim(), selectedProvider)
      setInputValue('')
      onClose()
    }
  }

  const handleClear = () => {
    clearApiKey()
    setInputValue('')
    setSelectedProvider(DEFAULT_PROVIDER)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Choose AI provider">
      <div className="p-6 space-y-5">
        {/* Provider selection */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">Provider</p>
          <div className="grid grid-cols-1 gap-2">
            {(Object.values(AI_PROVIDERS) as typeof AI_PROVIDERS[ProviderId][]).map((p) => {
              const isSelected = selectedProvider === p.id
              const isActive = hasKey && savedProvider === p.id
              const ProviderIcon = PROVIDER_ICONS[p.id as ProviderId]
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProvider(p.id as ProviderId)}
                  className={cn(
                    'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg border text-left transition-all',
                    isSelected
                      ? 'border-accent-blue bg-accent-blue/10'
                      : 'border-border hover:border-border-hover hover:bg-bg-hover'
                  )}
                >
                  <div className={cn(
                    'w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0',
                    isSelected ? 'border-accent-blue' : 'border-text-muted'
                  )}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-accent-blue" />}
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-bg-deep border border-border flex items-center justify-center shrink-0">
                    <ProviderIcon className="w-4.5 h-4.5 text-text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-text-primary">{p.label}</span>
                      {p.isFree && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-accent-green/15 text-accent-green border border-accent-green/20">
                          FREE
                        </span>
                      )}
                      {isActive && (
                        <CheckCircle className="w-3.5 h-3.5 text-accent-green ml-auto" />
                      )}
                    </div>
                    <p className="text-xs text-text-muted">{p.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Active key indicator */}
        {hasKey && savedProvider === selectedProvider && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-accent-green/5 border border-accent-green/20">
            <div className="w-2 h-2 rounded-full bg-accent-green shrink-0" />
            <span className="text-sm text-text-secondary font-mono">{maskedKey}</span>
            <span className="ml-auto text-xs text-accent-green">Active</span>
          </div>
        )}

        {/* Key input */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-text-secondary">
            {AI_PROVIDERS[selectedProvider].isFree
              ? 'Your free API key'
              : hasKey && savedProvider === selectedProvider
              ? 'Replace API key'
              : 'API key'}
          </label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              placeholder={currentProviderInfo.keyPlaceholder}
              autoComplete="off"
              className={cn(
                'w-full h-10 rounded-lg bg-bg-card border border-border',
                'px-3 pr-10 text-sm text-text-primary placeholder:text-text-muted font-mono',
                'focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-border-strong',
                'transition-colors'
              )}
            />
            <button
              type="button"
              onClick={() => setShowKey((v) => !v)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-text-muted">
            Stored only in your browser — never sent to our servers.
          </p>
        </div>

        <a
          href={currentProviderInfo.keyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-accent-blue hover:text-blue-400 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          {currentProviderInfo.keyLabel}
        </a>

        <div className="flex gap-2 pt-1">
          <Button
            onClick={handleSave}
            disabled={!inputValue.trim()}
            className="flex-1"
          >
            Save key
          </Button>
          {hasKey && (
            <Button variant="danger" onClick={handleClear} className="gap-1.5">
              <Trash2 className="w-4 h-4" />
              Clear
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}
