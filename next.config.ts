import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eltatapet.cl',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: '*.eltatapet.cl',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
