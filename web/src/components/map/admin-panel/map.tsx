"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  useMapEvents,
  CircleMarker,
  Polyline,
  Polygon,
  Tooltip,
} from "react-leaflet";
import { latLng, LatLng } from "leaflet";
import MapTile from "../map-tile";
import FishingSpot, { FishingSpotDTO } from "@/types/fishing-spot";
import {
  CREATE_FISHING_SPOT,
  DELETE_FISHING_SPOT,
  FETCH_FISHING_SPOTS,
} from "@/lib/api";

const ClickHandler = ({ handler }: { handler: (point: LatLng) => void }) => {
  useMapEvents({
    click(e) {
      handler(e.latlng);
    },
  });

  return null;
};

const MapEditor = () => {
  const markerOptions = { color: "#3b82f6" }; // blue-500

  const [name, setName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [hideSpots, setHideSpots] = useState(false);
  const [spots, setSpots] = useState<FishingSpot[]>([]);
  const [trail, setTrail] = useState<LatLng[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);

  const fetchSpots = () => {
    setIsLoading(true);
    axios
      .get<FishingSpotDTO[]>(FETCH_FISHING_SPOTS)
      .then((response) => {
        const recvSpots = response.data.map(
          ({ fishingSpotId, name, perimeter }) => ({
            fishingSpotId,
            name,
            bounds: perimeter.map(({ latitude, longitude }) =>
              latLng(latitude, longitude),
            ),
          }),
        );
        setSpots(recvSpots);
      })
      .catch((reason) => {
        console.error("Error fetching spots:", reason);
        alert("Failed to load fishing spots. Please try again.");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchSpots();
  }, []);

  const handleSaveLocation = () => {
    if (trail.length < 3) {
      alert(
        "Un loc de pescuit necesită cel puțin 3 puncte pentru a forma un poligon",
      );
      return;
    }
    if (!name.trim()) {
      alert("Introduceți un nume pentru locul de pescuit");
      return;
    }

    const spot = { bounds: trail, name: name.trim() };
    const serializedSpot: FishingSpotDTO = {
      ...spot,
      perimeter: trail.map(({ lat, lng }) => ({
        latitude: lat,
        longitude: lng,
      })),
    };

    setIsLoading(true);
    axios
      .post(CREATE_FISHING_SPOT, serializedSpot)
      .then(() => {
        setSpots([...spots, spot]);
        setTrail([]);
        setName("");
        alert("Loc de pescuit salvat cu succes!");
      })
      .catch((error) => {
        console.error("Error saving spot:", error);
        alert("Salvare nereușită. Vă rugăm să încercați din nou.");
      })
      .finally(() => setIsLoading(false));
  };

  const handleDeleteSpot = () => {
    if (selectedSpot === null || !name.trim()) return;

    setIsLoading(true);
    axios
      .delete(`${DELETE_FISHING_SPOT}/${selectedSpot}`, {})
      .then(() => {
        const newSpots = spots.filter((_, index) => index !== selectedSpot);
        setSpots(newSpots);
        setName("");
        setSelectedSpot(null);
        alert("Loc de pescuit șters cu succes!");
      })
      .catch((error) => {
        console.error("Error deleting spot:", error);
        alert("Ștergere nereușită. Vă rugăm să încercați din nou.");
      })
      .finally(() => setIsLoading(false));
  };

  const handleRemoveLastPoint = () => {
    if (trail.length === 0) return;
    const newTrail = [...trail];
    newTrail.pop();
    setTrail(newTrail);
  };

  const toggleEditMode = () => {
    if (!editMode) setName("");
    setEditMode(!editMode);
    setTrail([]);
    setSelectedSpot(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">
            {" "}
            {/* Reduced size by ~30% */}
            {editMode
              ? "Editare Loc de Pescuit"
              : "Administrare Locuri de Pescuit"}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 h-[600px]">
            <MapContainer
              center={[44.67113785, 25.9927349]}
              zoom={15}
              style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
              className="border border-gray-700 shadow-lg"
            >
              <MapTile />

              {(!hideSpots || !editMode) &&
                spots.map((spot, index) => (
                  <Polygon
                    key={index}
                    pathOptions={{
                      color: selectedSpot === index ? "#d97706" : "#10b981", // Less vibrant yellow and green
                      weight: selectedSpot === index ? 3 : 2,
                      fillOpacity: 0.2,
                    }}
                    positions={spot.bounds}
                    eventHandlers={{
                      click: () => {
                        if (!editMode) {
                          setName(spot.name);
                          setSelectedSpot(index);
                        }
                      },
                    }}
                  >
                    <Tooltip direction="top" opacity={1} permanent={false}>
                      {spot.name}
                    </Tooltip>
                  </Polygon>
                ))}

              {editMode && (
                <>
                  <Polyline pathOptions={markerOptions} positions={trail} />
                  {trail.length > 0 && (
                    <CircleMarker
                      center={trail[trail.length - 1]}
                      radius={1.5}
                      pathOptions={{ color: "#ef4444" }} // Less vibrant red
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
          </div>

          <div className="lg:col-span-2 space-y-6">
            {editMode && ( // Only show name input in edit mode
              <div className="bg-gray-800/50 p-6 rounded-lg">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nume Loc
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Introdu numele locului"
                  />
                </div>

                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="hideSpots"
                    checked={hideSpots}
                    onChange={() => setHideSpots(!hideSpots)}
                    className="h-5 w-5 text-blue-400 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                  />
                  <label
                    htmlFor="hideSpots"
                    className="ml-3 block text-sm text-gray-300"
                  >
                    Ascunde alte locuri
                  </label>
                </div>
              </div>
            )}

            <div className="bg-gray-800/50 p-6 rounded-lg space-y-4">
              <button
                onClick={toggleEditMode}
                className={`w-full px-6 py-3 rounded-md text-white font-medium text-lg ${editMode ? "bg-gray-700 hover:bg-gray-600 border border-gray-600" : "bg-blue-600/90 hover:bg-blue-700/90"} transition-colors`}
                disabled={isLoading}
              >
                {editMode ? "Anulează Editarea" : "Adaugă Loc Nou"}
              </button>

              {editMode ? (
                <>
                  <button
                    onClick={handleRemoveLastPoint}
                    disabled={trail.length === 0 || isLoading}
                    className="w-full px-6 py-3 bg-gray-700/70 text-yellow-400 font-medium text-lg rounded-md hover:bg-gray-600/70 border border-yellow-400/30 disabled:bg-gray-800/50 disabled:text-yellow-400/50 transition-colors"
                  >
                    Șterge Ultimul Punct
                  </button>

                  <button
                    onClick={handleSaveLocation}
                    disabled={trail.length < 3 || !name.trim() || isLoading}
                    className="w-full px-6 py-3 bg-green-600/90 text-white font-medium text-lg rounded-md hover:bg-green-700/90 disabled:bg-green-800/50 disabled:text-green-200 transition-colors"
                  >
                    {isLoading ? "Se salvează..." : "Salvează Locul"}
                  </button>
                </>
              ) : (
                <button
                  onClick={handleDeleteSpot}
                  disabled={selectedSpot === null || isLoading}
                  className="w-full px-6 py-3 bg-gray-700/70 text-red-400 font-medium text-lg rounded-md hover:bg-gray-600/70 border border-red-400/30 disabled:bg-gray-800/50 disabled:text-red-400/50 transition-colors"
                >
                  Șterge Locul Selectat
                </button>
              )}

              {isLoading && (
                <div className="text-center py-4">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapEditor;
