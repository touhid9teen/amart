import type { NextConfig } from "next";

const getBackendHostname = () => {
  try {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (url) {
      return new URL(url).hostname;
    }
  } catch (_) {
    // Silently fail, use localhost
  }
  return "localhost";
};

const nextConfig: NextConfig = {
  reactStrictMode: false,

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: getBackendHostname(),
        pathname: "/**",
      },
    ],
    qualities: [75, 100],
  },

  // Optional for server deployment
  output: "standalone",
};

export default nextConfig;
