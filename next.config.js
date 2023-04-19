/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.api-futebol.com.br", "cdn.api-futebol.com.br"],
  },
};

module.exports = nextConfig;
