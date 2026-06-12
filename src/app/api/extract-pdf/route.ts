import { NextRequest, NextResponse } from 'next/server'
import { extractTextFromPdf } from '@/lib/pdf'
import { VALIDATION } from '@/lib/constants'

export const runtime = 'nodejs'

export async function POST(req: NextRequest): Promise<NextResponse> {
  const formData = await req.formData().catch(() => null)
  if (!formData) {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const file = formData.get('file')
  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  if (file.type !== 'application/pdf') {
    return NextResponse.json({ error: 'Only PDF files are accepted' }, { status: 400 })
  }

  if (file.size > VALIDATION.FILE_SIZE_MAX) {
    return NextResponse.json({ error: 'File exceeds 5 MB limit' }, { status: 413 })
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const text = await extractTextFromPdf(buffer)
    return NextResponse.json({ text })
  } catch (err) {
    console.error('[extract-pdf] Error:', err)
    const message = err instanceof Error ? err.message : 'Failed to extract PDF text'
    return NextResponse.json({ error: message }, { status: 422 })
  }
}
