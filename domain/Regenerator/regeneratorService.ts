import { regeneratorAdapter } from "./regeneratorAdapter";
import { regeneratorContract } from "./regeneratorContract";
import { RegeneratorProps } from "./types";

async function getRegenerator({ address }: { address: string }): Promise<RegeneratorProps> {
  const response = await regeneratorContract.getRegenerator({ address });
  return regeneratorAdapter.parseFromContract(response);
}

async function getRegeneratorAddress({ id }: { id: number }): Promise<string> {
  const response = await regeneratorContract.regeneratorsAddress({ id });
  return response;
}

export const regeneratorService = {
  getRegenerator,
  getRegeneratorAddress
}