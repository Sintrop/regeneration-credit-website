import { inspectionContract } from "./inspectionContract"

interface InspectionStats {
  realizedInspections: number;
  impactRegenerators: number;
}

async function getInspectionStats(): Promise<InspectionStats> {
  const [realizedInspections, impactRegenerators] = await Promise.all([
    inspectionContract.realizedInspectionsCount(),
    inspectionContract.totalImpactRegenerators(),
  ]);

  return { realizedInspections, impactRegenerators };
}

export const inspectionService = {
  getInspectionStats
}
