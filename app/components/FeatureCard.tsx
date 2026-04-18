import { cn } from "@utils/tw"

/**
 * FeatureCard Component
 *
 * A compact card displaying a feature with an icon, name, and optional
 * description. Used on the landing page feature grid.
 */
interface FeatureCardProps {
  icon: React.ReactNode
  name: string
  description?: string
  className?: string
}

export function FeatureCard({
  icon,
  name,
  description,
  className,
}: FeatureCardProps): React.ReactElement {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-(--color-border-default) bg-(--color-bg-surface)/50 p-4 sm:p-5 text-center",
        "transition-all duration-200 hover:border-(--color-text-accent)/40 hover:bg-(--color-bg-surface)/80 hover:-translate-y-0.5",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-10 h-20 bg-linear-to-b from-(--color-accent-cyan)/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative text-2xl sm:text-3xl mb-2">{icon}</div>
      <div className="relative font-medium text-(--color-text-primary) text-sm">
        {name}
      </div>
      {description && (
        <div className="relative mt-1 text-xs text-(--color-text-muted) leading-relaxed">
          {description}
        </div>
      )}
    </div>
  )
}
