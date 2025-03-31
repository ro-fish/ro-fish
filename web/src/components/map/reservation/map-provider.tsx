"use client";

import "leaflet/dist/leaflet.css";
import React, { memo } from "react";
import dynamic from "next/dynamic";
import FishingSpot from "@/types/fishing-spot";

const MapProvider = memo(
  ({
    fishingSpots,
    onSelect,
  }: {
    fishingSpots: FishingSpot[];
    onSelect: (selection: number) => void;
  }) => {
    const Map = dynamic(() => import("./map"), {
      loading: () => <p>A map is loading</p>,
      ssr: false,
    });

    return <Map fishingSpots={fishingSpots} onSelect={onSelect} />;
  }
);

export default MapProvider;
