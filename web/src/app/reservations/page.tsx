"use client";

import { FETCH_RESERVATIONS } from "@/lib/api";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Reservation = () => {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = () => {
    axios.get(FETCH_RESERVATIONS).then((response) => {
      const data = response.data;
      setReservations(data);
    });
  };

  useEffect(() => fetchReservations(), []);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-md mx-auto py-20 px-4">
        <div
          className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700"
          style={{ height: "80vh", width: "50vw" }}
        >
          <div>
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => (window.location.href = "/reservations/reserve")}
            >
              Creează o rezervare
            </button>
          </div>
          <div>
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-gray-700 p-4 rounded-lg mt-4"
              >
                <h3 className="text-lg font-semibold text-gray-300">
                  Rezervare ID: {reservation.id}
                </h3>
                <p className="text-gray-400">
                  Data:{" "}
                  {new Date(reservation.reservationDate).toLocaleDateString()}
                </p>
                <p className="text-gray-400">
                  Număr de persoane: {reservation.invitedPeople}
                </p>
                {reservation.cancelled ? (
                  <p className="mt-2 bg-red-500"> Rezervare anulatax</p>
                ) : (
                  <button
                    className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      // Handle delete reservation
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
