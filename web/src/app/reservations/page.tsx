"use client";

import { FETCH_RESERVATIONS } from "@/lib/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FishingSpotDTO from "@/types/fishing-spot";
import { FETCH_FISHING_SPOTS } from "@/lib/api";

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [fishingSpots, setFishingSpots] = React.useState<FishingSpotDTO[]>([]);

  const fetchSpots = () => {
    axios.get<FishingSpotDTO[]>(FETCH_FISHING_SPOTS).then((response) => {
      setFishingSpots(response.data);
    });
  };

  useEffect(() => fetchSpots(), []);

  const fetchReservations = () => {
    axios.get(FETCH_RESERVATIONS).then((response) => {
      const data = response.data;
      setReservations(data);
    });
  };

  type ReservationData = {
    id: number;
    fishingSpotId: number;
    reservationDate: string;
    invitedPeople: number;
    cancelled: boolean;
    lastModify: string;
  };

  useEffect(() => fetchReservations(), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Rezervările tale</h2>
            <button
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white font-semibold py-2 px-5 rounded-xl shadow"
              onClick={() => (window.location.href = "/reservations/reserve")}
            >
              + Creează rezervare
            </button>
          </div>

          {/* Lista rezervări */}
          <div className="space-y-6">
            {reservations.map((reservation: ReservationData) => (
              <div
                key={reservation.id}
                className="bg-gray-700 p-6 rounded-xl border border-gray-600 shadow-sm"
              >
                {/* Rezervare */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    Rezervare #{reservation.id}
                  </h3>
                  {reservation.cancelled && (
                    <span className="text-sm font-medium bg-red-600 text-white py-1 px-3 rounded-full">
                      Anulată
                    </span>
                  )}
                </div>

                {/* Detalii rezervare */}
                <p className="text-gray-400 mt-2">
                  <strong>Data:</strong>{" "}
                  {new Date(reservation.reservationDate).toLocaleDateString()}
                </p>
                <p className="text-gray-400">
                  <strong>Număr persoane:</strong> {reservation.invitedPeople}
                </p>
                <p className="text-gray-400">
                  <strong>Locatie:</strong>{" "}
                  {fishingSpots.find(
                    (spot) => spot.fishingSpotId === reservation.fishingSpotId,
                  )?.name || "Necunoscută"}
                </p>

                {/* Buton Anulare */}
                {!reservation.cancelled && (
                  <button
                    className="mt-4 bg-red-600 hover:bg-red-700 transition duration-200 text-white font-medium py-2 px-4 rounded-xl shadow"
                    onClick={() => {
                      axios
                        .put(`/api/reservations/${reservation.id}/cancel`)
                        .then(() => fetchReservations());
                    }}
                  >
                    Anulează rezervarea
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
