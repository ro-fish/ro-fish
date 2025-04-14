"use client";

import React from "react";
import MapProvider from "@/components/map/admin-panel/map-provider";

const Spots = () => {
  return (
    <div
      className="min-h-screen bg-gray-900"
      style={{ height: "50vh", width: "99vw" }}
    >
      <MapProvider></MapProvider>
    </div>
  );
};

export default Spots;
