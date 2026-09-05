import { TType } from "@/types/t";
import { UserTypeCommunity } from "./UserTypeCommunity";

interface Props {
  t: TType;
}
export function Community({ t }: Props) {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-2xl">
        <h2 className="text-3xl md:text-4xl">{t("community.title")}</h2>
        <p className="mt-4 text-lg text-ink-soft">{t("community.description")}</p>
      </div>

      <div className="mt-12 flex flex-col gap-4">
        {([1, 2, 3, 4, 5, 6, 7] as const).map((userType) => (
          <UserTypeCommunity key={userType} t={t} userType={userType} />
        ))}
      </div>
    </section>
  );
}
