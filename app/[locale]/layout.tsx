import type { Metadata } from "next";
import { Anta, Fraunces, Figtree } from "next/font/google";
import { dir } from 'i18next';
import { notFound } from 'next/navigation';
import i18nConfig from '@/i18nConfig';
import { AosInit } from "@/components/aosInit";
import { SITE_URL, OG_IMAGE } from "@/lib/metadata";
import "./globals.css";
import "./markdown.css";

// Body / UI text.
const bodyFont = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
})

// Headings and other display type.
const displayFont = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
})

// Wordmark and on-chain figures.
const antaFont = Anta({
  variable: "--font-anta",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Regeneration Credit",
  description: "A Peer-to-Peer Nature Regeneration System",
  applicationName: "Regeneration Credit",
  openGraph: {
    type: "website",
    siteName: "Regeneration Credit",
    images: OG_IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    images: OG_IMAGE,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!i18nConfig.locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir={dir(locale)}>
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${antaFont.variable} antialiased`}
      >
        {children}

        <AosInit />
      </body>
    </html>
  );
}
