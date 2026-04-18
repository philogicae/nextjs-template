import { cn } from "@utils/tw"

/**
 * Container size variants - controls max-width
 */
type ContainerSize = "sm" | "md" | "lg" | "xl" | "full"

/**
 * Max-width mapping for each size variant
 */
const sizeMap: Record<ContainerSize, string> = {
  sm: "max-w-2xl", // ~42rem / 672px
  md: "max-w-3xl", // ~48rem / 768px
  lg: "max-w-5xl", // ~64rem / 1024px
  xl: "max-w-6xl", // ~72rem / 1152px
  full: "max-w-full",
}

/**
 * Container Component
 *
 * Provides consistent horizontal padding and a centered max-width wrapper
 * used across pages. Variants control the max width.
 *
 * @example
 * <Container size="md">Content</Container>
 * <Container as="section" size="xl">Section content</Container>
 */
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
