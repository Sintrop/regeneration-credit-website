import Web3 from "web3"
import ResearcherRulesJson from "./ResearcherRules.json"
import { ResearcherContractProps } from "./types";

const provider = new Web3(process.env.NEXT_PUBLIC_RPC_URL)
const contract = new provider.eth.Contract(ResearcherRulesJson.abi, process.env.NEXT_PUBLIC_RESEARCHER_ADDRESS)

async function getResearcher({ address }: { address: string }): Promise<ResearcherContractProps> {
  const response = await contract.methods.getResearcher(address).call() as ResearcherContractProps;
  return response;
}

async function researchersAddress({ id }: { id: number }): Promise<string> {
  const response = await contract.methods.researchersAddress(id).call() as string;
  return response;
}

export const researcherContract = {
  getResearcher,
  researchersAddress
}