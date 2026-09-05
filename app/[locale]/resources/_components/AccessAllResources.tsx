import { TType } from "@/types/t";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

interface Props {
  t: TType;
  locale: string;
}
export function AccessAllResources({ t, locale }: Props) {
  const whitepaperFileName =
    locale === "pt" ? "credito-de-regeneracao.pdf" : "regeneration-credit.pdf";

  const items = [
    {
      title: t("whitepaper"),
      description: t("descPaper"),
      href: `https://regenerationcredit.org/assets/${whitepaperFileName}`,
      external: true,
    },
    {
      title: t("documentation"),
      description: t("descDocs"),
      href: "https://docs.regenerationcredit.org",
      external: true,
    },
    {
      title: t("sourceCode"),
      description: t("descGithub"),
      href: "https://github.com/Sintrop/core-contracts",
      external: true,
    },
    {
      title: t("explorer"),
      description: t("descExplorer"),
      href: "https://explorer.sintrop.com",
      external: true,
    },
    {
      title: t("usersPortal"),
      description: t("descUsers"),
      href: "https://users.regenerationcredit.org",
      external: true,
    },
    {
      title: t("downloadApps"),
      description: t("descDownloadApps"),
      href: "/download",
      external: false,
    },
  ];

  return (
    <section>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="group flex flex-col gap-3 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-brand"
          >
            <h3 className="flex items-center justify-between gap-2 text-xl">
              {item.title}
              <FiArrowUpRight
                size={18}
                className="text-ink-soft transition-colors group-hover:text-brand"
              />
            </h3>
            <p className="text-ink-soft">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
