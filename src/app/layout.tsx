import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cielofashion.rw"),
  title: {
    default: "Cielo Fashion Boutique | Crafted in Rwanda, Inspired by Style",
    template: "%s | Cielo Fashion Boutique",
  },
  description:
    "Rwanda's premier luxury fashion boutique. Discover exclusive collections, custom tailoring, and premium African fashion. Crafted in Rwanda, Inspired by Style.",
  keywords: [
    "Cielo Fashion",
    "Rwanda fashion",
    "luxury boutique",
    "custom tailoring",
    "African fashion",
    "Kitenge",
    "Ankara",
    "Rwanda clothing",
    "premium fashion",
  ],
  authors: [{ name: "Cielo Fashion Boutique" }],
  creator: "Cielo Fashion Boutique",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cielofashion.rw",
    siteName: "Cielo Fashion Boutique",
    title: "Cielo Fashion Boutique | Crafted in Rwanda, Inspired by Style",
    description:
      "Rwanda's premier luxury fashion boutique. Discover exclusive collections and custom tailoring.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cielo Fashion Boutique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cielo Fashion Boutique",
    description: "Crafted in Rwanda, Inspired by Style.",
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
