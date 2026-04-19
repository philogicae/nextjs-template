import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export type ClassName = ClassValue

/**
 * Merge class values with Tailwind-aware conflict resolution.
 * Combines `clsx` (conditional/falsy handling) with `tailwind-merge`.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-blue-500")
 * cn("px-4 py-2", "px-6") // => "py-2 px-6"
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))
