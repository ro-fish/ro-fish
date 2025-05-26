"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { FETCH_POSTS, ADD_POST, REMOVE_POST, CHECK_AUTH } from "@/lib/api";

type Post = {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

const monthNames = [
  "ianuarie",
  "februarie",
  "martie",
  "aprilie",
  "mai",
  "iunie",
  "iulie",
  "august",
  "septembrie",
  "octombrie",
  "noiembrie",
  "decembrie",
];

const Posts = () => {
  console.log(
    "..............................................................................",
  );
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  // Check if user is admin
  const checkAdminStatus = async () => {
    try {
      const response = await axios.get(CHECK_AUTH);
      setIsAdmin(response.data.roles?.includes("ADMIN") || false);
    } catch (error) {
      setIsAdmin(false);
    }
  };

  const fetchPosts = () => {
    console.log("Fetching posts...");
    setIsLoading(true);
    axios
      .get<Post[]>(FETCH_POSTS)
      .then((response) => {
        // Ensure dates are properly formatted
        const formattedPosts = response.data.map((post) => ({
          ...post,
          createdAt: post.createdAt || new Date().toISOString(),
          updatedAt: post.updatedAt || new Date().toISOString(),
        }));
        console.log("Fetched posts:", formattedPosts);
        setPosts(formattedPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log(
      "Component mounted, checking admin status and fetching posts...",
    );
    checkAdminStatus();
    fetchPosts();
  }, []);

  const handleAddPost = () => {
    if (!newPost.title || !newPost.content) return;

    setIsLoading(true);
    axios
      .post(ADD_POST, newPost)
      .then(() => {
        fetchPosts();
        setNewPost({ title: "", content: "", imageUrl: "" });
        (
          document.getElementById("add-post-modal") as HTMLDialogElement
        )?.close();
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeletePost = (id: number) => {
    if (!window.confirm("Sigur vrei să ștergi acest articol?")) return;

    setIsLoading(true);
    axios
      .delete(REMOVE_POST.replace("{id}", id.toString()))
      .then(() => {
        fetchPosts();
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Format date as "day monthName year, HH:MM"
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Data necunoscută";

      const day = date.getDate();
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");

      return `${day} ${month} ${year}, ${hours}:${minutes}`;
    } catch {
      return "Data necunoscută";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              Articole și Noutăți
            </h2>
            {isAdmin && (
              <button
                className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white font-semibold py-2 px-5 rounded-xl shadow"
                onClick={() =>
                  (
                    document.getElementById(
                      "add-post-modal",
                    ) as HTMLDialogElement
                  )?.showModal()
                }
              >
                + Adaugă Articol
              </button>
            )}
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="text-center py-8">
              <span className="text-gray-400">Se încarcă...</span>
            </div>
          )}

          {/* Posts list */}
          <div className="space-y-6">
            {posts.length === 0 && !isLoading ? (
              <p className="text-gray-400 text-center py-8">
                Nu există articole disponibile.
              </p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-700 p-6 rounded-xl border border-gray-600 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    {post.imageUrl && (
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-32 h-32 object-cover rounded-md"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">
                          {post.title}
                        </h3>
                        {isAdmin && (
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Șterge
                          </button>
                        )}
                      </div>
                      <p className="text-gray-400 mt-2">{post.content}</p>
                      <p className="text-gray-500 text-sm mt-2">
                        {formatDate(post.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Post Modal - Only needed if admin */}
      {isAdmin && (
        <dialog
          id="add-post-modal"
          className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md"
        >
          <h3 className="text-xl font-bold text-white mb-4">
            Adaugă Articol Nou
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Titlu*
              </label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                className="w-full bg-gray-700 border border-gray-600 rounded-md text-white p-2"
                placeholder="Introdu titlul articolului"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Conținut*
              </label>
              <textarea
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                className="w-full bg-gray-700 border border-gray-600 rounded-md text-white p-2 min-h-[150px]"
                placeholder="Introdu conținutul articolului"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                URL Imagine (opțional)
              </label>
              <input
                type="text"
                value={newPost.imageUrl}
                onChange={(e) =>
                  setNewPost({ ...newPost, imageUrl: e.target.value })
                }
                className="w-full bg-gray-700 border border-gray-600 rounded-md text-white p-2"
                placeholder="Introdu URL-ul imaginii"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() =>
                (
                  document.getElementById("add-post-modal") as HTMLDialogElement
                )?.close()
              }
              className="px-4 py-2 text-gray-300 hover:text-white"
            >
              Anulează
            </button>
            <button
              onClick={handleAddPost}
              disabled={isLoading || !newPost.title || !newPost.content}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white disabled:opacity-50"
            >
              {isLoading ? "Se încarcă..." : "Salvează"}
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Posts;
