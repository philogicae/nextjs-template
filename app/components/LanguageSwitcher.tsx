"use client"

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownPopover,
  DropdownTrigger,
} from "@heroui/react"
import { type Locale, localeMeta, locales } from "@i18n/config"
import { useLocale } from "@i18n/LocaleProvider"

/**
 * Navbar locale picker. Reads from `useLocale()` and persists the choice
 * via `setLocale` → Server Action → RSC refresh.
 *
 * HeroUI's `DropdownTrigger` already renders a `<button>`; never wrap a
 * `<Button>` inside it (nested buttons break hydration). Style the trigger
 * directly via `className`.
 */
export function LanguageSwitcher(): React.ReactElement {
  const { locale, setLocale, dict, isPending } = useLocale()
  const current = localeMeta[locale]

  return (
    <Dropdown>
      <DropdownTrigger
        isDisabled={isPending}
        aria-label={`${dict.nav.language}: ${current.native}`}
        className="inline-flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 rounded-lg text-sm sm:text-base leading-none hover:bg-(--color-bg-surface)/50 transition-colors disabled:opacity-50"
      >
        <span aria-hidden="true">{current.flag}</span>
      </DropdownTrigger>
      <DropdownPopover
        className="min-w-36 border border-(--color-border-default) bg-(--color-bg-surface) p-1 shadow-lg"
        placement="bottom end"
      >
        <DropdownMenu aria-label={dict.nav.language}>
          {locales.map((loc: Locale) => {
            const meta = localeMeta[loc]
            const isActive = loc === locale
            return (
              <DropdownItem
                key={loc}
                onClick={() => setLocale(loc)}
                className={[
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs cursor-pointer outline-none",
                  isActive
                    ? "bg-(--color-bg-primary) text-(--color-text-primary)"
                    : "text-(--color-text-secondary) hover:bg-(--color-bg-primary)/60 hover:text-(--color-text-primary)",
                ].join(" ")}
              >
                <span aria-hidden="true" className="text-base leading-none">
                  {meta.flag}
                </span>
                <span className="font-mono text-[10px] text-(--color-text-muted) tracking-wider">
                  {meta.code}
                </span>
                <span>{meta.native}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="ml-auto text-(--color-accent-cyan)"
                  >
                    ✓
                  </span>
                )}
              </DropdownItem>
            )
          })}
        </DropdownMenu>
      </DropdownPopover>
    </Dropdown>
  )
}
