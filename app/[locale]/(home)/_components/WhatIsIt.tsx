import { TType } from "@/types/t";
import { StepFlow } from "./StepFlow";

interface Props {
  t: TType;
}

export function WhatIsIt({ t }: Props) {
  return (
    <StepFlow
      eyebrow={t("forRegenerators")}
      title={t("regenerateToEarn")}
      description={t("descWhatIsIt")}
      steps={[
        { title: t("step1Title"), description: t("step1Desc") },
        { title: t("step2Title"), description: t("step2Desc") },
        { title: t("step3Title"), description: t("step3Desc") },
      ]}
    />
  );
}
