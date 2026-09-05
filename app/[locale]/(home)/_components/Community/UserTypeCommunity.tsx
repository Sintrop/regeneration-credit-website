import { TType } from "@/types/t";
import { UsersImages } from "./UsersImages";

interface Props {
  userType: UserTypeToDataType;
  t: TType;
}
export function UserTypeCommunity({ userType, t }: Props) {
  const data = mapUserTypeToData[userType];

  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-line bg-surface p-5 md:flex-row md:items-start md:p-6">
      <div className="shrink-0">
        <UsersImages userType={userType} />
      </div>

      <div className="flex flex-col gap-2 text-center md:text-left">
        <h3 className="text-2xl">{t(data.title)}</h3>
        <p className="text-ink-soft">{t(data.description)}</p>
      </div>
    </div>
  );
}

const mapUserTypeToData = {
  1: { title: "community.regenerators", description: "community.descRegenerators" },
  2: { title: "community.inspectors", description: "community.descInspectors" },
  3: { title: "community.researchers", description: "community.descResearchers" },
  4: { title: "community.developers", description: "community.descDevelopers" },
  5: { title: "community.contributors", description: "community.descContributors" },
  6: { title: "community.activists", description: "community.descActivists" },
  7: { title: "community.supporters", description: "community.descSupporters" },
};
type UserTypeToDataType = keyof typeof mapUserTypeToData;
