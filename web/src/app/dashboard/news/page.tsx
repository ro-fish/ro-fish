"use client";

import { FETCH_POSTS, REMOVE_POST } from "@/lib/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FishingSpotDTO from "@/types/fishing-spot";
import { FETCH_FISHING_SPOTS } from "@/lib/api";

const News = () => {
  const [posts, setPosts] = useState([]);

  type PostData = {
    id: number;
    title: string;
    content: string;
    thumbnailPath: string;
    imagePath: string;
    category: string;
    date: string;
    author: {
      id: number;
      fullName: string;
      email: string;
    };
  };
  const fetchPosts = () => {
    axios.get(FETCH_POSTS).then((response) => {
      const data = response.data;
      setPosts(data);
    });
  };
  const onRemove = (id: number) => {
    axios
      .delete(REMOVE_POST + id)
      .then(() => {
        alert("Articolul a fost șters cu succes!");
        fetchPosts();
      })
      .catch((error) => {
        console.error("Eroare la ștergerea articolului:", error);
        alert(
          "A apărut o eroare la ștergerea articolului. Te rugăm să încerci din nou.",
        );
      });
  };

  useEffect(() => fetchPosts(), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              Gestioneaza Articole
            </h2>
            <button
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white font-semibold py-2 px-5 rounded-xl shadow"
              onClick={() => (window.location.href = "./news/post")}
            >
              + Creează articol
            </button>
          </div>

          {/* Lista postari */}
          <div className="space-y-6">
            {posts.map((post: PostData) => (
              <div
                className="max-w mx-auto bg-gray-700 rounded-2xl shadow-md overflow-hidden"
                key={post.id}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-white">
                        {post.title}
                      </h2>
                      <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                        ID: {post.id}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemove(post.id)}
                      className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="text-sm text-gray-300 mb-4">
                    <span className="text-blue-400 font-semibold">
                      {post.category}
                    </span>{" "}
                    •{" "}
                    {new Date(post.date).toLocaleDateString("ro-RO", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <img
                    src={post.imagePath}
                    alt="Main"
                    className="w-full rounded-lg mb-4"
                  />
                  <p className="text-gray-200 leading-relaxed mb-6">
                    {post.content}
                  </p>
                  <div className="border-t border-gray-600 pt-4 text-sm text-gray-300">
                    Scris de{" "}
                    <span className="font-medium text-white">
                      {post.author.fullName}
                    </span>{" "}
                    (
                    <a
                      href={`mailto:${post.author.email}`}
                      className="text-blue-400 hover:underline"
                    >
                      {post.author.email}
                    </a>
                    )
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
