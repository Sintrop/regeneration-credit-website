import { TType } from "@/types/t";
import { StepFlow } from "./StepFlow";

interface Props {
  t: TType;
}

export function Invest({ t }: Props) {
  return (
    <StepFlow
      eyebrow={t("forSupporters")}
      title={t("investTitle")}
      description={t("investDesc")}
      steps={[
        { title: t("invest1Title"), description: t("invest1Desc") },
        { title: t("invest2Title"), description: t("invest2Desc") },
        { title: t("invest3Title"), description: t("invest3Desc") },
      ]}
    />
  );
}
