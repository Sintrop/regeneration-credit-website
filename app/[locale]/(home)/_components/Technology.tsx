import { TType } from "@/types/t";
import Link from "next/link";
import { FiArrowUpRight, FiDatabase, FiGithub, FiShield } from "react-icons/fi";

interface Props {
  t: TType;
}

export function Technology({ t }: Props) {
  const pillars = [
    {
      icon: FiGithub,
      title: t("openSourceTitle"),
      description: t("openSourceDesc"),
      linkLabel: t("viewCode"),
      href: "https://github.com/Sintrop/core-contracts",
    },
    {
      icon: FiDatabase,
      title: t("publicDataTitle"),
      description: t("publicDataDesc"),
      linkLabel: t("openExplorer"),
      href: "https://explorer.sintrop.com",
    },
    {
      icon: FiShield,
      title: t("auditedTitle"),
      description: t("auditedDesc"),
      linkLabel: t("readAudit"),
      href: "https://github.com/Sintrop/core-contracts/blob/main/audit/NM_0612_REGENERATION_CREDIT_FINAL.pdf",
    },
  ];

  return (
    <section className="border-t border-line bg-surface">
      <div className="container mx-auto px-5 lg:px-20 py-16 lg:py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-wide text-brand-deep">
            {t("technology")}
          </span>
          <p className="mt-3 text-2xl md:text-3xl font-display text-ink">
            {t("technologyLead")}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-page p-6"
            >
              <pillar.icon className="text-brand" size={24} />
              <h3 className="text-xl">{pillar.title}</h3>
              <p className="text-ink-soft flex-1">{pillar.description}</p>
              <Link
                href={pillar.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-deep hover:underline"
              >
                {pillar.linkLabel}
                <FiArrowUpRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
