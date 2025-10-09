import Web3 from "web3"
import InspectionJson from "./InspectionRules.json"

const provider = new Web3(process.env.NEXT_PUBLIC_RPC_URL)
const contract = new provider.eth.Contract(InspectionJson.abi, process.env.NEXT_PUBLIC_INSPECTION_ADDRESS)

interface Props {
  era: number;
}
async function impactPerEra({ era }: Props): Promise<number> {
  try {
    const response = await contract.methods.impactPerEra(1).call();
    return parseFloat(String(response).replace('n', '')) / 10 ** 18;
  } catch (e) {
    console.log(e);
    return 0;
  }
}

export const inspectionContract = {
  impactPerEra
}