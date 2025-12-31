import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          new URL(process.env.NEXT_PUBLIC_API_BASE_URL || "").hostname ||
          "localhost",
      },
    ],
  },

  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  // Optional for server deployment
  output: "standalone",
};

export default nextConfig;
