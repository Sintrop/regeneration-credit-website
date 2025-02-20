import { Anta } from "next/font/google";
import { dir } from 'i18next';
import { notFound } from 'next/navigation';
import i18nConfig from '@/i18nConfig';
import "./globals.css";
import { AosInit } from "@/components/aosInit";

const antaFont = Anta({
  variable: "--font-anta",
  subsets: ["latin"],
  weight: "400"
})

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export default function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {

  if (!i18nConfig.locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir={dir(locale)}>
      <body
        className={`${antaFont.variable} antialiased`}
      >
        {children}

        <AosInit />
      </body>
    </html>
  );
}
