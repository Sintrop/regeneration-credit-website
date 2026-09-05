import type { Metadata } from "next";
import { OG_IMAGE, localizedAlternates, localizedUrl } from "@/lib/metadata";
import initTranslations from "../../i18n";
import TranslationsProvider from "../../../components/TranslationsProvider";
import { Header } from "@/components/Header/Header";
import { HeroTutorials } from "./components/HeroTutorials";
import { TutorialItem } from "./components/TutorialItem/TutorialItem";
import { Accordion } from "@/components/ui/accordion";
import {
  LanguagesAvailablesForTutorials,
  tutorialsListPerLanguage,
} from "./tutorialsList";
import { Footer } from "@/components/Footer/Footer";

const i18nNamespaces = ["tutorials"];

type Props = {
  params: Promise<{ locale: LanguagesAvailablesForTutorials }>;
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
      url: localizedUrl("/tutorials", locale),
      locale,
      siteName: t("regenerationCredit"),
      images: OG_IMAGE,
    },
    alternates: localizedAlternates("/tutorials", locale),
  };
}

export default async function Tutorials({ params }: Props) {
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
        <HeroTutorials t={t} title="tutorials" />
      </div>

      <main className="container mx-auto px-5 lg:px-20 py-14 lg:py-20">
        {tutorialsListPerLanguage[locale].length === 0 ? (
          <div className="rounded-2xl border border-line bg-surface p-10 text-center text-ink-soft">
            {t("commingSoon")}
          </div>
        ) : (
          <Accordion type="single" collapsible className="gap-4 flex flex-col">
            {tutorialsListPerLanguage[locale].map((item, index) => (
              // @ts-expect-error async server component used as a JSX child
              <TutorialItem key={index} index={index} item={item} t={t} />
            ))}
          </Accordion>
        )}
      </main>

      <Footer t={t} />
    </TranslationsProvider>
  );
}
