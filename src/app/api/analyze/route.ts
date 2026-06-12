import { NextRequest, NextResponse } from 'next/server'
import { AnalyzePayloadSchema } from '@/lib/schemas'
import { buildAnalysisPrompt } from '@/lib/prompts'
import {
  CLAUDE_MODEL,
  GEMINI_MODEL,
  OPENAI_MODEL,
  DEFAULT_PROVIDER,
  ENV,
} from '@/lib/constants'
import type { ProviderId } from '@/lib/constants'

export const runtime = 'nodejs'

// ── Error normalisation ───────────────────────────────────────────────────────

function parseProviderError(err: unknown, provider: ProviderId): string {
  const raw = err instanceof Error ? err.message : String(err)

  // Gemini wraps its API error as a JSON string inside the Error message
  try {
    const parsed = JSON.parse(raw) as { error?: { code?: number; message?: string; status?: string } }
    const apiError = parsed?.error
    if (apiError) {
      const code = apiError.code ?? 0
      if (code === 429) {
        return 'Rate limit reached. You\'ve hit the free-tier quota for Gemini — wait a minute and try again, or add a paid API key.'
      }
      if (code === 401 || code === 403) {
        return `Invalid or unauthorised API key for ${provider}. Check that you copied the full key correctly.`
      }
      // Extract just the first sentence from Gemini's verbose message
      const msg = apiError.message ?? ''
      const firstLine = msg.split('\n')[0].trim()
      if (firstLine) return firstLine
    }
  } catch { /* not JSON — fall through */ }

  // OpenAI / Anthropic surface status codes differently
  if (/429|rate.?limit|quota/i.test(raw)) {
    return `Rate limit reached for ${provider}. Please wait a moment and try again.`
  }
  if (/401|403|invalid.?key|auth/i.test(raw)) {
    return `API key rejected by ${provider}. Check that it's correct and has not expired.`
  }

  return `${provider} error: ${raw.slice(0, 200)}`
}

// ── Provider streaming helpers ────────────────────────────────────────────────

async function* streamGemini(apiKey: string, prompt: string): AsyncGenerator<string> {
  const { GoogleGenAI } = await import('@google/genai')
  const ai = new GoogleGenAI({ apiKey })
  const result = await ai.models.generateContentStream({
    model: GEMINI_MODEL,
    contents: prompt,
  })
  for await (const chunk of result) {
    const text = chunk.text
    if (text) yield text
  }
}

async function* streamClaude(apiKey: string, prompt: string): AsyncGenerator<string> {
  const Anthropic = (await import('@anthropic-ai/sdk')).default
  const client = new Anthropic({ apiKey })
  const stream = await client.messages.stream({
    model: CLAUDE_MODEL,
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  })
  for await (const chunk of stream) {
    if (
      chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta'
    ) {
      yield chunk.delta.text
    }
  }
}

async function* streamOpenAI(apiKey: string, prompt: string): AsyncGenerator<string> {
  const OpenAI = (await import('openai')).default
  const client = new OpenAI({ apiKey })
  const stream = await client.chat.completions.create({
    model: OPENAI_MODEL,
    stream: true,
    messages: [{ role: 'user', content: prompt }],
  })
  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content
    if (delta) yield delta
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse | Response> {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parseResult = AnalyzePayloadSchema.safeParse(body)
  if (!parseResult.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parseResult.error.flatten() },
      { status: 400 }
    )
  }

  const { jobDescription, cvText, apiKey, provider } = parseResult.data
  const resolvedProvider: ProviderId = provider ?? DEFAULT_PROVIDER

  const envKeyMap: Record<ProviderId, string | undefined> = {
    gemini: process.env[ENV.GOOGLE_AI_API_KEY],
    claude: process.env[ENV.ANTHROPIC_API_KEY],
    openai: process.env[ENV.OPENAI_API_KEY],
  }
  const resolvedKey = apiKey ?? envKeyMap[resolvedProvider]

  if (!resolvedKey) {
    return NextResponse.json(
      { error: `No API key found for ${resolvedProvider}. Open the provider settings and add your key.` },
      { status: 401 }
    )
  }

  const prompt = buildAnalysisPrompt(jobDescription, cvText)

  const stream = new ReadableStream({
    async start(controller) {
      try {
        let generator: AsyncGenerator<string>
        if (resolvedProvider === 'gemini') {
          generator = streamGemini(resolvedKey, prompt)
        } else if (resolvedProvider === 'claude') {
          generator = streamClaude(resolvedKey, prompt)
        } else {
          generator = streamOpenAI(resolvedKey, prompt)
        }

        for await (const chunk of generator) {
          controller.enqueue(new TextEncoder().encode(chunk))
        }
        controller.close()
      } catch (err) {
        console.error(`[analyze:${resolvedProvider}]`, err)
        const message = parseProviderError(err, resolvedProvider)
        controller.enqueue(new TextEncoder().encode(`__ERROR__:${message}`))
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
