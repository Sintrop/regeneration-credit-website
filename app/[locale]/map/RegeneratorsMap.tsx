"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, Polygon, Popup, TileLayer } from "react-leaflet";
import type { LatLngBoundsExpression } from "leaflet";
import { RegeneratorArea } from "@/services/getRegeneratorAreas";

interface Props {
  areas: RegeneratorArea[];
  areaLabel: string;
  scoreLabel: string;
}

function boundsOf(areas: RegeneratorArea[]): LatLngBoundsExpression | undefined {
  const points = areas.flatMap((area) => area.points);
  if (points.length === 0) return undefined;

  let minLat = points[0][0];
  let maxLat = points[0][0];
  let minLng = points[0][1];
  let maxLng = points[0][1];

  for (const [lat, lng] of points) {
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
  }

  return [
    [minLat, minLng],
    [maxLat, maxLng],
  ];
}

export default function RegeneratorsMap({ areas, areaLabel, scoreLabel }: Props) {
  const bounds = boundsOf(areas);

  return (
    <MapContainer
      bounds={bounds}
      scrollWheelZoom={false}
      className="h-[70vh] min-h-[420px] w-full rounded-2xl border border-line"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {areas.map((area) => (
        <Polygon
          key={area.id}
          positions={area.points}
          pathOptions={{
            color: "#0B6B3A",
            fillColor: "#149954",
            fillOpacity: 0.3,
            weight: 2,
          }}
        >
          <Popup>
            <strong>{area.name}</strong>
            <br />
            {area.area.toLocaleString("en-US")} {areaLabel}
            <br />
            {scoreLabel}: {area.score}
          </Popup>
        </Polygon>
      ))}
    </MapContainer>
  );
}
