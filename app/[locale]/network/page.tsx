import { Metadata } from "next";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { HeroNetwork } from "./components/HeroNetwork";
import { AddToMetamask } from "@/components/AddToMetamask/AddToMetamask";
import { NetworkData } from "./components/NetworkData";

const i18nNamespaces = ["network"];

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
      url: `https://regenerationcredit.org/${locale}/network`,
      locale,
      siteName: t("regenerationCredit"),
      images: "https://regenerationcredit.org/assets/img/og.jpg",
    },
    alternates: {
      canonical: "https://regenerationcredit.org/network",
      languages: {
        en: "https://regenerationcredit.org/en/network",
        pt: "https://regenerationcredit.org/pt/network",
      },
    },
  };
}

export default async function Network({ params }: Props) {
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

        <HeroNetwork t={t} />
      </div>

      <main className="container mx-auto px-5 lg:px-20 py-10 lg:py-20">
        <div className="flex flex-wrap w-full gap-10">
          <div className="flex flex-col w-full lg:w-[50%] gap-4">
            <h3 className="text-2xl md:text-4xl">Sintrop Impact Blockchain</h3>

            <AddToMetamask networkPage />
          </div>

          <NetworkData
            coinName="Sintrop (SIN)"
            name="Sintrop"
            explorer="https://explorer.sintrop.com"
            id={250225}
            rpc="https://rpc.sintrop.com"
          />
        </div>
      </main>

      <Footer t={t} />
    </TranslationsProvider>
  );
}
