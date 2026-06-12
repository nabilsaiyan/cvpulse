import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-bg-hover',
        className
      )}
    />
  )
}

export function ResultSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <Skeleton className="w-32 h-32 rounded-full" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-6 rounded-full" />
        ))}
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-20" />
        </div>
      ))}
    </div>
  )
}
