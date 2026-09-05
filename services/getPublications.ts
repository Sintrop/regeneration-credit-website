import { contributorContract } from "@/domain/Contributor/contributorContract";
import { developerContract } from "@/domain/Developer/developerContract";
import { researcherContract } from "@/domain/Researcher/researcherContract";

export type PublicationType = "research" | "contribution" | "report";

export interface Publication {
  type: PublicationType;
  id: number;
  title: string | null;
  body: string;
  fileUrl: string | null;
  createdAtBlock: number;
}

export interface Publications {
  researches: Publication[];
  contributions: Publication[];
  reports: Publication[];
}

function toNumber(value: unknown): number {
  return Number(String(value).replace("n", ""));
}

function ipfsUrl(hash?: string): string | null {
  const trimmed = hash?.trim();
  if (!trimmed) return null;
  return `${process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL}/ipfs/${trimmed}`;
}

function idsUpTo(count: number): number[] {
  return Array.from({ length: count }, (_, index) => index + 1);
}

async function getResearches(): Promise<Publication[]> {
  const count = await researcherContract.researchesTotalCount();
  const items = await Promise.all(
    idsUpTo(count).map((id) => researcherContract.getResearch({ id }))
  );

  return items
    .filter((item) => item.valid)
    .map((item) => ({
      type: "research" as const,
      id: toNumber(item.id),
      title: item.title || null,
      body: item.thesis || "",
      fileUrl: ipfsUrl(item.file),
      createdAtBlock: toNumber(item.createdAtBlock),
    }))
    .sort((a, b) => b.createdAtBlock - a.createdAtBlock);
}

async function getContributions(): Promise<Publication[]> {
  const count = await contributorContract.contributionsTotalCount();
  const items = await Promise.all(
    idsUpTo(count).map((id) => contributorContract.getContribution({ id }))
  );

  return items
    .filter((item) => item.valid)
    .map((item) => ({
      type: "contribution" as const,
      id: toNumber(item.id),
      title: null,
      body: item.description || "",
      fileUrl: ipfsUrl(item.report),
      createdAtBlock: toNumber(item.createdAtBlockNumber),
    }))
    .sort((a, b) => b.createdAtBlock - a.createdAtBlock);
}

async function getReports(): Promise<Publication[]> {
  const count = await developerContract.reportsTotalCount();
  const items = await Promise.all(
    idsUpTo(count).map((id) => developerContract.getReport({ id }))
  );

  return items
    .filter((item) => item.valid)
    .map((item) => ({
      type: "report" as const,
      id: toNumber(item.id),
      title: null,
      body: item.description || "",
      fileUrl: ipfsUrl(item.report),
      createdAtBlock: toNumber(item.createdAtBlockNumber),
    }))
    .sort((a, b) => b.createdAtBlock - a.createdAtBlock);
}

export async function getPublications(): Promise<Publications> {
  const [researches, contributions, reports] = await Promise.all([
    getResearches().catch(() => []),
    getContributions().catch(() => []),
    getReports().catch(() => []),
  ]);

  return { researches, contributions, reports };
}
