import { TType } from "@/types/t";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";

interface Props {
  t: TType;
  locale: string;
}
export function Hero({ t, locale }: Props) {
  const whitepaperFileName =
    locale === "pt" ? "credito-de-regeneracao.pdf" : "regeneration-credit.pdf";

  return (
    <section className="container mx-auto px-5 lg:px-20 pt-8 pb-20 lg:pt-16 lg:pb-32">
      <div className="max-w-3xl">
        <h1 className="text-white font-semibold text-[2.1rem] leading-[1.1] sm:text-5xl lg:text-6xl lg:leading-[1.05]">
          {t("titleHero")}
        </h1>

        <p className="mt-6 text-white/80 text-lg lg:text-xl lg:max-w-[85%]">
          {t("descriptionHero")}
        </p>

        <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/download"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 h-12 font-semibold text-brand-forest transition-colors hover:bg-brand-tint"
          >
            {t("getStarted")}
            <FaArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>

          <Link
            href={`https://regenerationcredit.org/assets/${whitepaperFileName}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 h-12 font-medium text-white transition-colors hover:bg-white/10"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiDownload size={16} />
            {t("downloadWhitepaper")}
          </Link>
        </div>
      </div>
    </section>
  );
}
