import Web3 from "web3"
import RegeneratorRulesJson from "./RegeneratorRules.json"
import { RegeneratorContractProps } from "./types";

const provider = new Web3(process.env.NEXT_PUBLIC_RPC_URL)
const contract = new provider.eth.Contract(RegeneratorRulesJson.abi, process.env.NEXT_PUBLIC_REGENERATOR_ADDRESS)

async function getRegenerator({ address }: { address: string }): Promise<RegeneratorContractProps> {
  const response = await contract.methods.getRegenerator(address).call() as RegeneratorContractProps;
  return response;
}

async function regeneratorsAddress({ id }: { id: number }): Promise<string> {
  const response = await contract.methods.regeneratorsAddress(id).call() as string;
  return response;
}

export const regeneratorContract = {
  getRegenerator,
  regeneratorsAddress
}