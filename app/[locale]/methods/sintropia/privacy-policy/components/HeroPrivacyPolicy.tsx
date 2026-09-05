import { TType } from "@/types/t";

interface Props {
  t: TType;
  title: string;
}

export function HeroPrivacyPolicy({ t, title }: Props) {
  return (
    <section className="container mx-auto px-5 lg:px-20 pt-4 pb-14 lg:pt-10 lg:pb-24">
      <h1 className="text-white font-semibold text-3xl md:text-4xl max-w-3xl">
        {t(title)}
      </h1>
    </section>
  );
}
