import { Metadata } from "next";
import TranslationsProvider from "@/components/TranslationsProvider";
import { OG_IMAGE, localizedAlternates, localizedUrl } from "@/lib/metadata";
import initTranslations from "@/app/i18n";
import { Header } from "@/components/Header/Header";
import { HeroResources } from "./_components/HeroResources";
import { AccessAllResources } from "./_components/AccessAllResources";
import { Footer } from "@/components/Footer/Footer";

const i18nNamespaces = ["resources"];

type Props = {
  params: Promise<{ locale: string }>;
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
      url: localizedUrl("/resources", locale),
      locale,
      siteName: t("regenerationCredit"),
      images: OG_IMAGE,
    },
    alternates: localizedAlternates("/resources", locale),
  };
}

export default async function Resources({ params }: Props) {
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

        <HeroResources t={t} />
      </div>

      <main className="container mx-auto px-5 lg:px-20 py-14 lg:py-20">
        <AccessAllResources t={t} locale={locale} />
      </main>

      <Footer t={t} />
    </TranslationsProvider>
  );
}
