import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import { OG_IMAGE, localizedAlternates, localizedUrl } from "@/lib/metadata";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { UsersImages } from "@/app/[locale]/(home)/_components/Community/UsersImages";
import { communityService } from "@/domain/Community/communityService";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";

const i18nNamespaces = ["community"];

const SLUGS = [
  "regenerator",
  "inspector",
  "researcher",
  "developer",
  "contributor",
  "activist",
  "supporter",
] as const;

const APPLICATIONS_REPO = "https://github.com/Sintrop/rc-community-applications";

export const revalidate = 600;

type RoleData = {
  slug: string;
  name: string;
  what: string;
  earn: string;
  intro: string;
  howToJoin: string;
};

type Props = {
  params: Promise<{ locale: string; role: string }>;
};

export function generateStaticParams() {
  return SLUGS.map((role) => ({ role }));
}

function roleFrom(t: (k: string, o?: object) => unknown, slug: string): RoleData | undefined {
  const roles = t("roles", { returnObjects: true }) as RoleData[];
  return roles.find((role) => role.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, role: slug } = await params;
  const { t } = await initTranslations(locale, i18nNamespaces);
  const role = roleFrom(t, slug);
  if (!role) return {};

  const title = `${role.name} — ${t("regenerationCredit")}`;
  return {
    title,
    description: role.intro,
    openGraph: {
      type: "website",
      title,
      description: role.intro,
      alternateLocale: ["en", "pt"],
      url: localizedUrl(`/community/${slug}`, locale),
      locale,
      siteName: t("regenerationCredit") as string,
      images: OG_IMAGE,
    },
    alternates: localizedAlternates(`/community/${slug}`, locale),
  };
}

export default async function RolePage({ params }: Props) {
  const { locale, role: slug } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const role = roleFrom(t, slug);
  if (!role) notFound();

  const userType = SLUGS.indexOf(slug as (typeof SLUGS)[number]) + 1;
  const count = await communityService
    .getUserTypesCount({ userType })
    .catch(() => null);

  const isSupporter = slug === "supporter";

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className="bg-hero-forest w-full flex flex-col">
        <Header t={t} />

        <section className="container mx-auto px-5 lg:px-20 pt-4 pb-14 lg:pt-8 lg:pb-20">
          <Link
            href="/community"
            className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white"
          >
            <FiArrowLeft size={14} />
            {t("backToCommunity")}
          </Link>
          <h1 className="mt-4 text-white font-semibold text-4xl md:text-5xl">
            {role.name}
          </h1>
          {count !== null && (
            <p className="mt-3 font-anta text-sm text-white/70">
              {count} {t("membersLabel")}
            </p>
          )}
        </section>
      </div>

      <main className="container mx-auto px-5 lg:px-20 py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-10">
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                {t("aboutRole")}
              </h2>
              <p className="mt-3 text-lg text-ink">{role.intro}</p>
            </section>

            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                {t("howYouEarnTitle")}
              </h2>
              <p className="mt-3 text-ink-soft">{role.earn}</p>
            </section>

            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                {t("howToJoinTitle")}
              </h2>
              <p className="mt-3 text-ink-soft">{role.howToJoin}</p>
            </section>
          </div>

          <aside className="flex flex-col gap-6">
            <UsersImages userType={userType} />

            <div className="rounded-2xl border border-line bg-surface p-6">
              {isSupporter ? (
                <Link
                  href="/supporters"
                  className="inline-flex w-full items-center justify-center rounded-full bg-brand px-6 h-12 font-semibold text-white transition-colors hover:bg-brand-deep"
                >
                  {t("startSupporting")}
                </Link>
              ) : (
                <>
                  <Link
                    href={`${APPLICATIONS_REPO}/issues/new?template=${slug}.yml`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 h-12 font-semibold text-white transition-colors hover:bg-brand-deep"
                  >
                    {t("applyOnGithub")}
                    <FiArrowUpRight size={16} />
                  </Link>
                  <p className="mt-3 text-xs text-ink-soft">{t("noGithubNote")}</p>
                </>
              )}
            </div>
          </aside>
        </div>
      </main>

      <Footer t={t} />
    </TranslationsProvider>
  );
}
