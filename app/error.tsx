"use client"

import { Button, Card, CardContent, CardHeader } from "@heroui/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

/**
 * Error Boundary Component
 *
 * Catches and displays errors in the application.
 * Automatically resets when the route changes.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error
 */
interface ErrorBoundaryProps {
  /** The error that was caught */
  error: Error & { digest?: string }
  /** Function to reset the error boundary */
  reset: () => void
}

export default function ErrorBoundary({
  error,
  reset,
}: ErrorBoundaryProps): React.ReactElement {
  const router = useRouter()

  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="relative flex-1 w-full flex items-center justify-center px-4 py-12 sm:py-20">
      <Card className="max-w-md sm:max-w-lg w-full border border-rose-500/30 bg-(--color-bg-surface)/50 shadow-none">
        <CardHeader className="p-4 sm:p-6 pb-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-rose-500"
              >
                <title>Error</title>
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-(--color-text-primary)">
                Something went wrong
              </h2>
              <p className="text-xs sm:text-sm text-(--color-text-muted)">
                An error occurred while loading this page
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 pt-3 sm:pt-4 space-y-3 sm:space-y-4">
          <div className="rounded-lg bg-(--color-bg-primary) border border-(--color-border-default) p-2.5 sm:p-3">
            <p className="text-[10px] sm:text-xs text-(--color-text-muted) mb-1">
              Error details
            </p>
            <p className="text-xs sm:text-sm text-rose-400 font-mono break-all">
              {error.message || "Unknown error"}
            </p>
            {error.digest && (
              <p className="text-[10px] sm:text-xs text-(--color-text-muted) mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Button
              onPress={reset}
              size="sm"
              className="bg-(--color-accent-cyan) hover:bg-(--color-accent-cyan-hover) text-(--color-accent-cyan-fg) font-medium h-8 sm:h-9 text-xs sm:text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1.5 sm:mr-2"
              >
                <title>Retry</title>
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M8 16H3v5" />
              </svg>
              Try again
            </Button>

            <Button
              variant="outline"
              size="sm"
              onPress={() => router.push("/")}
              className="border-(--color-border-default) hover:bg-(--color-bg-surface) font-medium h-8 sm:h-9 text-xs sm:text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1.5 sm:mr-2"
              >
                <title>Home</title>
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
