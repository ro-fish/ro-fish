"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Dashboard = () => {
  const router = useRouter();
  const isAdmin = true;

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isAdmin ? (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-blue-400 text-center mb-8">
              Panou Administrare
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <button
                onClick={() => router.push("dashboard/spots")}
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg p-6 transition-colors"
              >
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-blue-400 mb-2">
                    Locuri de Pescuit
                  </h2>
                  <p className="text-gray-300">
                    Gestionează zonele de pescuit disponibile
                  </p>
                </div>
              </button>

              <button
                onClick={() => router.push("dashboard/news")}
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg p-6 transition-colors"
              >
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-blue-400 mb-2">
                    Articole știri
                  </h2>
                  <p className="text-gray-300">
                    Adaugă un nou articol pe pagina de știri
                  </p>
                </div>
              </button>

              <button
                onClick={() => router.push("dashboard/users")}
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg p-6 transition-colors"
              >
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-blue-400 mb-2">
                    Utilizatori
                  </h2>
                  <p className="text-gray-300">
                    Gestionează conturile utilizatorilor
                  </p>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">
                Rezervările mele
              </h2>
              <div className="text-gray-300">
                {/* Placeholder for reservations */}
                <p className="text-center py-8">
                  Momentan nu ai nicio rezervare
                </p>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">
                Noutăți
              </h2>
              <div className="text-gray-300">
                {/* Placeholder for news */}
                <p className="text-center py-8">Nu sunt noutăți disponibile</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
