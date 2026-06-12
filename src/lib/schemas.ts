import { z } from 'zod'

export const AnalyzePayloadSchema = z.object({
  jobDescription: z.string().min(100, 'Job description must be at least 100 characters'),
  cvText: z.string().min(200, 'CV text must be at least 200 characters'),
  apiKey: z.string().optional(),
  provider: z.enum(['gemini', 'claude', 'openai']).optional(),
})

const SectionAnalysisSchema = z.object({
  score: z.number().int().min(0).max(100),
  feedback: z.string().min(1),
  rewrite: z.string().optional(),
})

export const AnalysisResultSchema = z.object({
  overallScore: z.number().int().min(0).max(100),
  atsScore: z.number().int().min(0).max(100),
  keywordsFound: z.array(z.string()),
  keywordsMissing: z.array(z.string()),
  strengths: z.array(z.string()).min(1),
  improvements: z.array(z.string()).min(1),
  sections: z.object({
    summary: SectionAnalysisSchema,
    experience: SectionAnalysisSchema,
    skills: SectionAnalysisSchema,
    education: SectionAnalysisSchema,
  }),
  topRecommendation: z.string().min(1),
  estimatedInterviewChance: z.enum(['low', 'moderate', 'high', 'very high']),
})
