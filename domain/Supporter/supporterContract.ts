import Web3 from "web3"
import SupporterRulesJson from "./SupporterRules.json"
import { SupporterContractProps } from "./types";

const provider = new Web3(process.env.NEXT_PUBLIC_RPC_URL)
const contract = new provider.eth.Contract(SupporterRulesJson.abi, process.env.NEXT_PUBLIC_SUPPORTER_ADDRESS)

async function getSupporter({ address }: { address: string }): Promise<SupporterContractProps> {
  const response = await contract.methods.getSupporter(address).call() as SupporterContractProps;
  return response;
}

async function supportersAddress({ id }: { id: number }): Promise<string> {
  const response = await contract.methods.supportersAddress(id).call() as string;
  return response;
}

export const supporterContract = {
  getSupporter,
  supportersAddress
}