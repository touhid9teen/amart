import type { NextConfig } from "next";

// Suppress the url.parse() deprecation warning from dependencies (CVE-safe)
const originalListeners = process.listeners("warning").slice();
process.removeAllListeners("warning");
process.on("warning", (warning) => {
  if (
    warning.name === "DeprecationWarning" &&
    warning.message.includes("url.parse()")
  ) {
    return;
  }
  for (const listener of originalListeners) {
    listener.call(process, warning);
  }
});

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
