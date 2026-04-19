"use client"

import { useCallback, useEffect, useRef, useState } from "react"

/**
 * useDebounce Hook
 *
 * Delays updating a value until after a specified delay.
 * Useful for search inputs, form validation, and other
 * scenarios where you want to wait for user to pause typing.
 *
 * @example
 * const [search, setSearch] = useState('')
 * const debouncedSearch = useDebounce(search, 300)
 *
 * // debouncedSearch updates 300ms after search stops changing
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 300)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * useDebouncedCallback Hook
 *
 * Returns a debounced version of a callback function.
 * Useful for rate-limiting expensive operations like API calls.
 *
 * @example
 * const debouncedSearch = useDebouncedCallback(
 *   (query: string) => {
 *     fetchSearchResults(query)
 *   },
 *   300
 * )
 *
 * // In input onChange:
 * // debouncedSearch(value)
 *
 * @param callback - The function to debounce
 * @param delay - Delay in milliseconds (default: 300)
 * @returns Debounced function that will delay execution
 */
export function useDebouncedCallback<
  T extends (...args: Parameters<T>) => ReturnType<T>,
>(callback: T, delay = 300): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const callbackRef = useRef(callback)

  // Keep latest callback without invalidating the debounced function's identity.
  useEffect(() => {
    callbackRef.current = callback
  })

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args)
      }, delay)
    },
    [delay]
  )
}

/**
 * useDebounceState Hook
 *
 * Combines useState and useDebounce into a single hook.
 * Returns both the current value and the debounced value.
 *
 * @example
 * const [search, debouncedSearch, setSearch] = useDebounceState('', 300)
 *
 * // Use 'search' for immediate UI updates
 * // Use 'debouncedSearch' for API calls
 *
 * @param initialValue - Initial state value
 * @param delay - Debounce delay in milliseconds
 * @returns Tuple of [value, debouncedValue, setValue]
 */
export function useDebounceState<T>(
  initialValue: T,
  delay = 300
): [T, T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue)
  const debouncedValue = useDebounce(value, delay)

  return [value, debouncedValue, setValue]
}
