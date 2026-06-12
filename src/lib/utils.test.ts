import { describe, it, expect } from 'vitest'
import { cn, getScoreColor, maskApiKey, formatFileSize, extractJsonFromStream } from './utils'

describe('cn', () => {
  it('joins truthy class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('filters out falsy values', () => {
    expect(cn('a', false, undefined, null, 'b')).toBe('a b')
  })
})

describe('getScoreColor', () => {
  it('returns red below 40', () => {
    expect(getScoreColor(0).stroke).toBe('#ef4444')
    expect(getScoreColor(39).stroke).toBe('#ef4444')
  })

  it('returns amber for 40-59', () => {
    expect(getScoreColor(40).stroke).toBe('#f59e0b')
    expect(getScoreColor(59).stroke).toBe('#f59e0b')
  })

  it('returns blue for 60-79', () => {
    expect(getScoreColor(60).stroke).toBe('#3b82f6')
    expect(getScoreColor(79).stroke).toBe('#3b82f6')
  })

  it('returns green for 80 and above', () => {
    expect(getScoreColor(80).stroke).toBe('#22c55e')
    expect(getScoreColor(100).stroke).toBe('#22c55e')
  })
})

describe('maskApiKey', () => {
  it('masks the middle of a long key', () => {
    expect(maskApiKey('sk-ant-api03-abcdefgh1234')).toBe('sk-ant-...1234')
  })

  it('fully masks short keys', () => {
    expect(maskApiKey('short')).toBe('••••••••')
  })
})

describe('formatFileSize', () => {
  it('formats bytes', () => {
    expect(formatFileSize(512)).toBe('512 B')
  })

  it('formats kilobytes', () => {
    expect(formatFileSize(2048)).toBe('2.0 KB')
  })

  it('formats megabytes', () => {
    expect(formatFileSize(5 * 1024 * 1024)).toBe('5.0 MB')
  })
})

describe('extractJsonFromStream', () => {
  it('returns raw JSON untouched', () => {
    expect(extractJsonFromStream('{"a":1}')).toBe('{"a":1}')
  })

  it('strips markdown code fences', () => {
    expect(extractJsonFromStream('```json\n{"a":1}\n```')).toBe('{"a":1}')
  })

  it('strips bare code fences', () => {
    expect(extractJsonFromStream('```\n{"a":1}\n```')).toBe('{"a":1}')
  })

  it('trims surrounding whitespace', () => {
    expect(extractJsonFromStream('  {"a":1}  ')).toBe('{"a":1}')
  })
})
