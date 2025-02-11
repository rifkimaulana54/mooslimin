/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api-dev.mooslimin.com', 'api-dev1.mooslimin.com', 'localhost:9001'],
  },
};

export default nextConfig;
