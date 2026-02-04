import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lorientai.com"),
  title: "LorientAI - The Vercel for Model Training",
  description:
    "ML infrastructure for the post-training era. Training APIs, data infrastructure, and dev environments designed for research iteration.",
  keywords: [
    "ML infrastructure",
    "model training",
    "distributed computing",
    "AI",
    "machine learning",
    "LLM training",
    "fine-tuning",
  ],
  openGraph: {
    title: "LorientAI - The Vercel for Model Training",
    description: "ML infrastructure for the post-training era.",
    url: "https://lorientai.com",
    siteName: "LorientAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LorientAI - The Vercel for Model Training",
    description: "ML infrastructure for the post-training era.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
