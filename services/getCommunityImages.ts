import { activistService } from "@/domain/Activist/activistService";
import { communityService } from "@/domain/Community/communityService";
import { contributorService } from "@/domain/Contributor/contributorService";
import { developerService } from "@/domain/Developer/developerService";
import { inspectorService } from "@/domain/Inspector/inspectorService";
import { regeneratorService } from "@/domain/Regenerator/regeneratorService";
import { researcherService } from "@/domain/Researcher/researcherService";
import { supporterService } from "@/domain/Supporter/supporterService";

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
    if (userType === 2) {
      const inspectorAddress = await inspectorService.getInspectorAddress({ id });
      const inspector = await inspectorService.getInspector({ address: inspectorAddress });
      photosUrl.push(`${process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL}/ipfs/${inspector.proofPhoto}`)
    }
    if (userType === 3) {
      const researcherAddress = await researcherService.getResearcherAddress({ id });
      const researcher = await researcherService.getResearcher({ address: researcherAddress });
      photosUrl.push(`${process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL}/ipfs/${researcher.proofPhoto}`)
    }
    if (userType === 4) {
      const developerAddress = await developerService.getDeveloperAddress({ id });
      const developer = await developerService.getDeveloper({ address: developerAddress });
      photosUrl.push(`${process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL}/ipfs/${developer.proofPhoto}`)
    }
    if (userType === 5) {
      const contributorAddress = await contributorService.getContributorAddress({ id });
      const contributor = await contributorService.getContributor({ address: contributorAddress });
      photosUrl.push(`${process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL}/ipfs/${contributor.proofPhoto}`)
    }
    if (userType === 6) {
      const activistAddress = await activistService.getActivistAddress({ id });
      const activist = await activistService.getActivist({ address: activistAddress });
      photosUrl.push(`${process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL}/ipfs/${activist.proofPhoto}`)
    }
    if (userType === 7) {
      const supporterAddress = await supporterService.getSupporterAddress({ id });
      const supporter = await supporterService.getSupporter({ address: supporterAddress });
      photosUrl.push(`${process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL}/ipfs/${supporter.profilePhoto}`)
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