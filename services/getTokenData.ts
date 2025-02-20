import { TokenProps } from "@/types/token";
import axios from 'axios';
import { web3 } from "./web3";

interface ReturnGetTokenDataProps{
    success: boolean;
    token: TokenProps
}
export async function getTokenData(): Promise<ReturnGetTokenDataProps>{
    try{
        const tokenData = await axios.get(`${process.env.NEXT_PUBLIC_API_CHAIN}/api/v2/tokens/${process.env.NEXT_PUBLIC_ADDRESS_RCTOKEN}`);
        const tokenCounters = await axios.get(`${process.env.NEXT_PUBLIC_API_CHAIN}/api/v2/tokens/${process.env.NEXT_PUBLIC_ADDRESS_RCTOKEN}/counters`);
        
        return {
            success: true,
            token: {
                ...tokenData.data,
                total_supply: web3.utils.fromWei(tokenData?.data?.total_supply, 'ether'),
                transfers_count: tokenCounters?.data?.transfers_count
            }
        }
    }catch(e){
        console.log(e);
        return {
            success: false,
            token: {} as TokenProps,
        }
    }
}