import { cn } from "@utils/tw"

/**
 * Container Component
 *
 * Provides consistent horizontal padding and a centered max-width wrapper
 * used across pages. Variants control the max width.
 */
type ContainerSize = "sm" | "md" | "lg" | "xl" | "full"

const sizeMap: Record<ContainerSize, string> = {
  sm: "max-w-2xl",
  md: "max-w-3xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  full: "max-w-full",
}

interface ContainerProps {
  children: React.ReactNode
  size?: ContainerSize
  className?: string
  as?: "div" | "section" | "main" | "article"
}

export function Container({
  children,
  size = "xl",
  className,
  as: Tag = "div",
}: ContainerProps): React.ReactElement {
  return (
    <Tag
      className={cn(
        "w-full mx-auto px-4 sm:px-6 lg:px-8",
        sizeMap[size],
        className
      )}
    >
      {children}
    </Tag>
  )
}
