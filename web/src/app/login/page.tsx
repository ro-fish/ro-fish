"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { LOGIN } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN, { email, password });
      if (response.data.token) {
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${response.data.token}`;
        localStorage.setItem("authToken", response.data.token);

        // Get user roles after successful login
        const rolesResponse = await axios.get("/api/auth/roles", {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        });

        // Trigger authChange event with roles
        window.dispatchEvent(
          new CustomEvent("authChange", {
            detail: {
              isLoggedIn: true,
              roles: rolesResponse.data.roles || [],
            },
          }),
        );

        router.push("/");
        router.refresh(); // This will help ensure the page is fully reloaded
      }
    } catch (error) {
      alert("Autentificare eșuată. Te rugăm să verifici datele introduse.");
      console.error("Login error:", error);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-md mx-auto py-20 px-4">
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
          <div className="text-center mb-8">
            <svg
              className="mx-auto h-16 w-16 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="mt-4 text-2xl font-bold text-white">
              Autentificare
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Adresă Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Parolă
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Intră în cont
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Nu ai cont?{" "}
              <Link
                href="/register"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Înregistrează-te
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
