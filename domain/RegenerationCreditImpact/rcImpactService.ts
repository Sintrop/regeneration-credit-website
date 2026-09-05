import { rcImpactContract } from "./rcImpactContract";

export interface ImpactData {
  trees: number;
  biodiversity: number;
  /** Grams of CO2 sequestered, as reported by the contract. */
  carbonGrams: number;
  /** Square metres under regeneration. */
  area: number;
  /** Regeneration Credits that back a single tree (1 / treesPerToken). */
  creditsPerTree: number;
}

async function getImpactData(): Promise<ImpactData> {
  const [trees, biodiversity, carbonGrams, area, treesPerToken] = await Promise.all([
    rcImpactContract.totalTreesImpact(),
    rcImpactContract.totalBiodiversityImpact(),
    rcImpactContract.totalCarbonImpact(),
    rcImpactContract.totalAreaImpact(),
    rcImpactContract.treesPerToken(),
  ]);

  return {
    trees,
    biodiversity,
    carbonGrams,
    area,
    creditsPerTree: treesPerToken > 0 ? 1 / treesPerToken : 0,
  };
}

export const rcImpactService = {
  getImpactData,
};
