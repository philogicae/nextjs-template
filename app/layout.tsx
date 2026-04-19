import "./globals.css"
import { siteConfig } from "@config/site"
import { Footer } from "@layout/Footer"
import { NavBar } from "@layout/Navbar"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata, Viewport } from "next"
import { Roboto } from "next/font/google"
import { Providers } from "./providers"

const isVercel = !!process.env.VERCEL

/**
 * Root layout for the Next.js application.
 * Configures fonts, metadata, and global viewport settings.
 */

const font = Roboto({
  subsets: ["latin"],
  variable: "--font-local",
  weight: ["400", "500", "700"],
  preload: true,
  display: "swap",
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/apple-touch-icon.png",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [
      {
        url: "/images/screenshot.jpeg",
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/images/screenshot.jpeg"],
  },
}

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: siteConfig.themeColor.light,
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: siteConfig.themeColor.dark,
    },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <html lang="en" className={font.variable} suppressHydrationWarning>
      <head>
        {/*
         * Opt out of Dark Reader / Night Eye / Midnight Lizard style
         * extensions — this site ships its own dark mode. Without this they
         * re-color every element (cyan becomes yellow, text-transparent
         * gradients break, Logo classes get rewritten causing hydration
         * mismatches).
         * See https://github.com/darkreader/darkreader#how-to-exclude-a-website
         */}
        <meta name="darkreader-lock" />
      </head>
      <body className="antialiased">
        <Providers>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </Providers>
        {isVercel && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  )
}
