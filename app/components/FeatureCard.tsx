"use client"

import { cn } from "@utils/tw"
import { memo } from "react"

/**
 * FeatureCard Component
 *
 * A compact card displaying a feature with an icon, name, and optional
 * description. Used on the landing page feature grid.
 *
 * Memoized to prevent unnecessary re-renders when parent updates.
 */
interface FeatureCardProps {
  icon: React.ReactNode
  name: string
  description?: string
  className?: string
}

export const FeatureCard = memo(function FeatureCard({
  icon,
  name,
  description,
  className,
}: FeatureCardProps): React.ReactElement {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-md sm:rounded-lg md:rounded-xl border border-(--color-border-default) bg-(--color-bg-surface)/50 p-1.5 sm:p-3 md:p-4 text-center",
        "transition-all duration-200 hover:border-(--color-text-accent)/40 hover:bg-(--color-bg-surface)/80 hover:-translate-y-0.5",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-8 sm:-top-10 h-12 sm:h-20 bg-linear-to-b from-(--color-accent-cyan)/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative text-base sm:text-xl md:text-2xl mb-0.5 sm:mb-1.5">
        {icon}
      </div>
      <div className="relative font-medium text-(--color-text-primary) text-[9px] sm:text-xs md:text-sm leading-tight pb-0.5">
        {name}
      </div>
      {description && (
        <div className="relative mt-0 sm:mt-1 text-[8px] sm:text-[10px] md:text-xs text-(--color-text-muted) leading-relaxed">
          {description}
        </div>
      )}
    </div>
  )
})
