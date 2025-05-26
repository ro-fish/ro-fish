"use client";

import React, { useCallback, useEffect } from "react";
import MapProvider from "@/components/map/reservation/map-provider";
import { FishingSpotDTO } from "@/types/fishing-spot";
import axios from "axios";
import { FETCH_FISHING_SPOTS } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Reservation() {
  const [selection, setSelection] = React.useState<FishingSpotDTO | null>(null);
  const [date, setDate] = React.useState(
    new Date(Date.now() + 86400000) /*FIXME*/,
  );
  const [personCount, setPersonCount] = React.useState(1);
  const [fishingSpots, setFishingSpots] = React.useState<FishingSpotDTO[]>([]);

  const router = useRouter();

  const sel = useCallback((s: FishingSpotDTO) => setSelection(s), []);

  const fetchSpots = () => {
    axios.get<FishingSpotDTO[]>(FETCH_FISHING_SPOTS).then((response) => {
      setFishingSpots(response.data);
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
        fishingSpotId: selection.fishingSpotId,
        reservationDate: date,
        invitedPeople: personCount,
      })
      .then((_) => {
        router.push("/reservations");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-2xl font-semibold text-white mb-8 text-center">
          Rezervare Pescuit
        </h2>

        {/* Număr persoane */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Număr persoane
          </label>
          <input
            type="number"
            value={personCount}
            onChange={(e) => setPersonCount(Number(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Ex: 4"
          />
        </div>

        {/* Data */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Data
          </label>
          <input
            type="date"
            className="w-full bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            required
            defaultValue={date.toISOString().split("T")[0]}
            onChange={(e) => {
              setDate(new Date(e.target.value));
              setSelection(null);
            }}
          />
        </div>

        {/* Selectat */}
        <div className="mb-6">
          <p className="mt-2 text-text text-gray-300">
            Selectat: {selection?.name ?? "Nicio locație selectată"}
          </p>
        </div>

        {/* Locație */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Locație
          </label>
          <div
            style={{ height: "600px", width: "100%" }}
            className="rounded-lg overflow-hidden border border-gray-600 shadow-md"
          >
            <MapProvider fishingSpots={fishingSpots} onSelect={sel} />
          </div>
        </div>

        {/* Buton rezervare */}
        <div style={{ marginTop: "50px" }} className="text-center mt-8">
          <input
            type="submit"
            value="Rezervă"
            className="bg-blue-500 text-white p-3 rounded-md"
            onClick={submitReservation}
          />
        </div>
      </div>
    </div>
  );
}
