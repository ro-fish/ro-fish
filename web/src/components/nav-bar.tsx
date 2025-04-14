"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    axios
      .get("/api/auth/me")
      .then((response) => setIsLoggedIn(response.status === 200));
  }, []);

  return (
    <nav className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <svg
              className="w-8 h-8 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-9-3V11m0-5.5v-1a10 10 0 0120 0v1"
              />
            </svg>
            <span className="ml-2 text-xl font-bold text-white">ro-fish</span>
          </Link>
          {isLoggedIn ? (
            <button
              onClick={() => {
                axios
                  .get("/api/auth/logout", {})
                  .then((_) => setIsLoggedIn(false));
              }}
            >
              Delogare
            </button>
          ) : (
            <div className="flex space-x-4">
              <Link
                href="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Autentificare
              </Link>
              <Link
                href="/register"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Înregistrare
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
