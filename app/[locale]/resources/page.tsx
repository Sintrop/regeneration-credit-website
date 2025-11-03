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
