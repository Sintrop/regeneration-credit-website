import type { Metadata } from "next";
import initTranslations from "../../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import { Header } from "@/components/Header/Header";
import { Hero } from "./_components/Hero";
import { WhatIsIt } from "./_components/WhatIsIt";
import { Technology } from "./_components/Technology";
import { Community } from "./_components/Community/Community";
import { Footer } from "@/components/Footer/Footer";

const i18nNamespaces = ["home"];

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;
  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: t("seo-title"),
    description: t("seo-description"),
    openGraph: {
      type: "website",
      title: t("seo-title") as string,
      description: t("seo-description") as string,
      alternateLocale: ["en", "pt"],
      url: `https://regenerationcredit.org/${locale}`,
      locale,
      siteName: t("regenerationCredit"),
      images: "https://regenerationcredit.org/assets/img/og.jpg",
    },
    alternates: {
      canonical: "https://regenerationcredit.org",
      languages: {
        en: "https://regenerationcredit.org/en",
        pt: "https://regenerationcredit.org/pt",
      },
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className="bg-back-home w-full flex flex-col bg-cover bg-center">
        <Header t={t} />

        <Hero t={t} locale={locale} />
      </div>

      <main>
        <div className="container mx-auto px-5 lg:px-20">
          <WhatIsIt t={t} />

          {/* <RcToken t={t} /> */}
        </div>

        <Technology t={t} />

        <div className="container mx-auto px-5 lg:px-20">
          <Community t={t} />
        </div>
      </main>

      <Footer t={t} />
    </TranslationsProvider>
  );
}
