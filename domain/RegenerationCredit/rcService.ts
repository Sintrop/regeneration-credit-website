import { rcContract } from "./rcContract"

interface ReturnGetTokenData {
  totalSupply: number;
  totalLocked: number;
  totalCertified: number;
  circulatingSupply: number;
}
async function getTokenData(): Promise<ReturnGetTokenData> {
  const totalSupply = await rcContract.totalSupply();
  const totalCertified = await rcContract.totalCertified();
  const totalLocked = await rcContract.totalLocked();

  return {
    circulatingSupply: totalSupply - totalLocked,
    totalCertified,
    totalLocked,
    totalSupply
  }
}

export const rcService = {
  getTokenData
}