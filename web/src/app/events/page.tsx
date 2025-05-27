import React from "react";

const EventsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex items-center justify-center p-6">
      <div className="bg-gray-800 rounded-2xl p-8 shadow-lg max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Evenimente</h1>
        <p className="text-lg text-gray-300">
          Momentan nu sunt evenimente disponibile.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Revino mai târziu pentru a vedea noutățile legate de pescuit!
        </p>
      </div>
    </div>
  );
};

export default EventsPage;
