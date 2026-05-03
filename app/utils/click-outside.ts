"use client"

import { useEffect } from "react"

/**
 * Hook to handle click/touch outside a specified element.
 * @param isOpen - Whether the element is currently open
 * @param elementId - The ID of the element to check
 * @param onClose - Callback when clicking outside
 */
export function useClickOutside(
  isOpen: boolean,
  elementId: string,
  onClose: () => void
): void {
  useEffect(() => {
    if (!isOpen) return

    const handle = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node
      const element = document.getElementById(elementId)
      if (element?.contains(target)) return
      onClose()
    }

    document.addEventListener("mousedown", handle)
    document.addEventListener("touchstart", handle)

    return () => {
      document.removeEventListener("mousedown", handle)
      document.removeEventListener("touchstart", handle)
    }
  }, [isOpen, elementId, onClose])
}
