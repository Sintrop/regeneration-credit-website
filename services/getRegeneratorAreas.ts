import { communityService } from "@/domain/Community/communityService";
import { regeneratorContract } from "@/domain/Regenerator/regeneratorContract";

export interface RegeneratorArea {
  id: number;
  name: string;
  /** Regeneration area in square metres. */
  area: number;
  score: number;
  /** Polygon vertices as [latitude, longitude] pairs. */
  points: [number, number][];
}

function toNumber(value: unknown): number {
  const parsed = Number(String(value).replace("n", ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseCoordinate(value: string): number | null {
  const parsed = Number(String(value).trim());
  return Number.isFinite(parsed) ? parsed : null;
}

async function getArea(id: number): Promise<RegeneratorArea | null> {
  const address = await regeneratorContract.regeneratorsAddress({ id });
  const [regenerator, coordinates] = await Promise.all([
    regeneratorContract.getRegenerator({ address }),
    regeneratorContract.getCoordinates({ address }),
  ]);

  const points = coordinates
    .map((point): [number, number] | null => {
      const lat = parseCoordinate(point.latitude);
      const lng = parseCoordinate(point.longitude);
      if (lat === null || lng === null) return null;
      if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
      return [lat, lng];
    })
    .filter((point): point is [number, number] => point !== null);

  if (points.length < 3) return null;

  return {
    id,
    name: regenerator.name || `#${id}`,
    area: toNumber(regenerator.totalArea),
    score: toNumber(regenerator.regenerationScore?.score),
    points,
  };
}

export async function getRegeneratorAreas(): Promise<RegeneratorArea[]> {
  const count = await communityService.getUserTypesCount({ userType: 1 });
  if (!count || count < 1) return [];

  const results = await Promise.all(
    Array.from({ length: count }, (_, index) =>
      getArea(index + 1).catch(() => null)
    )
  );

  return results.filter((area): area is RegeneratorArea => area !== null);
}
