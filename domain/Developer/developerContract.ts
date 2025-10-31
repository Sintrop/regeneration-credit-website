import Web3 from "web3"
import DeveloperRulesJson from "./DeveloperRules.json"
import { DeveloperContractProps } from "./types";

const provider = new Web3(process.env.NEXT_PUBLIC_RPC_URL)
const contract = new provider.eth.Contract(DeveloperRulesJson.abi, process.env.NEXT_PUBLIC_DEVELOPER_ADDRESS)

async function getDeveloper({ address }: { address: string }): Promise<DeveloperContractProps> {
  const response = await contract.methods.getDeveloper(address).call() as DeveloperContractProps;
  return response;
}

async function developersAddress({ id }: { id: number }): Promise<string> {
  const response = await contract.methods.developersAddress(id).call() as string;
  return response;
}

export const developerContract = {
  getDeveloper,
  developersAddress
}