import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://${process.env.ROFISH_SERVER_ADDRESS || "localhost"}:${process.env.ROFISH_SERVER_PORT||"8080"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
