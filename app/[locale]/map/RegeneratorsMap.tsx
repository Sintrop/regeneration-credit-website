"use client";

import "leaflet/dist/leaflet.css";
import { Fragment, useMemo, useRef, useState } from "react";
import L from "leaflet";
import { CircleMarker, MapContainer, Polygon, Popup, TileLayer } from "react-leaflet";
import { RegeneratorArea } from "@/services/getRegeneratorAreas";

interface Props {
  areas: RegeneratorArea[];
  areaLabel: string;
  scoreLabel: string;
  listTitle: string;
}

function centroid(points: [number, number][]): [number, number] {
  const sum = points.reduce(
    (acc, [lat, lng]) => [acc[0] + lat, acc[1] + lng],
    [0, 0]
  );
  return [sum[0] / points.length, sum[1] / points.length];
}

function boundsOf(points: [number, number][]) {
  return L.latLngBounds(points.map(([lat, lng]) => L.latLng(lat, lng)));
}

export default function RegeneratorsMap({
  areas,
  areaLabel,
  scoreLabel,
  listTitle,
}: Props) {
  const mapRef = useRef<L.Map | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const overallBounds = useMemo(
    () => boundsOf(areas.flatMap((area) => area.points)),
    [areas]
  );

  const sortedAreas = useMemo(
    () => [...areas].sort((a, b) => b.area - a.area),
    [areas]
  );

  function focusArea(area: RegeneratorArea) {
    setSelectedId(area.id);
    mapRef.current?.flyToBounds(boundsOf(area.points), {
      padding: [40, 40],
      maxZoom: 15,
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <MapContainer
        ref={mapRef}
        bounds={overallBounds}
        scrollWheelZoom={false}
        className="h-[65vh] min-h-[420px] w-full rounded-2xl border border-line"
      >
        <TileLayer
          attribution="Tiles &copy; Esri"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        />

        {areas.map((area) => {
          const selected = area.id === selectedId;
          return (
            <Fragment key={area.id}>
              <Polygon
                positions={area.points}
                pathOptions={{
                  color: "#0B6B3A",
                  fillColor: "#149954",
                  fillOpacity: selected ? 0.5 : 0.3,
                  weight: selected ? 3 : 1.5,
                }}
              />
              <CircleMarker
                center={centroid(area.points)}
                radius={selected ? 9 : 6}
                pathOptions={{
                  color: "#ffffff",
                  weight: 2,
                  fillColor: "#149954",
                  fillOpacity: 1,
                }}
                eventHandlers={{ click: () => setSelectedId(area.id) }}
              >
                <Popup>
                  <strong>{area.name}</strong>
                  <br />
                  {area.area.toLocaleString("en-US")} {areaLabel}
                  <br />
                  {scoreLabel}: {area.score}
                </Popup>
              </CircleMarker>
            </Fragment>
          );
        })}
      </MapContainer>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          {listTitle}
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedAreas.map((area) => (
            <li key={area.id}>
              <button
                type="button"
                onClick={() => focusArea(area)}
                className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                  area.id === selectedId
                    ? "border-brand bg-brand-tint"
                    : "border-line bg-surface hover:border-brand"
                }`}
              >
                <span className="block font-medium text-ink">{area.name}</span>
                <span className="mt-1 block font-anta text-sm text-ink-soft">
                  {area.area.toLocaleString("en-US")} {areaLabel} · {scoreLabel}{" "}
                  {area.score}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
