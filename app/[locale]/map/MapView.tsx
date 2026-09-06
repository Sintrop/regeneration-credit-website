"use client";

import dynamic from "next/dynamic";
import { RegeneratorArea } from "@/services/getRegeneratorAreas";

const RegeneratorsMap = dynamic(() => import("./RegeneratorsMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[65vh] min-h-[420px] w-full rounded-2xl border border-line bg-surface-sunken" />
  ),
});

interface Props {
  areas: RegeneratorArea[];
  areaLabel: string;
  scoreLabel: string;
  listTitle: string;
}

export function MapView(props: Props) {
  return <RegeneratorsMap {...props} />;
}
