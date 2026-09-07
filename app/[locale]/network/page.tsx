import { Metadata } from "next";
import TranslationsProvider from "@/components/TranslationsProvider";
import { OG_IMAGE, localizedAlternates, localizedUrl } from "@/lib/metadata";
import initTranslations from "@/app/i18n";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { HeroNetwork } from "./components/HeroNetwork";
import { AddToMetamask } from "@/components/AddToMetamask/AddToMetamask";
import { NetworkData } from "./components/NetworkData";

const METAMASK_GUIDE_URL =
  "https://ipfs.sintrop.com/ipfs/QmStSpPexGVQsLnkimNabGrDbhuAPcmUS5x61r7q5Uvg94";

const i18nNamespaces = ["network"];

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;
  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: t("seo-title-network"),
    description: t("seo-description-network"),
    openGraph: {
      type: "website",
      title: t("seo-title-network") as string,
      description: t("seo-description-network") as string,
      alternateLocale: ["en", "pt"],
      url: localizedUrl("/network", locale),
      locale,
      siteName: t("regenerationCredit"),
      images: OG_IMAGE,
    },
    alternates: localizedAlternates("/network", locale),
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
      <div className="bg-hero-forest w-full flex flex-col">
        <Header t={t} />

        <HeroNetwork t={t} />
      </div>

      <main className="container mx-auto px-5 lg:px-20 py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl">Sintrop Impact Blockchain</h2>
            <p className="text-ink-soft">{t("networkLead")}</p>
            <Link
              href="https://www.sintrop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-deep hover:underline"
            >
              {t("aboutSintrop")}
              <FiArrowUpRight size={15} />
            </Link>

            <div className="mt-4 rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-lg">{t("connectTitle")}</h3>
              <p className="mt-2 text-ink-soft text-sm">{t("connectLead")}</p>
              <div className="mt-4">
                <AddToMetamask networkPage />
              </div>
              <Link
                href={METAMASK_GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-deep hover:underline"
              >
                {t("metamaskGuide")}
                <FiArrowUpRight size={15} />
              </Link>
              <p className="mt-1 text-xs text-ink-soft">
                {t("metamaskGuideNote")}
              </p>
            </div>
          </div>

          <NetworkData
            t={t}
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
