import type { Metadata } from "next";
import { OG_IMAGE, localizedAlternates, localizedUrl } from "@/lib/metadata";
import initTranslations from "../../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import { Header } from "@/components/Header/Header";
import { Hero } from "./_components/Hero";
import { WhatIsIt } from "./_components/WhatIsIt";
import { Invest } from "./_components/Invest";
import { Technology } from "./_components/Technology";
import { Community } from "./_components/Community/Community";
import { Footer } from "@/components/Footer/Footer";
import { RcToken } from "./_components/RcToken/RcToken";

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
      url: localizedUrl("/", locale),
      locale,
      siteName: t("regenerationCredit"),
      images: OG_IMAGE,
    },
    alternates: localizedAlternates("/", locale),
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
      <div className="bg-hero-forest w-full flex flex-col">
        <Header t={t} />

        <Hero t={t} locale={locale} />
      </div>

      <main>
        <div className="container mx-auto px-5 lg:px-20">
          <RcToken t={t} />

          <WhatIsIt t={t} />

          <Invest t={t} />
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
