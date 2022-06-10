/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/.well-known/lnurlp/:slug',
        destination: '/api/well-known/:slug',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
