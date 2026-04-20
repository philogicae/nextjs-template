import { defaultLocale, hasLocale, type Locale, locales } from "./config"

/**
 * Best-matching supported locale from an `Accept-Language` header.
 * Zero-dep: parses q-weights, strips region tags (`en-US` → `en`).
 */
export function getLocaleFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale

  const candidates = header
    .split(",")
    .map((part) => {
      const [tag = "", ...rest] = part.trim().split(";")
      const q = rest
        .map((r) => r.trim())
        .find((r) => r.startsWith("q="))
        ?.slice(2)
      const weight = q ? Number.parseFloat(q) : 1
      return {
        tag: tag.toLowerCase(),
        weight: Number.isFinite(weight) ? weight : 1,
      }
    })
    .filter((c) => c.tag && c.weight > 0)
    .sort((a, b) => b.weight - a.weight)

  for (const { tag } of candidates) {
    if (hasLocale(tag)) return tag
    const base = tag.split("-")[0]
    if (base && hasLocale(base)) return base
  }

  // Last-resort: if any supported locale appears anywhere in the header.
  for (const loc of locales) {
    if (header.toLowerCase().includes(loc)) return loc
  }

  return defaultLocale
}
