"use client";

import React, { useState } from "react";
import {
  MapContainer,
  useMapEvents,
  CircleMarker,
  Polyline,
  Polygon,
} from "react-leaflet";
import MapTile from "../map-tile";
import { LatLngExpression } from "leaflet";
import FishingSpot from "@/types/fishing-spot";

const dummySpots = [
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
];

const ClickHandler = ({
  handler,
}: {
  handler: (point: LatLngExpression) => void;
}) => {
  useMapEvents({
    click(e) {
      handler(e.latlng);
    },
  });

  return <></>;
};

const Map = () => {
  const markerOptions = { color: "blue" };

  const [editMode, setEditMode] = useState(false);
  const [hideSpots, setHideSpots] = useState(false);
  const [spots, setSpots] = useState<FishingSpot[]>(dummySpots);
  const [trail, setTrail] = useState<LatLngExpression[]>([]);

  return (
    <div>
      <h1>{editMode ? "Editează locația" : "Editor locații"}</h1>

      <MapContainer
        center={[44.67113785, 25.9927349]}
        zoom={15}
        style={{ height: "500px", width: "500px" }}
      >
        <MapTile />

        {(hideSpots && editMode) ||
          spots.map((spot, index) => (
            <Polygon
              key={index}
              pathOptions={{ color: spot.taken ? "red" : "green" }}
              positions={spot.bounds}
            />
          ))}

        {editMode && (
          <>
            <Polyline pathOptions={markerOptions} positions={trail} />
            {trail.length > 0 && (
              <CircleMarker
                center={trail[trail.length - 1]}
                radius={1.5}
                pathOptions={{ color: "red" }}
              />
            )}

            {trail.length > 2 && (
              <Polyline
                pathOptions={{ ...markerOptions, opacity: 0.4 }}
                positions={[trail[trail.length - 1], trail[0]]}
              />
            )}

            <ClickHandler
              handler={(point) => {
                setTrail([...trail, point]);
              }}
            />
          </>
        )}
      </MapContainer>

      <input
        type="button"
        value="Șterge ultima locație"
        onClick={() => {
          trail.pop();
          setTrail([...trail]);
        }}
      />
      <input
        type="button"
        value="Salvează locația"
        onClick={() => {
          const spot = { bounds: trail, name: "sal", taken: false };
          setSpots([...spots, spot]);
          setTrail([]);
        }}
      />

      <div>
        <label>Nume locație</label>
        <input type="text" disabled={!editMode} />
      </div>
      <div>
        <button
          onClick={() => {
            setEditMode(!editMode);
            setTrail([]);
          }}
        >
          <label>{editMode ? "Anulează" : "Adaugă locație nouă"}</label>
        </button>
      </div>
      {editMode && (
        <div>
          <label>Ascunde celelalte locuri</label>
          <input
            type="checkbox"
            defaultChecked={hideSpots}
            onClick={() => setHideSpots(!hideSpots)}
          />
        </div>
      )}
    </div>
  );
};

export default Map;
