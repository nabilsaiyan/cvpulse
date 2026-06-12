export const ROUTES = {
  HOME: '/',
  ANALYZE: '/analyze',
} as const

export const API_ROUTES = {
  ANALYZE: '/api/analyze',
} as const

export const LOCAL_STORAGE_KEYS = {
  API_KEY: 'resumeiq_api_key',
  PROVIDER: 'resumeiq_provider',
} as const

export const ENV = {
  ANTHROPIC_API_KEY: 'ANTHROPIC_API_KEY',
  GOOGLE_AI_API_KEY: 'GOOGLE_AI_API_KEY',
  OPENAI_API_KEY: 'OPENAI_API_KEY',
} as const

// Models
export const CLAUDE_MODEL = 'claude-sonnet-4-6' as const
export const GEMINI_MODEL = 'gemini-2.5-flash' as const
export const OPENAI_MODEL = 'gpt-4o-mini' as const

export const AI_PROVIDERS = {
  gemini: {
    id: 'gemini',
    label: 'Gemini 2.0 Flash',
    description: 'Free · No credit card · Google AI Studio',
    keyPlaceholder: 'AIza...',
    keyUrl: 'https://aistudio.google.com/apikey',
    keyLabel: 'Get a free key at aistudio.google.com',
    isFree: true,
  },
  claude: {
    id: 'claude',
    label: 'Claude Sonnet',
    description: 'Anthropic · $5 min credit',
    keyPlaceholder: 'sk-ant-api03-…',
    keyUrl: 'https://console.anthropic.com/account/keys',
    keyLabel: 'Get key at console.anthropic.com',
    isFree: false,
  },
  openai: {
    id: 'openai',
    label: 'GPT-4o mini',
    description: 'OpenAI · $5 min credit',
    keyPlaceholder: 'sk-proj-…',
    keyUrl: 'https://platform.openai.com/api-keys',
    keyLabel: 'Get key at platform.openai.com',
    isFree: false,
  },
} as const

export type ProviderId = keyof typeof AI_PROVIDERS

export const DEFAULT_PROVIDER: ProviderId = 'gemini'

export const VALIDATION = {
  JOB_DESCRIPTION_MIN: 100,
  CV_TEXT_MIN: 200,
  FILE_SIZE_MAX: 5 * 1024 * 1024, // 5MB
  ACCEPTED_FILE_TYPES: ['application/pdf'] as const,
} as const

export const SCORE_COLORS = {
  red: { min: 0, max: 39, class: 'text-accent-red', stroke: '#ef4444' },
  amber: { min: 40, max: 59, class: 'text-accent-amber', stroke: '#f59e0b' },
  blue: { min: 60, max: 79, class: 'text-accent-blue', stroke: '#3b82f6' },
  green: { min: 80, max: 100, class: 'text-accent-green', stroke: '#22c55e' },
} as const

export const SECTION_LABELS = {
  summary: 'Summary',
  experience: 'Experience',
  skills: 'Skills',
  education: 'Education',
} as const

export const STAGGER_DELAYS = {
  SECTION_CARD: 80,
  KEYWORD_CHIP: 40,
} as const

export const ANIMATION_DURATIONS = {
  SCORE_RING: 1000,
  SCORE_COUNT: 900,
  PROGRESS_BAR: 700,
  PAGE_ENTER: 300,
} as const

export const APP_NAME = 'ResumeIQ' as const
export const APP_TAGLINE = "Know exactly why you're not getting interviews." as const
export const APP_DESCRIPTION = 'Paste a job description, upload your CV — get a match score, missing keywords, and actionable rewrites in seconds.' as const
export const AUTHOR_URL = 'https://nabilamhaouch.dev' as const
