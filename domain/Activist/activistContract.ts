import Web3 from "web3"
import ActivistRulesJson from "./ActivistRules.json"
import { ActivistContractProps } from "./types";

const provider = new Web3(process.env.NEXT_PUBLIC_RPC_URL)
const contract = new provider.eth.Contract(ActivistRulesJson.abi, process.env.NEXT_PUBLIC_ACTIVIST_ADDRESS)

async function getActivist({ address }: { address: string }): Promise<ActivistContractProps> {
  const response = await contract.methods.getActivist(address).call() as ActivistContractProps;
  return response;
}

async function activistsAddress({ id }: { id: number }): Promise<string> {
  const response = await contract.methods.activistsAddress(id).call() as string;
  return response;
}

export const activistContract = {
  getActivist,
  activistsAddress
}