import { TType } from "@/types/t";

interface Props {
  t: TType;
}

export function WhatIsIt({ t }: Props) {
  const steps = [
    { title: t("step1Title"), description: t("step1Desc") },
    { title: t("step2Title"), description: t("step2Desc") },
    { title: t("step3Title"), description: t("step3Desc") },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-2xl">
        <h2 className="text-3xl md:text-4xl">{t("regenerateToEarn")}</h2>
        <p className="mt-4 text-lg text-ink-soft">{t("descWhatIsIt")}</p>
      </div>

      <ol className="mt-12 grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-2xl border border-line bg-surface p-6"
          >
            <span className="font-anta text-sm text-brand">
              0{index + 1}
            </span>
            <h3 className="mt-3 text-xl">{step.title}</h3>
            <p className="mt-2 text-ink-soft">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
