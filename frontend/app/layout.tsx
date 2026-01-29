import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display, Fredoka } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SmoothScroll } from "@/components/smooth-scroll"
import { PageLoader } from "@/components/page-loader"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const fredoka = Fredoka({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], 
  variable: "--font-fredoka", 
});

export const metadata: Metadata = {
  title: "Escola Sonho Feliz",
  description: "A research-driven private equity firm connecting emerging markets to global capital.",
  generator: "v0.app",
  icons: {
    icon: "/images/sonho_feliz_logo.png",
    apple: "/crosshaven-icon.svg",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const showLoader = false

  return (
    <html lang="pt" className={`${inter.variable} ${playfair.variable} ${fredoka.variable} bg-background`}>
      <body className="font-sans antialiased">
        {showLoader && <PageLoader />}
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
