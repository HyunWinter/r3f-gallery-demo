/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        // Sanity.io
        hostname: 'cdn.sanity.io',
      },
      {
        // Microlink Image Preview
        hostname: 'api.microlink.io',
      },
      {
        // Twitter
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
      {
        // Twitter
        protocol: 'https',
        hostname: 'abs.twimg.com',
      },
    ],
  },
  transpilePackages: ['react-tweet'],
}

export default config
