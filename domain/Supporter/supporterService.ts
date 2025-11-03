import { supporterAdapter } from "./supporterAdapter";
import { supporterContract } from "./supporterContract";
import { SupporterProps } from "./types";

async function getSupporter({ address }: { address: string }): Promise<SupporterProps> {
  const response = await supporterContract.getSupporter({ address });
  return supporterAdapter.parseSupporter(response);
}

async function getSupporterAddress({ id }: { id: number }): Promise<string> {
  const response = await supporterContract.supportersAddress({ id });
  return response;
}

export const supporterService = {
  getSupporter,
  getSupporterAddress
}