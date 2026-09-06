import type { Metadata } from "next";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import { OG_IMAGE, localizedAlternates, localizedUrl } from "@/lib/metadata";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { getRegeneratorAreas } from "@/services/getRegeneratorAreas";
import { MapView } from "./MapView";

const i18nNamespaces = ["map"];

// Coordinates change rarely; re-read the contract at most once a week.
export const revalidate = 604800;

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
      url: localizedUrl("/map", locale),
      locale,
      siteName: t("regenerationCredit"),
      images: OG_IMAGE,
    },
    alternates: localizedAlternates("/map", locale),
  };
}

export default async function MapPage({ params }: Props) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const areas = await getRegeneratorAreas().catch(() => []);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className="bg-hero-forest w-full flex flex-col">
        <Header t={t} />

        <section className="container mx-auto px-5 lg:px-20 pt-4 pb-14 lg:pt-10 lg:pb-20">
          <h1 className="text-white font-semibold text-4xl md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-white/80 text-lg max-w-2xl">{t("lead")}</p>
          {areas.length > 0 && (
            <p className="mt-3 font-anta text-sm text-white/70">
              {t("areasCount", { count: areas.length })}
            </p>
          )}
        </section>
      </div>

      <main className="container mx-auto px-5 lg:px-20 py-10 lg:py-14">
        {areas.length === 0 ? (
          <p className="rounded-2xl border border-line bg-surface p-10 text-center text-ink-soft">
            {t("emptyState")}
          </p>
        ) : (
          <MapView
            areas={areas}
            areaLabel={t("areaUnit")}
            scoreLabel={t("score")}
            listTitle={t("areasListTitle")}
          />
        )}
      </main>

      <Footer t={t} />
    </TranslationsProvider>
  );
}
