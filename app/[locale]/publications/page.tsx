import type { Metadata } from "next";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import { OG_IMAGE, localizedAlternates, localizedUrl } from "@/lib/metadata";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { getPublications, Publication } from "@/services/getPublications";
import { FiArrowUpRight } from "react-icons/fi";

const i18nNamespaces = ["publications"];

export const revalidate = 300;

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
      url: localizedUrl("/publications", locale),
      locale,
      siteName: t("regenerationCredit"),
      images: OG_IMAGE,
    },
    alternates: localizedAlternates("/publications", locale),
  };
}

function cleanText(text: string): string {
  return text
    .replace(/^#+\s*/gm, "")
    .replace(
      /^(t[íi]tulo|title|thesis|tese|descri[çc][ãa]o|description|resumo|summary)\b[\s:\-]*/i,
      ""
    )
    .replace(/^(en|pt|es)\s+(?=[A-Z])/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function PublicationCard({
  publication,
  openLabel,
}: {
  publication: Publication;
  openLabel: string;
}) {
  const body = cleanText(publication.body);
  const heading = publication.title
    ? cleanText(publication.title)
    : body.length > 70
      ? `${body.slice(0, 70).trimEnd()}…`
      : body;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-6">
      <h3 className="text-lg leading-snug">{heading}</h3>
      {publication.title && (
        <p className="text-ink-soft text-sm line-clamp-4">{body}</p>
      )}
      {publication.fileUrl && (
        <a
          href={publication.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-deep hover:underline"
        >
          {openLabel}
          <FiArrowUpRight size={15} />
        </a>
      )}
    </div>
  );
}

function Group({
  label,
  items,
  openLabel,
}: {
  label: string;
  items: Publication[];
  openLabel: string;
}) {
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
        {label}
      </h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((publication) => (
          <PublicationCard
            key={`${publication.type}-${publication.id}`}
            publication={publication}
            openLabel={openLabel}
          />
        ))}
      </div>
    </section>
  );
}

export default async function PublicationsPage({ params }: Props) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const { researches, contributions, reports } = await getPublications();
  const isEmpty =
    researches.length === 0 &&
    contributions.length === 0 &&
    reports.length === 0;

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
            {t("title")}
          </h1>
          <p className="mt-4 text-white/80 text-lg max-w-2xl">{t("lead")}</p>
        </section>
      </div>

      <main className="container mx-auto px-5 lg:px-20 py-14 lg:py-20">
        {isEmpty ? (
          <p className="rounded-2xl border border-line bg-surface p-10 text-center text-ink-soft">
            {t("emptyState")}
          </p>
        ) : (
          <div className="flex flex-col gap-14">
            <Group
              label={t("researches")}
              items={researches}
              openLabel={t("openFile")}
            />
            <Group
              label={t("contributions")}
              items={contributions}
              openLabel={t("openFile")}
            />
            <Group
              label={t("reports")}
              items={reports}
              openLabel={t("openFile")}
            />
          </div>
        )}
      </main>

      <Footer t={t} />
    </TranslationsProvider>
  );
}
