"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Dashboard = () => {
  const router = useRouter();
  const isAdmin = true;

  return (
    <>
      {isAdmin ? (
        <div>
          <h1>Admin</h1>
          <input
            type="button"
            value="Editează locații pescuit"
            onClick={() => router.push("dashboard/spots")}
          />
          <input
            type="button"
            value="Editează utilizatori"
            onClick={() => router.push("dashboard/users")}
          />
        </div>
      ) : (
        <div>
          <div>
            <h1>Rezervările mele</h1>
          </div>
          <div>
            <h1>Noutăți</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
