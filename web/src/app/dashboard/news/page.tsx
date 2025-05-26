"use client";

import { useState } from "react";

export default function AddArticleForm() {
  const [form, setForm] = useState({
    title: "",
    body: "",
    category: "pesti",
    thumbnail: null as File | null,
    mainImage: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("body", form.body);
    formData.append("category", form.category);
    if (form.thumbnail) formData.append("thumbnail", form.thumbnail);
    if (form.mainImage) formData.append("mainImage", form.mainImage);

    const res = await fetch("http://localhost:8080/api/news", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Articol adăugat cu succes!");
      setForm({
        title: "",
        body: "",
        category: "pesti",
        thumbnail: null,
        mainImage: null,
      });
    } else {
      alert("Eroare la adăugare.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">
          Adaugă un articol nou
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Titlu
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Titlul articolului"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Categorie
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="pesti">Pești</option>
              <option value="natura">Natură</option>
              <option value="concursuri">Concursuri</option>
              <option value="despre balta">Despre baltă</option>
              <option value="altele">Altele</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Corpul articolului
            </label>
            <textarea
              name="body"
              value={form.body}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Scrie conținutul articolului aici..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Thumbnail
            </label>
            <input
              name="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Imagine principală
            </label>
            <input
              name="mainImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Publică Articolul
          </button>
        </form>
      </div>
    </div>
  );
}
