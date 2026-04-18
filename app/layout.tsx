import "./globals.css"
import { Footer } from "@layout/Footer"
import { NavBar } from "@layout/Navbar"
import { getThemeScript } from "@utils/theme-script"
import type { Metadata, Viewport } from "next"
import { Roboto } from "next/font/google"

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
  title: "Next.js Template",
  description:
    "A modern Next.js template with HeroUI, Tailwind CSS, and TypeScript",
  applicationName: "Next.js Template",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HeroUI"],
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
    title: "Next.js Template",
    description:
      "A modern Next.js template with HeroUI, Tailwind CSS, and TypeScript",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1a" },
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
        {/* Resource hints for faster connections */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Theme initialization - prevents flash of incorrect theme */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Theme init script - static, controlled content
          dangerouslySetInnerHTML={{
            __html: getThemeScript(),
          }}
        />
      </head>
      <body className="min-h-screen w-full overflow-x-hidden flex flex-col antialiased">
        <NavBar />
        <main className="w-full flex-1 flex flex-col relative">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
