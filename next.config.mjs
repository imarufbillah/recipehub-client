/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "***",
      },
    ],
    qualities: [70, 75, 80, 85, 90, 95, 100],
    minimumCacheTTL: 0,
  },
};

export default nextConfig;
