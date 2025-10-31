import { researcherAdapter } from "./researcherAdapter";
import { researcherContract } from "./researcherContract";
import { ResearcherProps } from "./types";

async function getResearcher({ address }: { address: string }): Promise<ResearcherProps> {
  const response = await researcherContract.getResearcher({ address });
  return researcherAdapter.parseResearcher(response);
}

async function getResearcherAddress({ id }: { id: number }): Promise<string> {
  const response = await researcherContract.researchersAddress({ id });
  return response;
}

export const researcherService = {
  getResearcher,
  getResearcherAddress
}