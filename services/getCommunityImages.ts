import { activistService } from "@/domain/Activist/activistService";
import { communityService } from "@/domain/Community/communityService";
import { contributorService } from "@/domain/Contributor/contributorService";
import { developerService } from "@/domain/Developer/developerService";
import { inspectorService } from "@/domain/Inspector/inspectorService";
import { regeneratorService } from "@/domain/Regenerator/regeneratorService";
import { researcherService } from "@/domain/Researcher/researcherService";
import { supporterService } from "@/domain/Supporter/supporterService";

function ipfsUrl(hash?: string): string | null {
  if (!hash) return null;
  return `${process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL}/ipfs/${hash}`;
}

async function getPhotoHash(userType: number, id: number): Promise<string | undefined> {
  if (userType === 1) {
    const address = await regeneratorService.getRegeneratorAddress({ id });
    return (await regeneratorService.getRegenerator({ address })).proofPhoto;
  }
  if (userType === 2) {
    const address = await inspectorService.getInspectorAddress({ id });
    return (await inspectorService.getInspector({ address })).proofPhoto;
  }
  if (userType === 3) {
    const address = await researcherService.getResearcherAddress({ id });
    return (await researcherService.getResearcher({ address })).proofPhoto;
  }
  if (userType === 4) {
    const address = await developerService.getDeveloperAddress({ id });
    return (await developerService.getDeveloper({ address })).proofPhoto;
  }
  if (userType === 5) {
    const address = await contributorService.getContributorAddress({ id });
    return (await contributorService.getContributor({ address })).proofPhoto;
  }
  if (userType === 6) {
    const address = await activistService.getActivistAddress({ id });
    return (await activistService.getActivist({ address })).proofPhoto;
  }
  if (userType === 7) {
    const address = await supporterService.getSupporterAddress({ id });
    return (await supporterService.getSupporter({ address })).profilePhoto;
  }
  return undefined;
}

export async function getUsersImages({ userType }: { userType: number }): Promise<string[]> {
  const usersCount = await communityService.getUserTypesCount({ userType });
  if (!usersCount || usersCount < 1) return [];

  const ids = sortIds({
    count: usersCount < 4 ? usersCount : 4,
    max: usersCount,
    min: 1
  });

  const photosUrl: string[] = [];
  for (const id of ids) {
    try {
      const url = ipfsUrl(await getPhotoHash(userType, id));
      if (url) photosUrl.push(url);
    } catch {
      // Skip users whose on-chain data can't be resolved.
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
