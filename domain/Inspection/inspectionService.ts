import { inspectionContract } from "./inspectionContract"

interface ReturnGetTokenData {
  totalTrees: number;
}
async function getImpactPerEra(): Promise<ReturnGetTokenData> {

  return {
    totalTrees: 0
  }
}

export const inspectionService = {
  getImpactPerEra
}