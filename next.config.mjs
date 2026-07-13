/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hevjlwjdwicgmdzllhjb.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig
