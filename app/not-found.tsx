import { Card } from "@heroui/react"
import Link from "next/link"

/**
 * Not Found Page (404)
 *
 * Displayed when a user navigates to a non-existent route.
 */
export default function NotFound(): React.ReactElement {
  return (
    <div className="relative flex-1 w-full bg-(--color-bg-primary) flex items-center justify-center px-4 py-12 sm:py-20 pt-[calc(var(--navbar-height-mobile)+var(--space-lg))] sm:pt-[calc(var(--navbar-height)+var(--space-xl))]">
      <Card className="max-w-sm sm:max-w-md w-full p-4 sm:p-6 md:p-8 text-center border border-(--color-border-default) bg-(--color-bg-surface)/50 shadow-none">
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-(--color-bg-primary) border border-(--color-border-default) flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-(--color-text-accent)"
          >
            <title>404 Error</title>
            <circle cx="12" cy="12" r="10" />
            <line x1="8" y1="15" x2="16" y2="15" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--color-text-primary) mb-2 tracking-tight">
          404
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-(--color-text-secondary) mb-4 sm:mb-6">
          Page not found. The page you&apos;re looking for doesn&apos;t exist or
          has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-(--color-accent-cyan) hover:bg-(--color-accent-cyan-hover) text-black dark:text-white font-medium w-full transition-colors text-sm sm:text-base"
        >
          Go Home
        </Link>
      </Card>
    </div>
  )
}
