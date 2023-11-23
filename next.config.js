/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
    serverActions: true
  },
  images: {
    domains: ['localhost', '*.supabase.co']
  }
};

module.exports = nextConfig;
