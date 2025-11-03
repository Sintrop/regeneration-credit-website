import { activistAdapter } from "./activistAdapter";
import { activistContract } from "./activistContract";
import { ActivistProps } from "./types";

async function getActivist({ address }: { address: string }): Promise<ActivistProps> {
  const response = await activistContract.getActivist({ address });
  return activistAdapter.parseActivist(response);
}

async function getActivistAddress({ id }: { id: number }): Promise<string> {
  const response = await activistContract.activistsAddress({ id });
  return response;
}

export const activistService = {
  getActivist,
  getActivistAddress
}
