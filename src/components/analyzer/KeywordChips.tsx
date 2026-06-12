'use client'

import { motion } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Tooltip } from '@/components/ui/Tooltip'
import { STAGGER_DELAYS } from '@/lib/constants'

interface KeywordChipsProps {
  found: string[]
  missing: string[]
}

export function KeywordChips({ found, missing }: KeywordChipsProps) {
  return (
    <div className="space-y-4">
      {found.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <CheckCircle className="w-3.5 h-3.5 text-accent-green" />
            <span className="text-xs font-medium text-text-secondary uppercase tracking-wide">
              Found Keywords
            </span>
            <span className="ml-auto text-xs text-text-muted">{found.length}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {found.map((kw, i) => (
              <motion.div
                key={kw}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * (STAGGER_DELAYS.KEYWORD_CHIP / 1000) }}
              >
                <Badge variant="green">{kw}</Badge>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      {missing.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <XCircle className="w-3.5 h-3.5 text-accent-red" />
            <span className="text-xs font-medium text-text-secondary uppercase tracking-wide">
              Missing Keywords
            </span>
            <span className="ml-auto text-xs text-text-muted">{missing.length}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {missing.map((kw, i) => (
              <motion.div
                key={kw}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: (found.length + i) * (STAGGER_DELAYS.KEYWORD_CHIP / 1000),
                }}
              >
                <Tooltip content="Add this to your skills or experience section">
                  <Badge variant="red" className="cursor-help">{kw}</Badge>
                </Tooltip>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
