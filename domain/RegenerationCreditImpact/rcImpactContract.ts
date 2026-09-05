import Web3 from "web3";
import RegenerationCreditImpactJson from "./RegenerationCreditImpact.json";

const provider = new Web3(process.env.NEXT_PUBLIC_RPC_URL);
const contract = new provider.eth.Contract(
  RegenerationCreditImpactJson.abi,
  process.env.NEXT_PUBLIC_RCIMPACT_ADDRESS
);

const WEI = 10 ** 18;

async function readInteger(method: string): Promise<number> {
  const response = await contract.methods[method]().call();
  return Number(String(response).replace("n", ""));
}

async function readFixedPoint(method: string): Promise<number> {
  const response = await contract.methods[method]().call();
  return Number(String(response).replace("n", "")) / WEI;
}

export const rcImpactContract = {
  totalTreesImpact: () => readInteger("totalTreesImpact"),
  totalBiodiversityImpact: () => readInteger("totalBiodiversityImpact"),
  totalCarbonImpact: () => readInteger("totalCarbonImpact"),
  totalAreaImpact: () => readInteger("totalAreaImpact"),
  treesPerToken: () => readFixedPoint("treesPerToken"),
  carbonPerToken: () => readFixedPoint("carbonPerToken"),
  biodiversityPerToken: () => readFixedPoint("biodiversityPerToken"),
  areaPerToken: () => readFixedPoint("areaPerToken"),
};
