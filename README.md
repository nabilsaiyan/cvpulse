<div align="center">

# ResumeIQ

**AI-powered CV analyzer — know exactly why you're not getting interviews.**

Paste a job description, upload your CV, and get an ATS score, keyword gap analysis,
section-by-section feedback, and actionable rewrites — streamed in real time.

[Live Demo](https://resumeiq.vercel.app) · [Report Bug](https://github.com/nabilsaiyan/resumeiq/issues)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

---

## Features

- **Match Score & ATS Score** — animated score rings showing how well a CV passes automated filters
- **Keyword Gap Analysis** — exactly which keywords from the job description are missing
- **Section Feedback** — summary, experience, skills, and education scored individually, with a suggested rewrite for the summary
- **Interview Probability** — a clear verdict: low / moderate / high / very high
- **Real-time Streaming** — the AI response streams token-by-token with a live progress view
- **Multi-provider** — Gemini 2.5 Flash by default (free tier), with bring-your-own-key support for Claude and GPT-4o mini
- **Privacy-first** — API keys are stored in `localStorage` only; never persisted server-side

## Architecture

```
src/
├── app/
│   ├── page.tsx                  Landing page (server component)
│   ├── analyze/page.tsx          Analyzer (client component)
│   └── api/
│       ├── analyze/route.ts      POST — validates with Zod, streams the AI response
│       └── extract-pdf/route.ts  POST — server-side PDF text extraction
├── components/
│   ├── landing/                  Landing page sections
│   ├── analyzer/                 Analyzer feature components
│   └── ui/                       Design-system primitives (Button, Card, Badge…)
├── hooks/
│   ├── useAnalyze.ts             Streaming fetch + abort + JSON validation
│   ├── useApiKey.ts              localStorage-backed key management
│   └── useFileParser.ts          Client-side file validation
├── lib/
│   ├── schemas.ts                Zod schemas (validated on client AND server)
│   ├── prompts.ts                Prompt templates
│   ├── constants.ts              All constants — zero magic strings
│   ├── pdf.ts                    PDF text extraction (pdf-parse)
│   └── utils.ts                  Shared pure utilities
├── store/useStore.ts             Zustand global state
└── types/analysis.ts             Shared TypeScript interfaces
```

**Key decisions:**

- **Validation on both sides.** The same Zod schemas run client-side before sending and server-side before touching any AI provider. Input is never trusted.
- **Streaming end-to-end.** The API route pipes the provider's token stream straight through a `ReadableStream`; the `useAnalyze` hook accumulates chunks, shows live output, then parses and validates the final JSON against `AnalysisResultSchema`.
- **Clean cancellation.** `useAnalyze` keeps an `AbortController` in a ref — navigating away or re-submitting aborts the in-flight request without state leaks.
- **Hooks own logic, components render.** Components are pure UI; all async/state logic lives in custom hooks and the Zustand store.

## Getting Started

```bash
git clone https://github.com/nabilsaiyan/resumeiq.git
cd resumeiq
npm install
cp .env.example .env.local   # add your key(s)
npm run dev
```

### Environment Variables

| Variable            | Required | Description                                              |
| ------------------- | -------- | -------------------------------------------------------- |
| `GOOGLE_AI_API_KEY` | No\*     | Default provider (free at [aistudio.google.com](https://aistudio.google.com/apikey)) |
| `ANTHROPIC_API_KEY` | No       | Optional server-side fallback for Claude                 |
| `OPENAI_API_KEY`    | No       | Optional server-side fallback for GPT-4o mini            |

\* Users can also provide their own key in the UI — it's stored in their browser only.

## Scripts

| Command             | Description                       |
| ------------------- | --------------------------------- |
| `npm run dev`       | Start the dev server              |
| `npm run build`     | Production build                  |
| `npm run lint`      | ESLint                            |
| `npm run typecheck` | TypeScript `--noEmit` check       |
| `npm test`          | Unit tests (Vitest)               |

## Tech Stack

Next.js 16 (App Router) · TypeScript (strict) · Tailwind CSS v4 · Zod · Zustand ·
Framer Motion · react-dropzone · pdf-parse · Google GenAI / Anthropic / OpenAI SDKs

## Deployment

Deploys to Vercel with zero config. Add your provider key(s) as environment
variables in the Vercel dashboard.

## License

MIT © [Nabil Amhaouch](https://nabilamhaouch.dev)
