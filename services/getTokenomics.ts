import Web3 from "web3";
import { rcContract } from "@/domain/RegenerationCredit/rcContract";

/** Fixed total supply, from the whitepaper. No more tokens can ever be created. */
export const TOTAL_SUPPLY = 1_310_000_000;

/** Blocks per Era and Eras per Epoch, from the whitepaper. */
export const BLOCKS_PER_ERA = 1_152_000;
export const ERAS_PER_EPOCH = 12;

interface PoolAllocation {
  key: string;
  /** Immutable pool contract on the Sintrop Impact Blockchain, or null for the genesis allocation. */
  address: string | null;
  allocation: number;
}

// Initial allocation (whitepaper, Table 1). Pool addresses are immutable mainnet contracts.
// The regenerator pool is read first, so it must stay at index 0 (see getEraEpoch).
const POOLS: PoolAllocation[] = [
  { key: "regenerator", address: "0xFC222077860d34dEfA62Dd8A848703025B7b75f7", allocation: 750_000_000 },
  { key: "inspector", address: "0x3d7C162cf5c18432c3bb8535a96046A5e4E95ABB", allocation: 230_000_000 },
  { key: "researcher", address: "0x659962e70B2cD88886461e8165D56fA4C5CB4278", allocation: 40_000_000 },
  { key: "developer", address: "0xCd74352812802a476161815daD31A0197BC65BC5", allocation: 40_000_000 },
  { key: "contributor", address: "0xfc2A8ee64FF2a5E26cb150Ffc39e0C1B77b296B4", allocation: 40_000_000 },
  { key: "activist", address: "0x138EaB1427437F5B22E834863294a13b5CB9d175", allocation: 40_000_000 },
  { key: "validation", address: "0xA9E14EefACeb8b9E83592F6BC692BfdAA6F7f1F1", allocation: 10_000_000 },
  { key: "prelaunch", address: null, allocation: 160_000_000 },
];

const POOL_ERA_ABI = [
  { inputs: [], name: "currentContractEra", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "currentEpoch", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
] as const;

export interface PoolBreakdown {
  key: string;
  allocation: number;
  /** Tokens still held by the pool (undistributed). Null for the genesis allocation. */
  locked: number | null;
  distributed: number;
}

export interface Tokenomics {
  totalSupply: number;
  /** Tokens released from the pools since genesis. */
  distributed: number;
  /** Tokens still locked inside the pools. */
  locked: number;
  /** Tokens permanently burned for offset certificates. */
  certified: number;
  /** distributed minus certified. */
  circulating: number;
  pools: PoolBreakdown[];
  era: number | null;
  epoch: number | null;
}

async function getEraEpoch(): Promise<{ era: number | null; epoch: number | null }> {
  try {
    const provider = new Web3(process.env.NEXT_PUBLIC_RPC_URL);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pool = new provider.eth.Contract(POOL_ERA_ABI as any, POOLS[0].address as string);
    const [era, epoch] = await Promise.all([
      pool.methods.currentContractEra().call(),
      pool.methods.currentEpoch().call(),
    ]);
    return {
      era: Number(String(era).replace("n", "")),
      epoch: Number(String(epoch).replace("n", "")),
    };
  } catch {
    return { era: null, epoch: null };
  }
}

export async function getTokenomics(): Promise<Tokenomics> {
  const [locked, certified, balances, eraEpoch] = await Promise.all([
    rcContract.totalLocked(),
    rcContract.totalCertified(),
    Promise.all(
      POOLS.map((pool) =>
        pool.address ? rcContract.balanceOf(pool.address) : Promise.resolve(null)
      )
    ),
    getEraEpoch(),
  ]);

  const distributed = Math.max(TOTAL_SUPPLY - locked, 0);

  const pools: PoolBreakdown[] = POOLS.map((pool, index) => {
    const poolLocked = balances[index];
    return {
      key: pool.key,
      allocation: pool.allocation,
      locked: poolLocked,
      distributed:
        poolLocked === null
          ? pool.allocation
          : Math.max(pool.allocation - poolLocked, 0),
    };
  });

  return {
    totalSupply: TOTAL_SUPPLY,
    distributed,
    locked,
    certified,
    circulating: Math.max(distributed - certified, 0),
    pools,
    era: eraEpoch.era,
    epoch: eraEpoch.epoch,
  };
}
