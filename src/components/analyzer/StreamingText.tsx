'use client'

interface StreamingTextProps {
  text: string
}

export function StreamingText({ text }: StreamingTextProps) {
  return (
    <div className="rounded-xl bg-bg-card border border-border p-4 min-h-[120px]">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-accent-blue"
              style={{
                animation: `blink 1.2s infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        <span className="text-xs text-text-muted font-mono">Analyzing with Claude…</span>
      </div>
      <pre className="font-mono text-xs text-text-secondary whitespace-pre-wrap break-words leading-relaxed max-h-64 overflow-y-auto">
        {text}
        <span className="cursor-blink text-accent-blue font-bold">▌</span>
      </pre>
    </div>
  )
}
