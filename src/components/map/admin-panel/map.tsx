"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  useMapEvents,
  CircleMarker,
  Polyline,
  Polygon,
} from "react-leaflet";
import { latLng, LatLng } from "leaflet";
import MapTile from "../map-tile";
import FishingSpot, { FishingSpotDTO } from "@/types/fishing-spot";

const ClickHandler = ({ handler }: { handler: (point: LatLng) => void }) => {
  useMapEvents({
    click(e) {
      handler(e.latlng);
    },
  });

  return <></>;
};

const Map = () => {
  const markerOptions = { color: "blue" };

  const [name, setName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [hideSpots, setHideSpots] = useState(false);
  const [spots, setSpots] = useState<FishingSpot[]>([]);
  const [trail, setTrail] = useState<LatLng[]>([]);

  const fetchSpots = () => {
    axios.get<FishingSpotDTO[]>("/api/fishing-spot/all").then((response) => {
      const recvSpots = response.data.map(({ name, perimeter }) => ({
        name,
        bounds: perimeter.map(({ latitude, longitude }) =>
          latLng(latitude, longitude)
        ),
      }));

      setSpots(recvSpots);
    });
  };

  // Fetch spots on page load
  useEffect(() => fetchSpots, []);

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
              pathOptions={{ color: "green" }}
              positions={spot.bounds}
              eventHandlers={{
                click: () => {
                  setName(spot.name);
                },
              }}
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
          const spot = { bounds: trail, name };
          const serializedSpot: FishingSpotDTO = {
            ...spot,
            perimeter: trail.map(({ lat, lng }) => ({
              latitude: lat,
              longitude: lng,
            })),
          };

          axios
            .post("/api/fishing-spot/add", serializedSpot)
            .then(() => alert("trimis"));

          setSpots([...spots, spot]);
          setTrail([]);
        }}
      />

      <div>
        <label>Nume locație</label>
        <input
          type="text"
          disabled={!editMode}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={() => {
            if (!editMode) setName("");
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
