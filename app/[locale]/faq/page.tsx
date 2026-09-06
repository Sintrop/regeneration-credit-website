import type { Metadata } from "next";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import { OG_IMAGE, localizedAlternates, localizedUrl } from "@/lib/metadata";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { FiPlus } from "react-icons/fi";

const i18nNamespaces = ["faq"];

type QA = { q: string; a: string };

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
      url: localizedUrl("/faq", locale),
      locale,
      siteName: t("regenerationCredit"),
      images: OG_IMAGE,
    },
    alternates: localizedAlternates("/faq", locale),
  };
}

export default async function Faq({ params }: Props) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const items = t("items", { returnObjects: true }) as QA[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-hero-forest w-full flex flex-col">
        <Header t={t} />

        <section className="container mx-auto px-5 lg:px-20 pt-4 pb-14 lg:pt-10 lg:pb-24">
          <h1 className="text-white font-semibold text-4xl md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-white/80 text-lg max-w-2xl">{t("lead")}</p>
        </section>
      </div>

      <main className="container mx-auto px-5 lg:px-20 py-14 lg:py-20">
        <div className="mx-auto max-w-3xl flex flex-col gap-3">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-line bg-surface px-6 open:pb-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <FiPlus
                  size={20}
                  className="shrink-0 text-ink-soft transition-transform group-open:rotate-45"
                />
              </summary>
              <p className="text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </main>

      <Footer t={t} />
    </TranslationsProvider>
  );
}
