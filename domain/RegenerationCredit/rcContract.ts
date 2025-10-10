import Web3 from "web3"
import RegenerationCreditJson from "./RegenerationCredit.json"

const provider = new Web3(process.env.NEXT_PUBLIC_RPC_URL)
const contract = new provider.eth.Contract(RegenerationCreditJson.abi, process.env.NEXT_PUBLIC_RCTOKEN_ADDRESS)

async function totalSupply(): Promise<number> {
  try {
    const response = await contract.methods.totalSupply().call();
    return parseFloat(String(response).replace('n', '')) / 10 ** 18;
  } catch (e) {
    console.log(e);
    return 0;
  }
}

async function totalLocked(): Promise<number> {
  try {
    const response = await contract.methods.totalLocked().call();
    return parseFloat(String(response).replace('n', '')) / 10 ** 18;
  } catch (e) {
    console.log(e);
    return 0;
  }
}

async function totalCertified(): Promise<number> {
  try {
    const response = await contract.methods.totalCertified().call();
    return parseFloat(String(response).replace('n', '')) / 10 ** 18;
  } catch (e) {
    console.log(e);
    return 0;
  }
}

export const rcContract = {
  totalSupply,
  totalLocked,
  totalCertified
}