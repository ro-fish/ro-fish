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
  };
  const [users, setUser] = React.useState<UserData[]>([]);

  const fetchUsers = () => {
    axios.get<UserData[]>(FETCH_USERS).then((response) => {
      setUser(response.data);
    });
  };

  useEffect(() => fetchUsers());

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

                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.isAdmin
                          ? "bg-blue-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {user.isAdmin ? "Administrator" : "Utilizator"}
                    </span>
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
