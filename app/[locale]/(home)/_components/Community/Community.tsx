import { TType } from "@/types/t";
import { UserTypeCommunity } from "./UserTypeCommunity";

interface Props {
  t: TType;
}
export async function Community({ t }: Props) {
  return (
    <section className="flex flex-col py-10 lg:py-20">
      <h3 className="font-bold text-3xl">{t("community.title")}</h3>
      <p className="text-lg mt-5">{t("community.description")}</p>

      <div className="flex flex-col gap-10 mt-10">
        <UserTypeCommunity t={t} userType={1} />
        <UserTypeCommunity t={t} userType={2} />
        <UserTypeCommunity t={t} userType={3} />
        <UserTypeCommunity t={t} userType={4} />
        <UserTypeCommunity t={t} userType={5} />
        <UserTypeCommunity t={t} userType={6} />
        <UserTypeCommunity t={t} userType={7} />
      </div>
    </section>
  );
}
