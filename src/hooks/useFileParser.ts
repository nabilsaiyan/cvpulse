'use client'

import { useCallback } from 'react'
import { VALIDATION } from '@/lib/constants'
import { formatFileSize } from '@/lib/utils'

interface FileValidationResult {
  valid: boolean
  error?: string
}

interface UseFileParserReturn {
  validateFile: (file: File) => FileValidationResult
}

export function useFileParser(): UseFileParserReturn {
  const validateFile = useCallback((file: File): FileValidationResult => {
    if (!VALIDATION.ACCEPTED_FILE_TYPES.includes(file.type as 'application/pdf')) {
      return { valid: false, error: 'Only PDF files are accepted.' }
    }
    if (file.size > VALIDATION.FILE_SIZE_MAX) {
      return {
        valid: false,
        error: `File is too large (${formatFileSize(file.size)}). Maximum size is 5 MB.`,
      }
    }
    return { valid: true }
  }, [])

  return { validateFile }
}
