import type { ProviderId } from '@/lib/constants'

export interface SectionAnalysis {
  score: number
  feedback: string
  rewrite?: string
}

export interface AnalysisResult {
  overallScore: number
  atsScore: number
  keywordsFound: string[]
  keywordsMissing: string[]
  strengths: string[]
  improvements: string[]
  sections: {
    summary: SectionAnalysis
    experience: SectionAnalysis
    skills: SectionAnalysis
    education: SectionAnalysis
  }
  topRecommendation: string
  estimatedInterviewChance: 'low' | 'moderate' | 'high' | 'very high'
}

export interface AnalyzePayload {
  jobDescription: string
  cvText: string
  apiKey?: string
  provider?: ProviderId
}

export type AnalysisStatus = 'idle' | 'extracting' | 'analyzing' | 'complete' | 'error'
