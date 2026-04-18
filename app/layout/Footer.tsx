import { Container } from "@components/Container"
import Link from "next/link"

/**
 * Footer Component
 *
 * Shared site footer with meta links. Mobile-first: content wraps and centers
 * on narrow viewports, aligns in a row on larger screens.
 */
export function Footer(): React.ReactElement {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-(--color-border-default) bg-(--color-bg-primary)/60 backdrop-blur-sm">
      <Container className="py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-(--color-text-muted)">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>&copy; {year} Next.js Template</span>
            <span className="text-(--color-border-subtle)">•</span>
            <span>MIT License</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link
              href="/test"
              className="hover:text-(--color-text-primary) transition-colors"
            >
              API Playground
            </Link>
            <a
              href="https://github.com/philogicae/nextjs-template"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-(--color-text-primary) transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-(--color-text-primary) transition-colors"
            >
              Next.js Docs
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
