import { TType } from "@/types/t";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  link?: string;
  t: TType
}
export async function CardInfoWithLink({ description, link, title, t }: Props) {
  return (
    <div
      className="w-full h-auto lg:w-[30%] lg:h-[300px] bg-white rounded-[30px] p-5 md:p-10 gap-6 flex flex-col"
      data-aos="fade-up"
    >
      <h4 className="font-bold text-2xl">{title}</h4>
      <p className="text-gray-400">{description}</p>

      {link ? (
        <Link
          href={link}
          target="_blank"
          className="underline"
          rel="noreferer noopener"
        >
          {t('linkMoreInfo')}
        </Link>
      ) : (
        <p className="text-black">{t('commingSoon')}</p>
      )}
    </div>
  );
}
