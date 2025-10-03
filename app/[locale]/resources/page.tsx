import { Metadata } from "next";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import { Header } from "@/components/Header/Header";
import { HeroResources } from "./_components/HeroResources";
import { AccessAllResources } from "./_components/AccessAllResources";
//import { SocialNetwork } from "./_components/SocialNetwork";
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
      url: `https://regenerationcredit.org/${locale}/resources`,
      locale,
      siteName: t("regenerationCredit"),
      images: "https://regenerationcredit.org/assets/img/og.jpg",
    },
    alternates: {
      canonical: "https://regenerationcredit.org/resources",
      languages: {
        en: "https://regenerationcredit.org/en/resources",
        pt: "https://regenerationcredit.org/pt/resources",
      },
    },
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
      <div className="bg-back-home w-full flex flex-col bg-cover bg-center">
        <Header t={t} />

        <HeroResources t={t} />
      </div>

      <main>
        <div className="container mx-auto px-5 lg:px-20">
          <AccessAllResources t={t} locale={locale} />
        </div>

        {/* <SocialNetwork t={t} /> */}
      </main>

      <Footer t={t} />
    </TranslationsProvider>
  );
}
