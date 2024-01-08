/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com/a/**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
