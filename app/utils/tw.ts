import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility for merging Tailwind CSS classes with proper precedence.
 * Combines clsx (conditional classes) with tailwind-merge (conflict resolution).
 *
 * @example
 * cn("px-4 py-2", condition && "bg-blue-500", "px-6") // => "py-2 bg-blue-500 px-6"
 */
export type ClassName = ClassValue

export const cn = (...inputs: ClassValue[]): string =>
  twMerge(clsx(...inputs.filter((input) => !!input)))
