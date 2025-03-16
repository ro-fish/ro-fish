"use client";

import React from "react";
import { MapContainer, Polygon, TileLayer, Tooltip } from "react-leaflet";
import FishingSpot from "@/types/fishing-spot";

const Map = ({
  fishingSpots,
  onSelect,
}: {
  fishingSpots: FishingSpot[];
  onSelect: (selection: number) => void;
}) => {
  const [selection, setSelection] = React.useState<number | null>(null);

  return (
    <MapContainer
      center={[44.67113785, 25.9927349]}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {fishingSpots.map((spot, index) => {
        return (
          <Polygon
            key={index}
            pathOptions={{
              color:
                selection !== null && selection === index
                  ? "green"
                  : spot.taken
                    ? "red"
                    : "blue",
            }}
            positions={spot.bounds}
            eventHandlers={{
              click: () => {
                onSelect(index);
                setSelection(index);
              },
            }}
          >
            <Tooltip>{spot.name}</Tooltip>
          </Polygon>
        );
      })}
    </MapContainer>
  );
};

export default Map;
