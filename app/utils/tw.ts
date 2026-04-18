import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility for merging Tailwind CSS classes with proper precedence.
 *
 * Combines clsx (conditional classes) with tailwind-merge (conflict resolution).
 * Filters out falsy values before merging to prevent "undefined" in class strings.
 *
 * @example
 * // Conditional classes
 * cn("px-4 py-2", isActive && "bg-blue-500") // => "px-4 py-2 bg-blue-500"
 *
 * // Conflict resolution (tailwind-merge)
 * cn("px-4 py-2", "px-6") // => "py-2 px-6"
 *
 * // Falsy values filtered out
 * cn("px-4", false && "py-2", undefined) // => "px-4"
 */
export type ClassName = ClassValue

/**
 * Merges multiple class values into a single string.
 *
 * @param inputs - Class values to merge (strings, arrays, objects, or falsy)
 * @returns Merged class string with conflicts resolved
 */
export const cn = (...inputs: ClassValue[]): string =>
  twMerge(clsx(...inputs.filter((input) => !!input)))
