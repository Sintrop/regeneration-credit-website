import type { Metadata } from "next";
import Link from "next/link";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import { OG_IMAGE, localizedAlternates, localizedUrl } from "@/lib/metadata";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { FiArrowUpRight } from "react-icons/fi";

const i18nNamespaces = ["supporters"];

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
      url: localizedUrl("/supporters", locale),
      locale,
      siteName: t("regenerationCredit"),
      images: OG_IMAGE,
    },
    alternates: localizedAlternates("/supporters", locale),
  };
}

export default async function Supporters({ params }: Props) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const whitepaper =
    locale === "pt" ? "credito-de-regeneracao.pdf" : "regeneration-credit.pdf";

  const steps = [
    { title: t("step1Title"), body: t("step1Body") },
    { title: t("step2Title"), body: t("step2Body") },
    { title: t("step3Title"), body: t("step3Body") },
  ];

  const links = [
    {
      label: t("readWhitepaper"),
      href: `https://regenerationcredit.org/assets/${whitepaper}`,
      external: true,
    },
    { label: t("seeImpact"), href: "/", external: false },
    {
      label: t("openUsersPortal"),
      href: "https://users.regenerationcredit.org",
      external: true,
    },
    { label: t("getTheApp"), href: "/download", external: false },
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
          <span className="text-xs font-medium uppercase tracking-wide text-white/70">
            {t("getStarted")}
          </span>
          <h1 className="mt-3 text-white font-semibold text-4xl md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-white/80 text-lg max-w-2xl">{t("lead")}</p>
        </section>
      </div>

      <main className="container mx-auto px-5 lg:px-20 py-14 lg:py-20 flex flex-col gap-16">
        <section className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl">{t("whyTitle")}</h2>
          <p className="mt-4 text-ink-soft text-lg">{t("whyBody")}</p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl">{t("howTitle")}</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-line bg-surface p-6"
              >
                <span className="font-anta text-sm text-brand">0{index + 1}</span>
                <h3 className="mt-3 text-xl">{step.title}</h3>
                <p className="mt-2 text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-3xl bg-brand-forest text-white p-8 lg:p-12 max-w-4xl">
          <h2 className="text-2xl md:text-3xl">{t("certificateTitle")}</h2>
          <p className="mt-4 text-white/80 text-lg">{t("certificateBody")}</p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl">{t("startTitle")}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between gap-2 rounded-2xl border border-line bg-surface p-5 font-medium text-ink transition-colors hover:border-brand"
              >
                {link.label}
                <FiArrowUpRight
                  size={16}
                  className="text-ink-soft transition-colors group-hover:text-brand"
                />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer t={t} />
    </TranslationsProvider>
  );
}
