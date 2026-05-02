import { cn } from "@utils/tw"

interface FeatureCardProps {
  icon: React.ReactNode
  name: string
  description?: string
  className?: string
}

/** Compact card with icon, name, and optional description. */
export function FeatureCard({
  icon,
  name,
  description,
  className,
}: FeatureCardProps): React.ReactElement {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-(--radius-cards) border border-(--color-border-default) bg-(--color-bg-secondary) p-2 sm:p-3 text-center",
        "transition-all duration-150 hover:border-(--color-border-subtle) hover:bg-(--color-bg-elevated) hover:-translate-y-0.5",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-6 sm:-top-10 h-10 sm:h-20 bg-linear-to-b from-(--color-accent-primary)/10 to-transparent opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />
      <div className="relative text-sm sm:text-lg md:text-xl mb-0.5 sm:mb-1">
        {icon}
      </div>
      <div className="relative font-medium text-(--color-text-primary) text-[10px] sm:text-xs leading-tight tracking-[-0.11px]">
        {name}
      </div>
      {description && (
        <div className="relative mt-0.5 sm:mt-1 text-[9px] sm:text-xs text-(--color-text-muted) leading-relaxed tracking-[-0.1px]">
          {description}
        </div>
      )}
    </div>
  )
}
