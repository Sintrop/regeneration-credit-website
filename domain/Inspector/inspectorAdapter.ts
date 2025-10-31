import { bigNumberToFloat } from "@/utils/bigNumberToFloat";
import { InspectorContractProps, InspectorProps } from "./types";

function parseFromContract(data: InspectorContractProps): InspectorProps {
  return {
    id: bigNumberToFloat(data.id),
    address: data.inspectorWallet,
    createdAt: bigNumberToFloat(data.createdAt),
    giveUps: bigNumberToFloat(data.giveUps),
    lastAcceptedAt: bigNumberToFloat(data.lastAcceptedAt),
    lastInspection: bigNumberToFloat(data.lastInspection),
    lastRealizedAt: bigNumberToFloat(data.lastRealizedAt),
    name: data.name,
    pool: {
      level: bigNumberToFloat(data.pool.level),
      currentEra: bigNumberToFloat(data.pool.currentEra),
    },
    proofPhoto: data.proofPhoto
  }
}
export const inspectorAdapter = {
  parseFromContract
}