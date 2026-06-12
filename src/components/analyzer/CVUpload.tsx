'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X, AlertCircle } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { useFileParser } from '@/hooks/useFileParser'
import { VALIDATION } from '@/lib/constants'
import { cn } from '@/lib/utils'

type Tab = 'upload' | 'paste'

export function CVUpload() {
  const [tab, setTab] = useState<Tab>('upload')
  const [fileError, setFileError] = useState<string | null>(null)
  const [isExtracting, setIsExtracting] = useState(false)

  const { cvText, cvFileName, setCvText, setCvFileName, setStatus } = useStore()
  const { validateFile } = useFileParser()

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFileError(null)
      const file = acceptedFiles[0]
      if (!file) return

      const validation = validateFile(file)
      if (!validation.valid) {
        setFileError(validation.error ?? 'Invalid file')
        return
      }

      setIsExtracting(true)
      setStatus('extracting')
      try {
        const formData = new FormData()
        formData.append('file', file)

        const res = await fetch('/api/extract-pdf', {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          const data = await res.json().catch(() => ({ error: 'Extraction failed' }))
          throw new Error((data as { error?: string }).error ?? 'Failed to extract PDF text')
        }

        const { text } = await res.json() as { text: string }
        setCvText(text)
        setCvFileName(file.name)
        setStatus('idle')
      } catch (err) {
        setFileError(err instanceof Error ? err.message : 'Failed to process PDF')
        setStatus('idle')
      } finally {
        setIsExtracting(false)
      }
    },
    [validateFile, setCvText, setCvFileName, setStatus]
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: VALIDATION.FILE_SIZE_MAX,
    multiple: false,
    onDropRejected: (rejections) => {
      const err = rejections[0]?.errors[0]
      if (err?.code === 'file-too-large') {
        setFileError('File is too large. Maximum size is 5 MB.')
      } else if (err?.code === 'file-invalid-type') {
        setFileError('Only PDF files are accepted.')
      } else {
        setFileError('Could not accept this file.')
      }
    },
  })

  const removeFile = useCallback(() => {
    setCvText('')
    setCvFileName(null)
    setFileError(null)
  }, [setCvText, setCvFileName])

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-text-primary">Your CV</label>
        <div className="flex rounded-lg border border-border overflow-hidden text-xs">
          {(['upload', 'paste'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'px-3 py-1.5 capitalize transition-colors',
                tab === t
                  ? 'bg-accent-blue text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
              )}
            >
              {t === 'upload' ? 'Upload PDF' : 'Paste Text'}
            </button>
          ))}
        </div>
      </div>

      {tab === 'upload' ? (
        <div>
          {cvFileName ? (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-bg-card border border-accent-green/30">
              <FileText className="w-8 h-8 text-accent-green shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{cvFileName}</p>
                <p className="text-xs text-text-muted">PDF extracted successfully</p>
              </div>
              <button
                onClick={removeFile}
                className="p-1 rounded-md text-text-muted hover:text-accent-red hover:bg-accent-red/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={cn(
                'flex flex-col items-center justify-center gap-3 p-8 rounded-xl',
                'border-2 border-dashed transition-all duration-200 cursor-pointer',
                'focus:outline-none',
                isDragActive && !isDragReject
                  ? 'border-accent-blue bg-accent-blue/5 scale-[1.01]'
                  : isDragReject
                  ? 'border-accent-red bg-accent-red/5'
                  : 'border-border hover:border-border-hover hover:bg-bg-hover'
              )}
            >
              <input {...getInputProps()} />
              {isExtracting ? (
                <>
                  <div className="w-10 h-10 rounded-full border-2 border-accent-blue border-t-transparent animate-spin" />
                  <p className="text-sm text-text-secondary">Extracting PDF text…</p>
                </>
              ) : (
                <>
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                      isDragActive ? 'bg-accent-blue/20' : 'bg-bg-hover'
                    )}
                  >
                    <Upload
                      className={cn(
                        'w-6 h-6 transition-colors',
                        isDragActive ? 'text-accent-blue' : 'text-text-muted'
                      )}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-text-primary">
                      {isDragActive ? 'Drop your PDF here' : 'Drag & drop your CV'}
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      PDF only · max 5 MB · or{' '}
                      <span className="text-accent-blue underline">browse</span>
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
          {fileError && (
            <div className="flex items-center gap-2 mt-2 text-xs text-accent-red">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {fileError}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <textarea
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            rows={10}
            placeholder="Paste your CV text here…"
            className={cn(
              'w-full resize-y rounded-xl bg-bg-card border border-border px-4 py-3',
              'text-sm text-text-primary placeholder:text-text-muted',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-border-strong'
            )}
          />
          <p className="text-xs text-text-muted">
            {cvText.length.toLocaleString()} characters
            {cvText.length > 0 && cvText.length < VALIDATION.CV_TEXT_MIN && (
              <span className="text-accent-amber">
                {' '}· need {VALIDATION.CV_TEXT_MIN - cvText.length} more
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  )
}
