import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { headers } from "next/headers"

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Optimize font loading
})

export const metadata: Metadata = {
  metadataBase: new URL("https://mortcalc.org"),
  title: {
    default: "Mortgage Calculator 2025 | Free Monthly Payment Calculator",
    template: "%s | Free Mortgage Calculator",
  },
  description:
    "Calculate your exact monthly mortgage payment in seconds. Free mortgage calculator with taxes, insurance, PMI, HOA fees, and down payment assistance. Updated rates for 2025.",
  keywords: [
    "mortgage calculator 2025",
    "mortgage payment calculator",
    "house payment calculator",
    "home loan calculator",
    "free mortgage calculator",
    "mortgage calculator with taxes",
    "mortgage calculator with PMI",
    "mortgage calculator with insurance",
    "home mortgage calculator 2025",
    "house payment estimator 2025",
  ],
  openGraph: {
    type: "website",
    url: "https://mortcalc.org",
    title: "Mortgage Calculator 2025 | Free Monthly Payment Calculator",
    description:
      "Calculate your exact monthly mortgage payment in seconds. Includes taxes, insurance, PMI, and current 2025 rates.",
    siteName: "MortCalc.org",
    images: [
      {
        url: "https://mortcalc.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "MortCalc.org - Free Mortgage Calculator 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculate Your Monthly Mortgage Payment - Free Calculator",
    description: "Get your exact monthly payment in seconds. Includes taxes, insurance, and PMI.",
    images: ["https://mortcalc.org/og-image.png"],
    creator: "@mortcalc",
  },
  verification: {
    google: "G-F4BJ7K38JM", // Updated to new GA ID
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://mortcalc.org",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers()
  const userAgent = headersList.get("user-agent") || ""
  const isMobile = /mobile/i.test(userAgent)

  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="canonical" href="https://mortcalc.org" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        {/* Preconnect to required origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>

      {/* Google tag (gtag.js) */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-F4BJ7K38JM" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-F4BJ7K38JM');
        `}
      </Script>

      <body className={inter.className}>{children}</body>
    </html>
  )
}
