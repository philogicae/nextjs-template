import { siteConfig } from "@config/site"
import type { MetadataRoute } from "next"

/**
 * Generate sitemap for SEO.
 * Includes all main pages with proper priorities and change frequencies.
 * Note: Languages are handled via cookie, not URL paths.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const date = new Date()

  // Define all routes without language prefixes (i18n uses cookies, not URL paths)
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: date,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/playground`,
      lastModified: date,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/skill.md`,
      lastModified: date,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ]

  return routes
}
