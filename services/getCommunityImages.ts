import { communityService } from "@/domain/Community/communityService";
import { regeneratorService } from "@/domain/Regenerator/regeneratorService";

export async function getUsersImages({ userType }: { userType: number }): Promise<string[]> {
  const photosUrl: string[] = [];
  const usersCount = await communityService.getUserTypesCount({ userType });
  const ids = sortIds({
    count: usersCount < 4 ? usersCount : 4,
    max: usersCount,
    min: 1
  });

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    if (userType === 1) {
      const regeneratorAddress = await regeneratorService.getRegeneratorAddress({ id });
      const regenerator = await regeneratorService.getRegenerator({ address: regeneratorAddress });
      photosUrl.push(`${process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL}/ipfs/${regenerator.proofPhoto}`)
    }
  }

  return photosUrl;
}

interface SortIdsProps {
  count: number;
  min: number;
  max: number;
}
function sortIds({ count, max, min }: SortIdsProps): number[] {
  const ids: number[] = [];

  while (ids.length < count) {
    const id = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!ids.includes(id)) {
      ids.push(id)
    }
  }

  return ids;
}