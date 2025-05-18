"use client";

import React, { useCallback, useEffect } from "react";
import MapProvider from "@/components/map/reservation/map-provider";
import FishingSpot, { FishingSpotDTO } from "@/types/fishing-spot";
import axios from "axios";
import { LatLng } from "leaflet";
import { FETCH_FISHING_SPOTS } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Reservation() {
  const [selection, setSelection] = React.useState<number | null>(null);
  const [date, setDate] = React.useState(
    new Date(Date.now() + 86400000) /*FIXME*/,
  );
  const [personCount, setPersonCount] = React.useState(1);
  const [fishingSpots, setFishingSpots] = React.useState<FishingSpot[]>([]);

  const router = useRouter();

  const sel = useCallback((s: number) => setSelection(s), []);

  const fetchSpots = () => {
    axios.get<FishingSpotDTO[]>(FETCH_FISHING_SPOTS).then((response) => {
      const recvSpots = response.data.map(
        ({ fishingSpotId, name, perimeter }) => ({
          fishingSpotId,
          name,
          bounds: perimeter.map(
            ({ latitude, longitude }) => new LatLng(latitude, longitude),
          ),
        }),
      );

      for (const spot of recvSpots) {
        console.log("pst_spot:" + response.data[0].name);
      }
      setFishingSpots(recvSpots);
    });
  };

  // Fetch spots on page load and on date change
  useEffect(() => fetchSpots(), [date]);

  const submitReservation = () => {
    if (personCount === 0 || selection === null) {
      return;
    }

    if (date < new Date()) {
      return;
    }

    if (selection === null) {
      return;
    }

    axios
      .post("/api/reservations/reserve", {
        fishingSpotId: selection,
        reservationDate: date,
        invitedPeople: personCount,
      })
      .then((_) => {
        router.push("/reservations");
      });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-md mx-auto py-20 px-4">
        <div
          className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700"
          style={{ height: "80vh", width: "50vw" }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Număr persoane
            </label>
            <input
              type="number"
              value={personCount}
              onChange={(e) => setPersonCount(Number(e.target.value))}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <p>Selectat: {selection}</p>
            <label className="block text-sm font-medium text-gray-300">
              Data
            </label>
            <input
              type="date"
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              required
              defaultValue={date.toISOString().split("T")[0] /*FIXME*/}
              onChange={(e) => {
                setDate(new Date(e.target.value));
                setSelection(null); // Clear selection on date change
              }}
            />
          </div>
          <div style={{ height: "400px", width: "400px" }}>
            <label className="block text-sm font-medium text-gray-300">
              Locație
            </label>
            <MapProvider fishingSpots={fishingSpots} onSelect={sel} />
          </div>
          <div>
            <input
              type="submit"
              value="Rezervă"
              className="bg-blue-500 text-white p-3 rounded-md"
              onClick={submitReservation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
