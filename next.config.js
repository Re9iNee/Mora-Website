/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "s3.eu-central-1.amazonaws.com" },
      {
        protocol: "https",
        hostname: "mora-uploads.s3.eu-central-1.amazonaws.com",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
