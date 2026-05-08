import { Metadata } from "next";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import { Header } from "@/components/Header/Header";
import { HeroResources } from "./_components/HeroResources";
import { AccessAllResources } from "./_components/AccessAllResources";
//import { SocialNetwork } from "./_components/SocialNetwork";
import { Footer } from "@/components/Footer/Footer";
import { getReleasesFromGitHub } from "@/services/github";
import { ReleaseItem } from "./_components/ReleaseItem/ReleaseItem";

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

  const releasesRcCore = await getReleasesFromGitHub({
    repo: "regeneration-credit-core",
    username: "sintrop",
  });

  const releasesSintropia = await getReleasesFromGitHub({
    repo: "sintropia-method",
    username: "sintrop",
  });

  const releasesRcMobile = await getReleasesFromGitHub({
    repo: "regeneration-credit-mobile",
    username: "sintrop",
  });

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

      <main className="container mx-auto px-5 lg:px-20 py-10 lg:py-20">
        {/* App Store Links */}
        <h3 className="text-2xl md:text-3xl text-center mb-8">
          {t("downloadAppStores")}
        </h3>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
          <a
            href="https://play.google.com/store/apps/details?id=com.sintrop.activistapp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 01-.609-.92V.814a1 1 0 01.72-.72l10.19 10.19a.997.997 0 010 1.42l-10.18 10.19a1 1 0 01-.71.3 1 1 0 01-.71-1.71l10.2-10.19L2.9 2.604a1 1 0 01.71-1.71c.18 0 .36.05.52.15l-.001-.001.48-.48z"/>
              <path d="M20.5 11.19v-.38c-.47-.17-.98-.28-1.5-.28-1.54 0-2.89.92-3.57 2.24-.45-.63-.72-1.39-.72-2.21 0-.02 0-.04 0-.06-.01-.02-.01-.03-.02-.05-.29-.69-.72-1.31-1.28-1.81l-.5-.44c-.02-.02-.05-.03-.07-.05-.63-.53-1.37-.88-2.18-.99l-.06.12c.77.06 1.46.33 2.02.77.57.45 1.03.99 1.35 1.58l.11.21c-.5.33-.95.72-1.33 1.18-.57.69-.94 1.57-.94 2.58 0 .46.08.9.24 1.32.31.85.91 1.57 1.71 2.05.77.46 1.65.71 2.58.71.16 0 .31-.01.47-.03.87-.11 1.63-.5 2.27-1.13l.48-.48c-.5-.51-1.11-.93-1.79-1.22l.12-.22c.45.19.96.29 1.48.29.34 0 .68-.04 1-.11v-.5c0-.91-.32-1.74-.86-2.38z"/>
              <path d="M20.5 11.19v.38c.19.02.37.05.55.08-.22-.33-.48-.63-.77-.89l.22-.57z"/>
              <path d="M17.5 15.5c-.43 0-.81-.3-.94-.72h-1.15c.06.78-.1 1.58-.5 2.28-.46.81-1.2 1.44-2.11 1.78l.33.66c.6-.46 1.08-1.04 1.42-1.72h1.24c.17 0 .34 0 .5-.02.46.03.9-.11 1.21-.38v.01c.24-.21.38-.51.38-.84v-.37c0-.35-.16-.67-.41-.89l-.27-.21z"/>
              <path d="M17.5 12c.58 0 1.06.47 1.06 1.06v.38h1.06c.15-.35.23-.73.23-1.12 0-.94-.53-1.77-1.33-2.21-.35-.19-.73-.31-1.13-.35l.11.24z"/>
            </svg>
            <div className="text-left">
              <div className="text-xs text-gray-400">Baixar na</div>
              <div className="text-sm font-bold">Google Play</div>
            </div>
          </a>
          <a
            href="https://apps.apple.com/br/app/regeneration-credit/id6475600488"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.52.24 3.62 1.82-2.59 1.57-2.16 5.58.45 6.46l.27.13z"/>
            </svg>
            <div className="text-left">
              <div className="text-xs text-gray-400">Baixar na</div>
              <div className="text-sm font-bold">App Store</div>
            </div>
          </a>
        </div>

        <h3 className="text-2xl md:text-4xl">{t("releases")}</h3>

        <h4 className="text-xl mt-5">Regeneration Credit Core</h4>
        <div className="flex flex-col gap-5 mt-1">
          {releasesRcCore.map((release, index) => (
            <ReleaseItem
              key={index}
              t={t}
              release={release}
              latest={index === 0}
            />
          ))}
        </div>

        <h4 className="text-xl mt-7">{t("regenerationCredit")} (Mobile)</h4>
        <div className="flex flex-col gap-5 mt-1">
          {releasesRcMobile.map((release, index) => (
            <ReleaseItem
              key={index}
              t={t}
              release={release}
              latest={index === 0}
              apk
            />
          ))}
        </div>

        <h4 className="text-xl mt-7">Sintropia</h4>
        <div className="flex flex-col gap-5 mt-1">
          {releasesSintropia.map((release, index) => (
            <ReleaseItem
              key={index}
              t={t}
              release={release}
              latest={index === 0}
              apk
            />
          ))}
        </div>

        <div className="">
          <AccessAllResources t={t} locale={locale} />
        </div>

        {/* <SocialNetwork t={t} /> */}
      </main>

      <Footer t={t} />
    </TranslationsProvider>
  );
}
