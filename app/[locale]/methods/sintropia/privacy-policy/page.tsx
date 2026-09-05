import type { Metadata } from "next";
import { OG_IMAGE, localizedAlternates, localizedUrl } from "@/lib/metadata";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { HeroPrivacyPolicy } from "./components/HeroPrivacyPolicy";

const i18nNamespaces = ["privacy-policy-sintropia"];

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
      url: localizedUrl("/methods/sintropia/privacy-policy", locale),
      locale,
      siteName: t('regenerationCredit'),
      images: OG_IMAGE,
    },
    alternates: localizedAlternates("/methods/sintropia/privacy-policy", locale),
  };
}

export default async function PrivacyPolicySintropia({ params }: Props) {
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

        <HeroPrivacyPolicy t={t} title="privacy.title" />
      </div>

      <main>
        <div className="container mx-auto px-5 lg:px-20 py-10 lg:py-20">
          <p className="text-sm text-gray-500 mb-8">{t("privacy.updated")}</p>

          <p className="mb-4">{t("privacy.intro")}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            {t("privacy.commitmentTitle")}
          </h2>
          <p className="mb-4">{t("privacy.commitment")}</p>
          <p className="mb-4">{t("privacy.agreement")}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            {t("privacy.section1.title")}
          </h2>
          <p className="mb-4">{t("privacy.section1.description")}</p>

          <h3 className="text-xl font-semibold mt-4 mb-2">
            {t("privacy.section1.1.title")}
          </h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("privacy.section1.1.inspection")}</li>
            <li>{t("privacy.section1.1.camera")}</li>
            <li>{t("privacy.section1.1.location")}</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4 mb-2">
            {t("privacy.section1.2.title")}
          </h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("privacy.section1.2.reports")}</li>
            <li>{t("privacy.section1.2.functionality")}</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            {t("privacy.section2.title")}
          </h2>
          <p className="mb-4">{t("privacy.section2.description")}</p>
          <p className="mb-4">{t("privacy.section2.blockchain")}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            {t("privacy.section3.title")}
          </h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("privacy.section3.control")}</li>
            <li>{t("privacy.section3.permissions")}</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            {t("privacy.section4.title")}
          </h2>
          <p className="mb-4">{t("privacy.section4.description")}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            {t("privacy.section5.title")}
          </h2>
          <p className="mb-4">{t("privacy.section5.description")}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            {t("privacy.section6.title")}
          </h2>
          <p className="mb-4">{t("privacy.section6.description")}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            {t("privacy.section7.title")}
          </h2>
          <p className="mb-4">{t("privacy.section7.description")}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            {t("privacy.section8.title")}
          </h2>
          <p>{t("privacy.section8.contact")}</p>
        </div>
      </main>

      <Footer t={t} />
    </TranslationsProvider>
  );
}
