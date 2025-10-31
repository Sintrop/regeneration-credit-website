import Web3 from "web3"
import InspectorRulesJson from "./InspectorRules.json"
import { InspectorContractProps } from "./types";

const provider = new Web3(process.env.NEXT_PUBLIC_RPC_URL)
const contract = new provider.eth.Contract(InspectorRulesJson.abi, process.env.NEXT_PUBLIC_INSPECTOR_ADDRESS)

async function getInspector({ address }: { address: string }): Promise<InspectorContractProps> {
  const response = await contract.methods.getInspector(address).call() as InspectorContractProps;
  return response;
}

async function inspectorsAddress({ id }: { id: number }): Promise<string> {
  const response = await contract.methods.inspectorsAddress(id).call() as string;
  return response;
}

export const inspectorContract = {
  getInspector,
  inspectorsAddress
}