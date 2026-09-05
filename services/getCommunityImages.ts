import { activistService } from "@/domain/Activist/activistService";
import { communityService } from "@/domain/Community/communityService";
import { contributorService } from "@/domain/Contributor/contributorService";
import { developerService } from "@/domain/Developer/developerService";
import { inspectorService } from "@/domain/Inspector/inspectorService";
import { regeneratorService } from "@/domain/Regenerator/regeneratorService";
import { researcherService } from "@/domain/Researcher/researcherService";
import { supporterService } from "@/domain/Supporter/supporterService";

const MAX_PHOTOS = 4;
// Sample more candidates than needed so a user type still fills the grid when
// some registered members have no photo on-chain.
const MAX_CANDIDATES = 8;

function ipfsUrl(hash?: string): string | null {
  if (!hash || hash.trim() === "") return null;
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

async function resolvePhoto(userType: number, id: number): Promise<string | null> {
  try {
    return ipfsUrl(await getPhotoHash(userType, id));
  } catch {
    return null;
  }
}

export async function getUsersImages({ userType }: { userType: number }): Promise<string[]> {
  const usersCount = Number(await communityService.getUserTypesCount({ userType }));
  if (!usersCount || usersCount < 1) return [];

  const candidateIds = pickRandomIds({
    count: Math.min(usersCount, MAX_CANDIDATES),
    min: 1,
    max: usersCount,
  });

  const resolved = await Promise.all(
    candidateIds.map((id) => resolvePhoto(userType, id))
  );

  return resolved.filter((url): url is string => Boolean(url)).slice(0, MAX_PHOTOS);
}

interface PickRandomIdsProps {
  count: number;
  min: number;
  max: number;
}
function pickRandomIds({ count, max, min }: PickRandomIdsProps): number[] {
  const ids: number[] = [];

  while (ids.length < count) {
    const id = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!ids.includes(id)) {
      ids.push(id);
    }
  }

  return ids;
}
