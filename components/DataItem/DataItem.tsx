import { JSX } from "react";

interface Props {
  label: string;
  value: string | number;
}

export function DataItem({ label, value }: Props): JSX.Element {
  return (
    <div className="flex flex-col gap-0.5 py-3 border-b border-line last:border-b-0">
      <span className="text-xs uppercase tracking-wide text-ink-soft">
        {label}
      </span>
      <span className="font-anta text-sm text-ink break-all">{value}</span>
    </div>
  );
}
