import { bigNumberToFloat } from "@/utils/bigNumberToFloat";
import { communityContract } from "./communityContract"

async function getUserTypesCount({ userType }: { userType: number }): Promise<number> {
  const response = await communityContract.userTypesCount({ userType });
  return bigNumberToFloat(response)
}

export const communityService = {
  getUserTypesCount
}