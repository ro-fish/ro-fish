"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { REGISTER } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setName] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("aaa");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      return;
    }

    axios
      .post(REGISTER, {
        email,
        fullName,
        password,
      })
      .then((response) => {
        if (response.status === 409) {
          setEmailError("Cont deja existent!");
          return;
        }

        if (response.data.success) {
          router.push("/login");
        }
      });
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      setPasswordError("Parola trebuie să aibă minim 8 caractere.");
      return false;
    }
    if (!hasUpperCase) {
      setPasswordError("Parola trebuie să conțină cel puțin o literă mare.");
      return false;
    }
    if (!hasLowerCase) {
      setPasswordError("Parola trebuie să conțină cel puțin o literă mică.");
      return false;
    }
    if (!hasNumber) {
      setPasswordError("Parola trebuie să conțină cel puțin un număr.");
      return false;
    }
    if (!hasSpecialChar) {
      setPasswordError(
        "Parola trebuie să conțină cel puțin un caracter special.",
      );
      return false;
    }

    setPasswordError("");
    return true;
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            <h2 className="mt-4 text-2xl font-bold text-white">Înregistrare</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Nume complet
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Adresă Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {emailError !== "" && (
                <label className="text-red-500 text-sm">{emailError}</label>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Parolă
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {passwordError !== "" && (
                <label className="text-red-500 text-sm">{passwordError}</label>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Creează cont
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Ai deja cont?{" "}
              <Link
                href="/login"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Autentifică-te
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
