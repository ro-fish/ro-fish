"use client";

import { FETCH_POSTS } from "@/lib/api";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Articles = () => {
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

  useEffect(() => fetchPosts(), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Articole de Stiri</h2>
          </div>

          {/* Lista postari */}
          <div className="space-y-6">
            {posts.map((post: PostData) => (
              <div
                className="max-w mx-auto bg-gray-700 rounded-2xl shadow-md overflow-hidden"
                key={post.id}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {post.title}
                  </h2>
                  <div className="text-sm text-gray-300 mb-4">
                    {/* <span className="text-blue-400 font-semibold">{post.category}</span> •{" "} */}
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

export default Articles;
