import Web3 from "web3"
import InspectionJson from "./InspectionRules.json"

const provider = new Web3(process.env.NEXT_PUBLIC_RPC_URL)
const contract = new provider.eth.Contract(InspectionJson.abi, process.env.NEXT_PUBLIC_INSPECTION_ADDRESS)

function toNumber(value: unknown): number {
  return Number(String(value).replace('n', ''))
}

async function realizedInspectionsCount(): Promise<number> {
  const response = await contract.methods.realizedInspectionsCount().call();
  return toNumber(response);
}

async function totalImpactRegenerators(): Promise<number> {
  const response = await contract.methods.totalImpactRegenerators().call();
  return toNumber(response);
}

export const inspectionContract = {
  realizedInspectionsCount,
  totalImpactRegenerators
}
