import { Card } from "@heroui/react"
import { getCurrentDictionary } from "@i18n/server"
import Link from "next/link"

/**
 * Not Found Page (404)
 *
 * Displayed when a user navigates to a non-existent route. Reads the
 * active locale server-side so the 404 respects the user's language even
 * before any Client Component hydrates.
 */
export default async function NotFound(): Promise<React.ReactElement> {
  const { dict } = await getCurrentDictionary()
  const t = dict.notFound
  return (
    <div className="relative flex-1 w-full flex items-center justify-center px-4 py-12 sm:py-20">
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
            <title>{t.title}</title>
            <circle cx="12" cy="12" r="10" />
            <line x1="8" y1="15" x2="16" y2="15" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--color-text-primary) mb-2 tracking-tight">
          {t.title}
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-(--color-text-secondary) mb-4 sm:mb-6">
          {t.message}
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-(--color-accent-cyan) hover:bg-(--color-accent-cyan-hover) text-(--color-accent-cyan-fg) font-medium w-full transition-colors text-sm sm:text-base"
        >
          {t.home}
        </Link>
      </Card>
    </div>
  )
}
