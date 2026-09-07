import type { Metadata } from "next";
import Link from "next/link";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import { localizedAlternates } from "@/lib/metadata";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import {
  getCommunityApplications,
  CommunityApplication,
} from "@/services/github";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";

const i18nNamespaces = ["community"];

const ROLE_ORDER = [
  "regenerator",
  "inspector",
  "researcher",
  "developer",
  "contributor",
  "activist",
  "other",
];

export const revalidate = 600;

type Role = { slug: string; name: string };

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: `${t("applications.title")} — ${t("regenerationCredit")}`,
    description: t("applications.lead"),
    robots: { index: false, follow: true },
    alternates: localizedAlternates("/community/applications", locale),
  };
}

function shortWallet(wallet: string): string {
  return `${wallet.slice(0, 6)}…${wallet.slice(-4)}`;
}

function ApplicationCard({
  application,
  walletLabel,
  openLabel,
}: {
  application: CommunityApplication;
  walletLabel: string;
  openLabel: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5">
      <span className="font-medium text-ink">{application.name}</span>
      {application.wallet && (
        <span className="font-anta text-xs text-ink-soft">
          {walletLabel}: {shortWallet(application.wallet)}
        </span>
      )}
      {application.contribution && (
        <p className="text-sm text-ink-soft line-clamp-4">
          {application.contribution}
        </p>
      )}
      <a
        href={application.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-deep hover:underline"
      >
        {openLabel}
        <FiArrowUpRight size={15} />
      </a>
    </div>
  );
}

export default async function ApplicationsPage({ params }: Props) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const roles = t("roles", { returnObjects: true }) as Role[];
  const roleName = (slug: string) =>
    roles.find((role) => role.slug === slug)?.name ?? slug;

  const applications = await getCommunityApplications();
  const groups = ROLE_ORDER.map((slug) => ({
    slug,
    label: slug === "other" ? "" : roleName(slug),
    items: applications.filter((application) => application.role === slug),
  })).filter((group) => group.items.length > 0);

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
            {t("applications.title")}
          </h1>
          <p className="mt-4 text-white/80 text-lg max-w-2xl">
            {t("applications.lead")}
          </p>
        </section>
      </div>

      <main className="container mx-auto px-5 lg:px-20 py-14 lg:py-20">
        <Link
          href="/community"
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-deep hover:underline"
        >
          {t("applications.applyCta")}
          <FiArrowRight size={15} />
        </Link>

        {applications.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-line bg-surface p-10 text-center text-ink-soft">
            {t("applications.emptyState")}
          </p>
        ) : (
          <div className="mt-8 flex flex-col gap-12">
            {groups.map((group) => (
              <section key={group.slug}>
                {group.label && (
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                    {group.label}
                  </h2>
                )}
                <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      walletLabel={t("applications.walletLabel")}
                      openLabel={t("applications.openIssue")}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <p className="mt-12 text-xs text-ink-soft">
          {t("applications.disclaimer")}
        </p>
      </main>

      <Footer t={t} />
    </TranslationsProvider>
  );
}
