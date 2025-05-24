"use client";

import "leaflet/dist/leaflet.css";
import React, { memo } from "react";
import dynamic from "next/dynamic";
import { FishingSpotDTO } from "@/types/fishing-spot";

const MapProvider = memo(
  ({
    fishingSpots,
    onSelect,
  }: {
    fishingSpots: FishingSpotDTO[];
    onSelect: (selection: FishingSpotDTO) => void;
  }) => {
    const Map = dynamic(() => import("./map"), {
      loading: () => (
        <div className="flex items-center justify-center h-[600px] bg-gray-900">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
            <p className="text-gray-300">Se încarcă harta...</p>
          </div>
        </div>
      ),
      ssr: false,
    });

    return <Map fishingSpots={fishingSpots} onSelect={onSelect} />;
  },
);

MapProvider.displayName = "MapProvider"; // FIXME?
export default MapProvider;
