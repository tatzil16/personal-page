import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "cdn.akamai.steamstatic.com" },
      { hostname: "shared.akamai.steamstatic.com" },
      { hostname: "i.gr-assets.com" },
      { hostname: "images.gr-assets.com" },
    ],
  },
};

export default nextConfig;
