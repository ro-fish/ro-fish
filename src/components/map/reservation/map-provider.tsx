"use client";

import "leaflet/dist/leaflet.css";
import React, { memo } from "react";
import dynamic from "next/dynamic";

const MapProvider = memo(
  ({
    date,
    onSelect,
  }: {
    date: Date;
    onSelect: (selection: number) => void;
  }) => {
    const Map = dynamic(() => import("./map"), {
      loading: () => <p>A map is loading</p>,
      ssr: false,
    });

    return (
      <Map
        fishingSpots={[
          {
            bounds: [
              { lat: 44.67113785, lng: 25.9927349 },
              { lat: 44.67113785, lng: 25.9937449 },
              { lat: 44.67213795, lng: 25.9937449 },
              { lat: 44.67213795, lng: 25.9927349 },
            ],
            name: "Fishing spot 1",
            taken: false,
          },
          {
            bounds: [
              { lat: 44.68113785, lng: 25.9927349 },
              { lat: 44.68113785, lng: 25.9937449 },
              { lat: 44.68213795, lng: 25.9937449 },
              { lat: 44.68213795, lng: 25.9927349 },
            ],
            name: "Fishing spot 2",
            taken: false,
          },
        ]}
        onSelect={onSelect}
      />
    );
  }
);

export default MapProvider;
