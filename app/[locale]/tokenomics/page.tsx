import type { Metadata } from "next";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import { OG_IMAGE, localizedAlternates, localizedUrl } from "@/lib/metadata";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { getTokenomics, TOTAL_SUPPLY } from "@/services/getTokenomics";

const i18nNamespaces = ["tokenomics"];

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

const full = (n: number) => Intl.NumberFormat("en-US").format(Math.round(n));
const compact = (n: number) =>
  Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(n);
const pct = (n: number, base = TOTAL_SUPPLY) =>
  base > 0 ? (n / base) * 100 : 0;
const pct1 = (n: number, base = TOTAL_SUPPLY) => `${pct(n, base).toFixed(1)}%`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: t("seo-title"),
    description: t("seo-description"),
    openGraph: {
      type: "website",
      title: t("seo-title") as string,
      description: t("seo-description") as string,
      alternateLocale: ["en", "pt"],
      url: localizedUrl("/tokenomics", locale),
      locale,
      siteName: t("regenerationCredit") as string,
      images: OG_IMAGE,
    },
    alternates: localizedAlternates("/tokenomics", locale),
  };
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <div className="font-anta text-xl md:text-2xl text-brand-deep">{value}</div>
      <div className="mt-1 text-sm text-ink-soft">{label}</div>
    </div>
  );
}

export default async function TokenomicsPage({ params }: Props) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const data = await getTokenomics();
  const distributedPct = pct(data.distributed);
  const lockedPct = 100 - distributedPct;

  const poolName = (key: string) => t(`pools.${key}`) as string;
  const poolPurpose = (key: string) => t(`poolPurpose.${key}`) as string;

  // Share of a pool emitted per epoch (whitepaper: half of what remains each epoch).
  const epochs = [1, 2, 3, 4, 5, 6].map((n) => ({
    epoch: n,
    share: 100 / 2 ** n,
  }));

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
        </section>
      </div>

      <main className="container mx-auto px-5 lg:px-20 py-14 lg:py-20 flex flex-col gap-16">
        {/* Distribution so far */}
        <section>
          <h2 className="text-2xl md:text-3xl">{t("distributionTitle")}</h2>
          <p className="mt-3 text-ink-soft max-w-2xl">{t("distributionLead")}</p>

          <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
            <div className="flex items-end justify-between text-sm">
              <span className="font-medium text-brand-deep">
                {t("distributed")} · {pct1(data.distributed)}
              </span>
              <span className="font-medium text-ink-soft">
                {t("locked")} · {lockedPct.toFixed(1)}%
              </span>
            </div>
            <div className="mt-2 flex h-5 w-full overflow-hidden rounded-full bg-brand-tint">
              <div
                className="h-full bg-brand"
                style={{ width: `${distributedPct}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-ink-soft">
              {compact(data.distributed)} / {compact(data.totalSupply)} RC{" "}
              {t("ofFixedSupply", { total: compact(TOTAL_SUPPLY) })}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label={t("distributed")} value={compact(data.distributed)} />
            <Stat label={t("locked")} value={compact(data.locked)} />
            <Stat label={t("circulating")} value={compact(data.circulating)} />
            <Stat label={t("certified")} value={compact(data.certified)} />
          </div>
        </section>

        {/* Initial allocation */}
        <section>
          <h2 className="text-2xl md:text-3xl">{t("allocationTitle")}</h2>
          <p className="mt-3 text-ink-soft max-w-2xl">{t("allocationLead")}</p>

          <div className="mt-8 flex flex-col gap-3">
            {data.pools.map((pool) => {
              const releasedPct =
                pool.allocation > 0
                  ? (pool.distributed / pool.allocation) * 100
                  : 0;
              return (
                <div
                  key={pool.key}
                  className="rounded-2xl border border-line bg-surface p-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg">{poolName(pool.key)}</h3>
                    <span className="font-anta text-sm text-ink-soft">
                      {full(pool.allocation)} RC ·{" "}
                      {pct1(pool.allocation)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink-soft">
                    {poolPurpose(pool.key)}
                  </p>
                  <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-brand-tint">
                    <div
                      className="h-full bg-brand"
                      style={{ width: `${Math.min(releasedPct, 100)}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-ink-soft">
                    {t("releasedCol")}: {compact(pool.distributed)} RC (
                    {releasedPct.toFixed(1)}%)
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Emission schedule */}
        <section>
          <h2 className="text-2xl md:text-3xl">{t("emissionTitle")}</h2>
          <p className="mt-3 text-ink-soft max-w-2xl">{t("emissionLead")}</p>
          {data.era !== null && data.epoch !== null && (
            <p className="mt-3 font-anta text-sm text-brand-deep">
              {t("currentPosition", { era: data.era, epoch: data.epoch })}
            </p>
          )}

          <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
              {t("emissionChartTitle")}
            </p>
            <div className="mt-6 flex gap-3 h-40">
              {epochs.map((e) => (
                <div key={e.epoch} className="relative flex-1 rounded bg-brand-tint/60">
                  <div
                    className={`absolute inset-x-0 bottom-0 rounded bg-brand ${
                      data.epoch === e.epoch ? "" : "opacity-75"
                    }`}
                    style={{ height: `${Math.max(e.share, 1.5)}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-3">
              {epochs.map((e) => (
                <div key={e.epoch} className="flex flex-1 flex-col items-center">
                  <span className="font-anta text-xs text-ink">
                    {e.share.toFixed(e.share < 10 ? 1 : 0)}%
                  </span>
                  <span className="text-xs text-ink-soft">
                    {t("epochLabel")} {e.epoch}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-ink-soft">{t("emissionChartNote")}</p>
          </div>
        </section>

        {/* How rewards are shared */}
        <section>
          <h2 className="text-2xl md:text-3xl">{t("rewardsTitle")}</h2>
          <p className="mt-3 text-ink-soft max-w-2xl">{t("rewardsLead")}</p>
          <div className="mt-6 rounded-2xl bg-brand-forest text-white p-6 lg:p-8">
            <p className="font-anta text-sm md:text-base leading-relaxed">
              {t("rewardsFormula")}
            </p>
          </div>
        </section>

        {/* Offset and deflation */}
        <section className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl">{t("deflationTitle")}</h2>
          <p className="mt-3 text-ink-soft">{t("deflationLead")}</p>
        </section>
      </main>

      <Footer t={t} />
    </TranslationsProvider>
  );
}
