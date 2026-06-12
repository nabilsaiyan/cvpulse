// pdf-parse v1 ships as a CommonJS default export (a function)
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require('pdf-parse') as (buffer: Buffer) => Promise<{ text: string }>

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  const data = await pdfParse(buffer)
  const text = data.text.trim()
  if (!text) {
    throw new Error(
      'Could not extract text from this PDF. It may be image-based or password-protected.'
    )
  }
  return text
}
