import { TType } from "@/types/t";

interface Props {
  t: TType;
  title: string;
}

export function HeroTutorials({ t, title }: Props) {
  return (
    <section className="container mx-auto flex flex-col gap-10 px-5 pb-10 lg:pt-20 lg:px-20 lg:pb-36">
      <h1 className="text-white text-center font-bold text-4xl md:text-7xl">
        {t(title)}
      </h1>
    </section>
  );
}
