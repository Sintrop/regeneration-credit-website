import { DataItem } from "@/components/DataItem/DataItem";
import { JSX } from "react";
import { TType } from "@/types/t";

interface Props {
  t: TType;
  id: number;
  name: string;
  coinName: string;
  rpc: string;
  explorer: string;
}
export function NetworkData({
  t,
  coinName,
  explorer,
  id,
  name,
  rpc,
}: Props): JSX.Element {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
        {t("networkData")}
      </h2>
      <div className="mt-4 rounded-2xl border border-line bg-surface px-5">
        <DataItem label="ID" value={id} />
        <DataItem label="Name" value={name} />
        <DataItem label="Coin name" value={coinName} />
        <DataItem label="RPC" value={rpc} />
        <DataItem label="Explorer" value={explorer} />
      </div>
    </div>
  );
}
