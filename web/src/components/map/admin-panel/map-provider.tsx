"use client";

import "leaflet/dist/leaflet.css";
import React from "react";
import dynamic from "next/dynamic";

const MapProvider = () => {
  const Map = dynamic(() => import("./map"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });

  return <Map />;
};

export default MapProvider;
