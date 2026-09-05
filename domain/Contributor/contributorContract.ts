import Web3 from "web3"
import ContributorRulesJson from "./ContributorRules.json"
import { ContributorContractProps, ContributionContractProps } from "./types";

const provider = new Web3(process.env.NEXT_PUBLIC_RPC_URL)
const contract = new provider.eth.Contract(ContributorRulesJson.abi, process.env.NEXT_PUBLIC_CONTRIBUTOR_ADDRESS)

async function getContributor({ address }: { address: string }): Promise<ContributorContractProps> {
  const response = await contract.methods.getContributor(address).call() as ContributorContractProps;
  return response;
}

async function contributorsAddress({ id }: { id: number }): Promise<string> {
  const response = await contract.methods.contributorsAddress(id).call() as string;
  return response;
}

async function contributionsTotalCount(): Promise<number> {
  const response = await contract.methods.contributionsTotalCount().call();
  return Number(String(response).replace("n", ""));
}

async function getContribution({ id }: { id: number }): Promise<ContributionContractProps> {
  const response = await contract.methods.getContribution(id).call() as ContributionContractProps;
  return response;
}

export const contributorContract = {
  getContributor,
  contributorsAddress,
  contributionsTotalCount,
  getContribution
}