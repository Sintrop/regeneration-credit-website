import type { Metadata } from "next";
import Link from "next/link";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import { OG_IMAGE, localizedAlternates, localizedUrl } from "@/lib/metadata";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { UsersImages } from "@/app/[locale]/(home)/_components/Community/UsersImages";
import { communityService } from "@/domain/Community/communityService";
import { FiArrowUpRight } from "react-icons/fi";

const i18nNamespaces = ["community"];

export const revalidate = 600;

type Role = { name: string; what: string; earn: string };

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
      url: localizedUrl("/community", locale),
      locale,
      siteName: t("regenerationCredit"),
      images: OG_IMAGE,
    },
    alternates: localizedAlternates("/community", locale),
  };
}

export default async function Community({ params }: Props) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const roles = t("roles", { returnObjects: true }) as Role[];

  const counts = await Promise.all(
    roles.map((_, index) =>
      communityService
        .getUserTypesCount({ userType: index + 1 })
        .catch(() => null)
    )
  );

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className="bg-hero-forest w-full flex flex-col">
        <Header t={t} />

        <section className="container mx-auto px-5 lg:px-20 pt-4 pb-14 lg:pt-10 lg:pb-24">
          <h1 className="text-white font-semibold text-4xl md:text-5xl max-w-3xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-white/80 text-lg max-w-2xl">{t("lead")}</p>
        </section>
      </div>

      <main className="container mx-auto px-5 lg:px-20 py-14 lg:py-20">
        <div className="flex flex-col gap-5">
          {roles.map((role, index) => (
            <article
              key={role.name}
              className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 md:flex-row md:items-start"
            >
              <div className="shrink-0">
                <UsersImages userType={index + 1} />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-2xl">{role.name}</h2>
                  {counts[index] !== null && (
                    <span className="font-anta text-sm text-brand-deep">
                      {counts[index]} {t("membersLabel")}
                    </span>
                  )}
                </div>
                <p className="text-ink-soft">{role.what}</p>
                <p className="text-ink">
                  <span className="font-medium">{role.earn}</span>
                </p>
                {index === 0 && (
                  <Link
                    href="/map"
                    className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-brand-deep hover:underline"
                  >
                    {t("viewMap")}
                    <FiArrowUpRight size={15} />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        <section className="mt-14">
          <h2 className="text-2xl md:text-3xl">{t("ctaTitle")}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/map"
              className="group inline-flex items-center justify-between gap-2 rounded-2xl border border-line bg-surface p-5 font-medium text-ink transition-colors hover:border-brand"
            >
              {t("viewMap")}
              <FiArrowUpRight size={16} className="text-ink-soft group-hover:text-brand" />
            </Link>
            <Link
              href="https://users.regenerationcredit.org"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-between gap-2 rounded-2xl border border-line bg-surface p-5 font-medium text-ink transition-colors hover:border-brand"
            >
              {t("openUsersPortal")}
              <FiArrowUpRight size={16} className="text-ink-soft group-hover:text-brand" />
            </Link>
            <Link
              href="/download"
              className="group inline-flex items-center justify-between gap-2 rounded-2xl border border-line bg-surface p-5 font-medium text-ink transition-colors hover:border-brand"
            >
              {t("getTheApp")}
              <FiArrowUpRight size={16} className="text-ink-soft group-hover:text-brand" />
            </Link>
          </div>
        </section>
      </main>

      <Footer t={t} />
    </TranslationsProvider>
  );
}
