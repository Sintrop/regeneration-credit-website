import { contributorAdapter } from "./contributorAdapter";
import { contributorContract } from "./contributorContract";
import { ContributorProps } from "./types";

async function getContributor({ address }: { address: string }): Promise<ContributorProps> {
  const response = await contributorContract.getContributor({ address });
  return contributorAdapter.parseContributor(response);
}

async function getContributorAddress({ id }: { id: number }): Promise<string> {
  const response = await contributorContract.contributorsAddress({ id });
  return response;
}

export const contributorService = {
  getContributor,
  getContributorAddress
}