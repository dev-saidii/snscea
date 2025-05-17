import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ This skips type checking during build
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
