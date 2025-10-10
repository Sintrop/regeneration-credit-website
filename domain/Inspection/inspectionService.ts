import { inspectionContract } from "./inspectionContract"

interface ReturnGetTokenData {
  trees: number;
  biodiversity: number;
  inspections: number;
}
interface GetImpactPerEra {
  era: number;
}
async function getImpactPerEra({ era }: GetImpactPerEra): Promise<ReturnGetTokenData> {
  const response = await inspectionContract.impactPerEra({ era });

  return {
    trees: response.trees,
    biodiversity: response.biodiversity,
    inspections: response.inspections
  }
}

export const inspectionService = {
  getImpactPerEra
}