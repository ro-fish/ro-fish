"use client";

import React from "react";
import { MapContainer, Polygon, Tooltip } from "react-leaflet";
import FishingSpot from "@/types/fishing-spot";
import MapTile from "../map-tile";

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
      <MapTile />

      {fishingSpots.map((spot) => {
        return (
          <Polygon
            key={spot.fishingSpotId}
            pathOptions={{
              color:
                selection !== null && selection === fishingSpotId
                  ? "green"
                  : "blue",
            }}
            positions={spot.bounds}
            eventHandlers={{
              click: () => {
                onSelect(fishingSpotId);
                setSelection(fishingSpotId);
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
