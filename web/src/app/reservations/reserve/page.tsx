"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import MapProvider from "@/components/map/reservation/map-provider";
import { FishingSpotDTO } from "@/types/fishing-spot";
import { FETCH_FREE_FISHING_SPOTS } from "@/lib/api";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

export default function Reservation() {
  const [selection, setSelection] = React.useState<FishingSpotDTO | null>(null);
  const [date, setDate] = React.useState<Dayjs | null>(null);
  const [personCount, setPersonCount] = React.useState(1);
  const [fishingSpots, setFishingSpots] = React.useState<FishingSpotDTO[]>([]);

  const router = useRouter();

  const sel = useCallback((s: FishingSpotDTO) => setSelection(s), []);

  const fetchSpots = () => {
    if (date == null || date.isBefore(dayjs(), "day")) {
      return;
    }

    axios
      .get<
        FishingSpotDTO[]
      >(FETCH_FREE_FISHING_SPOTS, { params: { date: date.format('YYYY-MM-DD') } })
      .then((response) => {
        setFishingSpots(response.data);
      });
  };

  // Fetch spots on page load and on date change
  useEffect(() => fetchSpots(), [date]);

  const submitReservation = () => {
    if (personCount === 0 || selection === null) {
      return;
    }

    if (date == null || date.isBefore(dayjs(), "day")) {
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="w-full bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              value={date}
              onChange={(date) => {
                setDate(dayjs(date));
                setSelection(null);
              }}
            />
          </LocalizationProvider>
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
