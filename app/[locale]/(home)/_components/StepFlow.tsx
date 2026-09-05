interface Step {
  title: string;
  description: string;
}

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  steps: Step[];
}

export function StepFlow({ eyebrow, title, description, steps }: Props) {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-2xl">
        <span className="text-xs font-medium uppercase tracking-wide text-brand-deep">
          {eyebrow}
        </span>
        <h2 className="mt-3 text-3xl md:text-4xl">{title}</h2>
        <p className="mt-4 text-lg text-ink-soft">{description}</p>
      </div>

      <ol className="mt-12 grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-2xl border border-line bg-surface p-6"
          >
            <span className="font-anta text-sm text-brand">0{index + 1}</span>
            <h3 className="mt-3 text-xl">{step.title}</h3>
            <p className="mt-2 text-ink-soft">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
