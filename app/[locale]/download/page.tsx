import type { Metadata } from "next";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import { OG_IMAGE, localizedAlternates, localizedUrl } from "@/lib/metadata";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { AppStoreLinks } from "@/components/AppStoreLinks/AppStoreLinks";
import { getReleasesFromGitHub } from "@/services/github";
import { ReleaseItem } from "../resources/_components/ReleaseItem/ReleaseItem";

const i18nNamespaces = ["download"];

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
      url: localizedUrl("/download", locale),
      locale,
      siteName: t("regenerationCredit"),
      images: OG_IMAGE,
    },
    alternates: localizedAlternates("/download", locale),
  };
}

export default async function Download({ params }: Props) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const [releasesRcCore, releasesRcMobile, releasesSintropia] = await Promise.all([
    getReleasesFromGitHub({ repo: "regeneration-credit-core", username: "sintrop" }),
    getReleasesFromGitHub({ repo: "regeneration-credit-mobile", username: "sintrop" }),
    getReleasesFromGitHub({ repo: "sintropia-method", username: "sintrop" }),
  ]);

  const streams = [
    { name: "Regeneration Credit Core", releases: releasesRcCore, apk: false },
    { name: `${t("regenerationCredit")} (Mobile)`, releases: releasesRcMobile, apk: true },
    { name: "Sintropia", releases: releasesSintropia, apk: true },
  ];

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className="bg-hero-forest w-full flex flex-col">
        <Header t={t} />

        <section className="container mx-auto px-5 lg:px-20 pt-4 pb-14 lg:pt-10 lg:pb-24">
          <h1 className="text-white font-semibold text-4xl md:text-5xl">
            {t("downloadTitle")}
          </h1>
          <p className="mt-4 text-white/80 text-lg max-w-2xl">
            {t("downloadLead")}
          </p>
        </section>
      </div>

      <main className="container mx-auto px-5 lg:px-20 py-14 lg:py-20 flex flex-col gap-16">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
            {t("appStores")}
          </h2>
          <div className="mt-5">
            <AppStoreLinks />
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
            {t("desktopAndApk")}
          </h2>

          <div className="mt-6 flex flex-col gap-10">
            {streams.map((stream) => (
              <div key={stream.name}>
                <h3 className="text-xl">{stream.name}</h3>
                <div className="mt-3 flex flex-col gap-4">
                  {stream.releases.map((release, index) => (
                    <ReleaseItem
                      key={index}
                      t={t}
                      release={release}
                      latest={index === 0}
                      apk={stream.apk}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer t={t} />
    </TranslationsProvider>
  );
}
