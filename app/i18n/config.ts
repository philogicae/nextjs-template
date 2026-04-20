/**
 * Internationalization — single registry.
 *
 * Add a locale in two steps: create `./dictionaries/<code>.json` (copying
 * the shape of `en.json`, including `meta.{code,flag,native}`), then add a
 * static import and one entry in the `dictionaries` map below. Everything
 * else (`Locale`, `locales`, `localeMeta`, `hasLocale`, `getDictionary`,
 * the `LanguageSwitcher`) derives from that map.
 */

import en from "./dictionaries/en.json"
import es from "./dictionaries/es.json"
import fr from "./dictionaries/fr.json"
import ro from "./dictionaries/ro.json"

const dictionaries = { en, fr, es, ro } as const satisfies Record<
  string,
  Dictionary
>

export type Locale = keyof typeof dictionaries
export type Dictionary = typeof en
export type LocaleMeta = Dictionary["meta"]

export const locales = Object.keys(dictionaries) as readonly Locale[]
export const defaultLocale: Locale = "en"

/** Per-locale display metadata extracted from each dict's `meta` field. */
export const localeMeta = Object.fromEntries(
  Object.entries(dictionaries).map(([code, dict]) => [code, dict.meta])
) as Record<Locale, LocaleMeta>

export function hasLocale(value: string): value is Locale {
  return value in dictionaries
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
