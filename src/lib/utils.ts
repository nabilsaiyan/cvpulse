import { SCORE_COLORS } from './constants'

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function getScoreColor(score: number): { class: string; stroke: string } {
  if (score >= SCORE_COLORS.green.min) return { class: SCORE_COLORS.green.class, stroke: SCORE_COLORS.green.stroke }
  if (score >= SCORE_COLORS.blue.min) return { class: SCORE_COLORS.blue.class, stroke: SCORE_COLORS.blue.stroke }
  if (score >= SCORE_COLORS.amber.min) return { class: SCORE_COLORS.amber.class, stroke: SCORE_COLORS.amber.stroke }
  return { class: SCORE_COLORS.red.class, stroke: SCORE_COLORS.red.stroke }
}

export function maskApiKey(key: string): string {
  if (key.length < 12) return '••••••••'
  return `${key.slice(0, 7)}...${key.slice(-4)}`
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function extractJsonFromStream(text: string): string {
  const cleaned = text.trim()
  const jsonMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
  if (jsonMatch) return jsonMatch[1]
  return cleaned
}
