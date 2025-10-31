import { DataItem } from "@/components/DataItem/DataItem";
import { JSX } from "react";

interface Props {
  id: number;
  name: string;
  coinName: string;
  rpc: string;
  explorer: string;
}
export function NetworkData({
  coinName,
  explorer,
  id,
  name,
  rpc,
}: Props): JSX.Element {
  return (
    <div className="flex flex-col gap-1 w-full max-w-[500px]">
      <p className="text-black">Network data</p>
      <div className="rounded-2xl p-3 border flex flex-col gap-1">
        <DataItem label="ID" value={id} />
        <DataItem label="Name" value={name} />
        <DataItem label="Coin name" value={coinName} />
        <DataItem label="RPC" value={rpc} />
        <DataItem label="Explorer" value={explorer} />
      </div>
    </div>
  );
}
