import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'lh3.googleusercontent.com',
    //     port: '',
    //     pathname: '**',
    //     search: '',
    //   },
    // ],
    unoptimized: true,
  },
};

export default nextConfig;
