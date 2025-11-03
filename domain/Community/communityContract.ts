import Web3 from "web3"
import CommunityRulesJson from "./CommunityRules.json"

const provider = new Web3(process.env.NEXT_PUBLIC_RPC_URL)
const contract = new provider.eth.Contract(CommunityRulesJson.abi, process.env.NEXT_PUBLIC_COMMUNITY_ADDRESS)

async function userTypesCount({ userType }: { userType: number }): Promise<string> {
  const response = await contract.methods.userTypesCount(userType).call() as string;
  return response;
}

export const communityContract = {
  userTypesCount
}