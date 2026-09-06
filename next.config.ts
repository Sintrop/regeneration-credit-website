import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "sintrop.com" },
      { protocol: "https", hostname: "www.sintrop.com" },
      { protocol: "https", hostname: "ipfs.sintrop.com" },
      { protocol: "https", hostname: "explorer.sintrop.com" },
      { protocol: "https", hostname: "regenerationcredit.org" }
    ]
  }
};

export default nextConfig;
