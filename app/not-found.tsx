import { Card } from "@heroui/react"
import Link from "next/link"

/**
 * Not Found Page (404)
 *
 * Displayed when a user navigates to a non-existent route.
 */
export default function NotFound(): React.ReactElement {
  return (
    <div className="min-h-screen w-full bg-(--color-bg-primary) flex items-center justify-center px-4">
      <Card className="max-w-md w-full p-8 text-center border border-(--color-border-default)">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-(--color-bg-surface) flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-(--color-text-accent)"
          >
            <title>404 Error</title>
            <circle cx="12" cy="12" r="10" />
            <line x1="8" y1="15" x2="16" y2="15" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-(--color-text-primary) mb-2">
          404
        </h1>
        <p className="text-(--color-text-secondary) mb-6">
          Page not found. The page you&apos;re looking for doesn&apos;t exist or
          has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-(--color-accent-cyan) hover:bg-(--color-accent-cyan-hover) text-white font-medium w-full transition-colors"
        >
          Go Home
        </Link>
      </Card>
    </div>
  )
}
