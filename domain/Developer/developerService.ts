import { developerAdapter } from "./developerAdapter";
import { developerContract } from "./developerContract";
import { DeveloperProps } from "./types";

async function getDeveloper({ address }: { address: string }): Promise<DeveloperProps> {
  const response = await developerContract.getDeveloper({ address });
  return developerAdapter.parseFromContract(response);
}

async function getDeveloperAddress({ id }: { id: number }): Promise<string> {
  const response = await developerContract.developersAddress({ id });
  return response;
}

export const developerService = {
  getDeveloper,
  getDeveloperAddress
}