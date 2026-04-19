import { Container } from "@components/Container"
import { Skeleton } from "@components/Skeleton"

/**
 * Loading UI Component
 *
 * Displayed while page content is loading. Uses the shared `Skeleton`
 * primitive for consistent theming.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/loading
 */
export default function Loading(): React.ReactElement {
  return (
    <div className="relative w-full flex-1 px-4 py-6 sm:py-10">
      <Container size="xl">
        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8 space-y-2 sm:space-y-3">
          <Skeleton className="h-6 sm:h-8 md:h-10 w-40 sm:w-48" />
          <Skeleton className="h-3 sm:h-4 md:h-5 w-full max-w-xl" />
        </div>

        {/* State Manager */}
        <section className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center justify-between flex-wrap gap-1 sm:gap-2 mb-2">
            <Skeleton className="h-5 sm:h-6 md:h-7 w-28 sm:w-32" />
            <Skeleton className="h-3 sm:h-4 w-20" />
          </div>

          <div className="border border-(--color-border-default) bg-(--color-bg-surface)/30 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Skeleton className="h-8 sm:h-10 md:h-12 w-12 sm:w-14" />
              <div className="flex-1 flex flex-wrap gap-1 sm:gap-2">
                <Skeleton className="h-7 sm:h-8 w-10 sm:w-12" />
                <Skeleton className="h-7 sm:h-8 w-10 sm:w-12" />
                <Skeleton className="h-7 sm:h-8 w-10 sm:w-12" />
                <Skeleton className="h-7 sm:h-8 w-14 sm:w-16" />
                <Skeleton className="h-7 sm:h-8 w-12 sm:w-14" />
              </div>
            </div>
          </div>
        </section>

        {/* API Section */}
        <section>
          <div className="flex items-center justify-between flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
            <Skeleton className="h-5 sm:h-6 md:h-7 w-32 sm:w-36" />
            <Skeleton className="h-3 sm:h-4 w-16 sm:w-20" />
          </div>

          <div className="grid gap-2 sm:gap-3 md:gap-4 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="border border-(--color-border-default) bg-(--color-bg-surface)/30 rounded-lg sm:rounded-xl p-2 sm:p-3"
              >
                <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Skeleton className="h-4 sm:h-5 w-8 sm:w-10 rounded-md" />
                    <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
                  </div>
                  <Skeleton className="h-4 sm:h-5 w-12 sm:w-14 rounded-full" />
                </div>
                <Skeleton className="h-2.5 sm:h-3 w-full mb-1.5 sm:mb-2" />
                <Skeleton className="h-2.5 sm:h-3 w-3/4 mb-4 sm:mb-5" />
                <Skeleton className="h-7 sm:h-8 w-full" />
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  )
}
