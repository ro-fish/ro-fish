"use client"; // This tells Next.js to treat the file as a client-side component

import { useEffect, useState } from "react";
import Link from "next/link";

type Article = {
  title: string;
  link: string;
  thumbnailUrl: string;
};

type NewsData = {
  recent: Article[];
  popular: Article[];
  site: Article[];
};

export default function News() {
  const [news, setNews] = useState<NewsData | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/news") // Update with your API URL if necessary
      .then((res) => res.json())
      .then(setNews)
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  const titles = {
    recent: "📝 Articole recente",
    popular: "🔥 Cele mai citite",
    site: "🧭 Noutăți site",
  };

  return (
    <div className="min-h-screen bg-gray-900 py-16 px-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 text-center mb-16">
          📰 Noutăți din lumea pescuitului
        </h1>

        {/* List of Articles */}
        <div className="space-y-16">
          {(["recent", "popular", "site"] as Array<keyof NewsData>).map((category) => (
            <div key={category}>
              <h2 className="text-2xl font-bold text-blue-300 mb-6">
                {titles[category as keyof typeof titles]}
              </h2>

              {news && news[category].length === 0 ? (
                <p className="text-gray-500">Nu sunt articole disponibile momentan.</p>
              ) : (
                news &&
                news[category].map((article, i) => (
                  <div key={i} className="mb-8">
                    <div className="flex items-start gap-6 mb-6">
                      {/* Thumbnail */}
                      <img
                        src={article.thumbnailUrl}
                        alt={article.title}
                        className="w-32 h-32 object-cover rounded-md border border-gray-700"
                      />

                      {/* Article Title and Link */}
                      <div>
                        <Link
                          href={article.link}
                          className="text-lg font-semibold text-gray-200 hover:text-blue-200 hover:underline transition"
                        >
                          {article.title}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
