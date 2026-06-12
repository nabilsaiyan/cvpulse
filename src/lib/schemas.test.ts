import { describe, it, expect } from 'vitest'
import { AnalyzePayloadSchema, AnalysisResultSchema } from './schemas'

const validSection = { score: 70, feedback: 'Solid section.' }

const validResult = {
  overallScore: 74,
  atsScore: 81,
  keywordsFound: ['React', 'TypeScript'],
  keywordsMissing: ['GraphQL'],
  strengths: ['Strong technical match'],
  improvements: ['Add cloud experience'],
  sections: {
    summary: { ...validSection, rewrite: 'Improved summary.' },
    experience: validSection,
    skills: validSection,
    education: validSection,
  },
  topRecommendation: 'Add AWS to your skills section.',
  estimatedInterviewChance: 'high',
}

describe('AnalyzePayloadSchema', () => {
  const valid = {
    jobDescription: 'x'.repeat(100),
    cvText: 'y'.repeat(200),
  }

  it('accepts a valid payload', () => {
    expect(AnalyzePayloadSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects a job description under 100 chars', () => {
    const result = AnalyzePayloadSchema.safeParse({ ...valid, jobDescription: 'too short' })
    expect(result.success).toBe(false)
  })

  it('rejects CV text under 200 chars', () => {
    const result = AnalyzePayloadSchema.safeParse({ ...valid, cvText: 'too short' })
    expect(result.success).toBe(false)
  })

  it('accepts an optional provider', () => {
    expect(AnalyzePayloadSchema.safeParse({ ...valid, provider: 'gemini' }).success).toBe(true)
  })

  it('rejects an unknown provider', () => {
    expect(AnalyzePayloadSchema.safeParse({ ...valid, provider: 'mistral' }).success).toBe(false)
  })
})

describe('AnalysisResultSchema', () => {
  it('accepts a valid result', () => {
    expect(AnalysisResultSchema.safeParse(validResult).success).toBe(true)
  })

  it('rejects scores above 100', () => {
    const result = AnalysisResultSchema.safeParse({ ...validResult, overallScore: 101 })
    expect(result.success).toBe(false)
  })

  it('rejects non-integer scores', () => {
    const result = AnalysisResultSchema.safeParse({ ...validResult, atsScore: 81.5 })
    expect(result.success).toBe(false)
  })

  it('rejects an invalid interview chance', () => {
    const result = AnalysisResultSchema.safeParse({
      ...validResult,
      estimatedInterviewChance: 'guaranteed',
    })
    expect(result.success).toBe(false)
  })

  it('rejects empty strengths', () => {
    const result = AnalysisResultSchema.safeParse({ ...validResult, strengths: [] })
    expect(result.success).toBe(false)
  })

  it('allows sections without a rewrite', () => {
    expect(AnalysisResultSchema.safeParse(validResult).success).toBe(true)
  })
})
