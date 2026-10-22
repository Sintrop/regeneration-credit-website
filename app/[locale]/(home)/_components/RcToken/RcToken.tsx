import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { TType } from "@/types/t";
import { QrToken } from "./QrToken";
import { AddTokenToMetamask } from "./AddTokenToMetamask";
import { StatCard } from "./StatCard";
import { rcService } from "@/domain/RegenerationCredit/rcService";
import { rcImpactService } from "@/domain/RegenerationCreditImpact/rcImpactService";
import { inspectionService } from "@/domain/Inspection/inspectionService";

interface Props {
  t: TType;
}

export async function RcToken({ t }: Props) {
  const tokenData = await rcService.getTokenData();

  const [impact, inspectionStats] = await Promise.all([
    rcImpactService.getImpactData().catch(() => null),
    inspectionService.getInspectionStats().catch(() => null),
  ]);

  return (
    <section className="py-14 lg:py-20">
      <div className="flex flex-col gap-2">
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-brand-deep">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {t("liveOnchain")}
        </span>
        <h2 className="text-3xl md:text-4xl">
          {t("regenerationCredit")} <span className="font-anta text-2xl md:text-3xl align-middle">(RC)</span>
        </h2>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
            {t("impact")}
          </h3>

          {impact && inspectionStats ? (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <StatCard label={t("trees")} value={impact.trees} />
              <StatCard label={t("biodiversity")} value={impact.biodiversity} />
              <StatCard
                label={t("co2Sequestered")}
                value={impact.carbonGrams / 1_000_000}
                unit="t"
              />
              <StatCard
                label={t("areaInRegeneration")}
                value={impact.area / 10_000}
                unit="ha"
                decimals={1}
              />
              <StatCard
                label={t("impactRegenerators")}
                value={inspectionStats.impactRegenerators}
              />
              <StatCard
                label={t("inspections")}
                value={inspectionStats.realizedInspections}
              />
            </div>
          ) : (
            <p className="mt-4 rounded-2xl border border-line bg-surface p-5 text-sm text-ink-soft">
              {t("dataUnavailable")}
            </p>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
            {t("token")}
          </h3>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <StatCard label={t("totalSupply")} value={tokenData.totalSupply} />
            <StatCard
              label={t("circulatingSupply")}
              value={tokenData.circulatingSupply}
            />
            <StatCard
              label={t("totalCertified")}
              value={tokenData.totalCertified}
            />
            {impact && (
              <StatCard
                label={t("creditsPerTree")}
                value={impact.creditsPerTree}
              />
            )}
          </div>

          <Link
            href="/tokenomics"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-deep hover:underline"
          >
            {t("tokenomicsLink")}
            <FiArrowRight size={15} />
          </Link>

          <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface p-5">
            <div className="flex items-center gap-4">
              <QrToken />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-ink">
                  {t("accessTheToken")}
                </span>
                <span className="text-xs text-ink-soft break-all">
                  {process.env.NEXT_PUBLIC_RCTOKEN_ADDRESS}
                </span>
              </div>
            </div>
            <AddTokenToMetamask />
          </div>
        </div>
      </div>
    </section>
  );
}
