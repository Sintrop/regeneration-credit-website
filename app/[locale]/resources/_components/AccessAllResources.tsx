import { CardInfoWithLink } from "@/components/CardInfoWithLink/CardInfoWithLink";
import { TType } from "@/types/t";

interface Props {
  t: TType;
  locale: string;
}
export async function AccessAllResources({ t, locale }: Props) {
  const whitepaperFileName =
    locale === "pt" ? "credito-de-regeneracao.pdf" : "regeneration-credit.pdf";

  return (
    <section className="w-full bg-[#08514C] rounded-[40px] px-5 py-10 lg:px-20 lg:py-20 mt-20 mb-10">
      <h3 className="font-bold text-white text-3xl">
        {t("accessAllResources")}
      </h3>

      <div className="flex flex-wrap mt-10 gap-10 lg:gap-5 justify-center">
        <CardInfoWithLink
          title="Whitepapper"
          description={t("descPaper")}
          link={`https://regenerationcredit.org/assets/${whitepaperFileName}`}
          t={t}
        />

        <CardInfoWithLink
          title="Github"
          description={t("descGithub")}
          link="https://github.com/sintrop/regeneration-credit"
          t={t}
        />

        <CardInfoWithLink
          title="Documentation"
          description={t("descDocs")}
          link="https://docs.regenerationcredit.org"
          t={t}
        />
      </div>
    </section>
  );
}
