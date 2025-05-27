"use client";

import { FETCH_USERS } from "@/lib/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FishingSpotDTO from "@/types/fishing-spot";
import { FETCH_FISHING_SPOTS } from "@/lib/api";

const Users = () => {
  type UserData = {
    id: number;
    email: string;
    fullName: string;
    isAdmin: boolean;
    isActive: boolean;
  };
  const [users, setUser] = React.useState<UserData[]>([]);

  const fetchUsers = () => {
    axios.get<UserData[]>(FETCH_USERS).then((response) => {
      setUser(response.data);
    });
  };

  useEffect(() => fetchUsers(), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Utilizatori</h2>
          </div>

          {/* Lista utilizatori */}
          <div className="space-y-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-gray-700 p-6 rounded-xl border border-gray-600 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {user.fullName}
                    </h3>
                    <p className="text-gray-400">{user.email}</p>
                    <p className="text-gray-300">
                      ID: #<span className="font-bold">{user.id}</span>
                    </p>
                  </div>

                  <div className="flex flex-col items-start space-y-2">
                    <span
                      className={`w-full px-3 py-1 rounded-full text-sm text-center ${
                        user.isAdmin
                          ? "bg-blue-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {user.isAdmin ? "Administrator" : "Utilizator"}
                    </span>
                    {/* <button
                      onClick={() => {
                        axios
                          .put(`/api/users/${user.id}/set-active?active=${!user.isActive}`)
                          .then(() => {
                            if (user.isActive) {
                              alert("Contul utilizatorului nu mai este activ.");
                            } else {
                              alert("Contul utilizatorului este activ acum.");
                            }
                            fetchUsers();
                          })
                          .catch((error) => {
                            console.error("Eroare la modificarea utilizatorului:", error);
                            alert("A apărut o eroare la modificarea utilizatorului.");
                          });
                      }}
                      className="px-3 py-1 rounded-full text-sm bg-green-500 text-white"
                    >
                      {user.isActive ? "Dezactiveaza cont" : "Activeaza cont"}
                    </button> */}

                    <button
                      onClick={() => {
                        axios
                          .put(
                            `/api/users/${user.id}/set-admin?admin=${!user.isAdmin}`,
                          )
                          .then(() => {
                            if (user.isAdmin) {
                              alert("Utilizatorul nu mai este administrator.");
                            } else {
                              alert(
                                "Utilizatorul a fost făcut administrator cu succes!",
                              );
                            }
                            fetchUsers();
                          })
                          .catch((error) => {
                            console.error(
                              "Eroare la modificarea utilizatorului:",
                              error,
                            );
                            alert(
                              "A apărut o eroare la modificarea utilizatorului.",
                            );
                          });
                      }}
                      className="w-full px-3 py-1 rounded-full text-sm bg-green-500 text-white"
                    >
                      {user.isAdmin
                        ? "Scoate din administratori"
                        : "Adaugă la administratori"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {users.length === 0 && (
            <p className="text-gray-400 text-center py-8">
              Nu există utilizatori disponibili.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
