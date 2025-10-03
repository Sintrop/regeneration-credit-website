import { TType } from "@/types/t";
import Link from "next/link";
import { FaPlay } from "react-icons/fa6";

interface Props {
  t: TType;
  locale: string;
}
export function Hero({ t, locale }: Props) {
  const whitepaperFileName =
    locale === "pt" ? "credito-de-regeneracao.pdf" : "regeneration-credit.pdf";

  return (
    <section className="container mx-auto flex flex-col gap-10 px-5 pb-10 lg:pt-20 lg:px-20 lg:pb-36">
      <h2 className="text-white text-3xl text-center font-bold lg:max-w-[40%] lg:text-4xl lg:text-start">
        {t("titleHero")}
      </h2>

      <p className="text-white text-center lg:text-start lg:text-2xl lg:max-w-[50%]">
        {t("descriptionHero")}
      </p>

      <div className="flex flex-col items-center gap-5 md:gap-10 md:flex-row">
        <Link
          href="/tutorials"
          className="border-2 text-white border-white rounded-[40px] h-[50px] bg-transparent flex items-center justify-between pr-1 font-semibold gap-5 w-full md:w-auto pl-3"
        >
          {t("getStarted")}

          <div className="h-[40px] w-[40px] rounded-full bg-blue-primary flex items-center justify-center">
            <FaPlay size={20} color="white" />
          </div>
        </Link>

        <Link
          href={`https://regenerationcredit.org/assets/docs/${whitepaperFileName}`}
          className="bg-blue-primary w-full md:w-[295px] rounded-full flex items-center justify-center h-12 text-white"
          target="_blank"
          rel="noreferer noopener"
        >
          {t("downloadWhitepaper")}
        </Link>
      </div>
    </section>
  );
}
