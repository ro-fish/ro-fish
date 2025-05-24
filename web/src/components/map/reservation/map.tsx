"use client";

import React from "react";
import { MapContainer, Polygon, Tooltip } from "react-leaflet";
import { FishingSpotDTO } from "@/types/fishing-spot";
import MapTile from "../map-tile";
import { latLng } from "leaflet";

const Map = ({
  fishingSpots,
  onSelect,
}: {
  fishingSpots: FishingSpotDTO[];
  onSelect: (selection: FishingSpotDTO) => void;
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
                selection !== null && selection === spot.fishingSpotId
                  ? "green"
                  : "blue",
            }}
            positions={spot.perimeter.map((({latitude, longitude}) => latLng(latitude, longitude)))}
            eventHandlers={{
              click: () => {
                console.log("pst_spot:" + spot.fishingSpotId);

                onSelect(spot);
                setSelection(spot.fishingSpotId);
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
