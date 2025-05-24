"use client";
import { CHECK_AUTH, LOGOUT } from "@/lib/api";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Verifică inițial starea
    const checkAuth = async () => {
      try {
        const response = await axios.get(CHECK_AUTH);
        setIsLoggedIn(true);
        setUserRoles(response.data.roles || []);
      } catch {
        setIsLoggedIn(false);
        setUserRoles([]);
      }
    };
    checkAuth();

    // Ascultă evenimente de auth change
    const handleAuthChange = (e: CustomEvent) => {
      setIsLoggedIn(e.detail.isLoggedIn);
      setUserRoles(e.detail.roles || []);
    };

    window.addEventListener("authChange", handleAuthChange as EventListener);

    return () => {
      window.removeEventListener(
        "authChange",
        handleAuthChange as EventListener,
      );
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(LOGOUT);
      localStorage.removeItem("authToken");
      delete axios.defaults.headers.common["Authorization"];

      // Anunță toate componentele
      window.dispatchEvent(
        new CustomEvent("authChange", {
          detail: { isLoggedIn: false, roles: [] },
        }),
      );

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isAdmin = userRoles.includes("ADMIN");

  return (
    <nav className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Partea stângă - Logo */}
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

          {/* Partea din mijloc - Navigație (doar când e logat) */}
          {isLoggedIn && (
            <div className="hidden md:flex space-x-6">
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              {isAdmin && <Link
                href="/dashboard/spots"
                className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Locuri
              </Link>}
              <Link
                href="/reservations"
                className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Rezervări
              </Link>
              {isAdmin && (
                <Link
                  href="/dashboard/news"
                  className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Știri
                </Link>
              )}
            </div>
          )}

          {/* Partea dreaptă - Autentificare/Logout */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-gray-800 text-red-400 hover:bg-gray-700 hover:text-red-300 px-4 py-2 rounded-md text-sm font-medium flex items-center border border-transparent hover:border-red-400/30 transition-all"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
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
      </div>
    </nav>
  );
}