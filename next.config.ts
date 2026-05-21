import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Increase limit to 10 Megabytes
    },
  },
  images: {
    remotePatterns: [
      {
        
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**'
      },
    ],
  },
};

export default nextConfig;
