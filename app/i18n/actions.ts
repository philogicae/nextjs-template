"use server"

import { cookies } from "next/headers"
import { hasLocale, type Locale } from "./config"
import { LOCALE_COOKIE } from "./server"

/**
 * Persist the user's locale choice in the `NEXT_LOCALE` cookie so the root
 * layout can resolve it on the next request. Called by `LanguageSwitcher`,
 * which then `router.refresh()`es to re-render RSCs with the new dict.
 */
export async function setLocaleAction(locale: Locale): Promise<void> {
  if (!hasLocale(locale)) return
  const cookieStore = await cookies()
  cookieStore.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })
}
