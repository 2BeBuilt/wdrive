/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api',
        destination: `http://wdrive-express:${process.env.EXPRESS_PORT}/api`,
      },
    ]
  },
}

module.exports = nextConfig
