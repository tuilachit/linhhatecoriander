/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['yfoabnlsnxxqkqlrqoua.supabase.co'],
  },
}

module.exports = nextConfig 