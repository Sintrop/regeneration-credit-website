import Web3 from "web3"
import InspectionJson from "./InspectionRules.json"

const provider = new Web3(process.env.NEXT_PUBLIC_RPC_URL)
const contract = new provider.eth.Contract(InspectionJson.abi, process.env.NEXT_PUBLIC_INSPECTION_ADDRESS)

interface ReturnImpactPerEra {
  trees: number;
  biodiversity: number;
  inspections: number;
}
interface ImpactPerEraProps {
  era: number;
}
async function impactPerEra({ era }: ImpactPerEraProps): Promise<ReturnImpactPerEra> {
  try {
    const response = await contract.methods.impactPerEra(era).call() as { trees: string; biodiversity: string; realizedInspections: string; };

    return {
      biodiversity: parseFloat(String(response.biodiversity).replace('n', '')),
      trees: parseFloat(String(response.trees).replace('n', '')),
      inspections: parseFloat(String(response.realizedInspections).replace('n', ''))
    }
  } catch (e) {
    console.log(e);
    return {
      biodiversity: 0,
      inspections: 0,
      trees: 0
    };
  }
}

export const inspectionContract = {
  impactPerEra
}