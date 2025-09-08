import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["raw.githubusercontent.com"], // allow PokeAPI sprite host
  },
};

export default nextConfig;
