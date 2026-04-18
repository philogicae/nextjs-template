import { cn } from "@utils/tw"

/**
 * StatusBadge Component
 *
 * Displays a compact status indicator with a colored dot and label.
 */
type Status = "idle" | "loading" | "success" | "error"

const statusStyles: Record<
  Status,
  { dot: string; text: string; label: string }
> = {
  idle: {
    dot: "bg-(--color-text-muted)",
    text: "text-(--color-text-muted)",
    label: "Idle",
  },
  loading: {
    dot: "bg-(--color-accent-cyan) animate-pulse",
    text: "text-(--color-text-accent)",
    label: "Loading",
  },
  success: {
    dot: "bg-emerald-500",
    text: "text-emerald-500",
    label: "OK",
  },
  error: {
    dot: "bg-rose-500",
    text: "text-rose-500",
    label: "Error",
  },
}

interface StatusBadgeProps {
  status: Status
  label?: string
  className?: string
}

export function StatusBadge({
  status,
  label,
  className,
}: StatusBadgeProps): React.ReactElement {
  const style = statusStyles[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-(--color-border-default) bg-(--color-bg-surface)/60 px-2.5 py-0.5 text-xs font-medium",
        style.text,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", style.dot)} />
      {label ?? style.label}
    </span>
  )
}
