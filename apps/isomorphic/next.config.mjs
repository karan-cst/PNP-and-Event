import './src/env.mjs';
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/api/portraits/**',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/redqteam.com/isomorphic-furyroad/public/**',
      },
      {
        protocol: 'https',
        hostname: 'isomorphic-furyroad.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'isomorphic-furyroad.vercel.app',
      },
    ],
  },
  reactStrictMode: true,
  transpilePackages: ['core'],
};

export default nextConfig;

// next.config.js
// import './src/env.mjs';

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // ─── Turbopack (replaces Webpack in dev — biggest single win) ───
//   // Run with: next dev --turbo
//   experimental: {
//     turbopack: {},
//   },

//   // ─── Tree-shake large icon/UI libraries ─────────────────────────
//   // Isomorphic uses rizzui + heroicons + react-icons — all barrel-file heavy
//   modularizeImports: {
//     '@heroicons/react/24/outline': {
//       transform: '@heroicons/react/24/outline/{{member}}',
//     },
//     '@heroicons/react/24/solid': {
//       transform: '@heroicons/react/24/solid/{{member}}',
//     },
//     'react-icons/?(((\\w*)?/?)*)': {
//       transform: 'react-icons/{{ matches.[1] }}/{{member}}',
//     },
//     'lucide-react': {
//       transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
//       skipDefaultConversion: true,
//     },
//     lodash: {
//       transform: 'lodash/{{member}}',
//     },
//   },

//   // ─── Skip type/lint checks during dev builds ────────────────────
//   // Only affects dev speed — keep false for CI/production
//   typescript: {
//     ignoreBuildErrors: process.env.NODE_ENV === 'development',
//   },
//   eslint: {
//     ignoreDuringBuilds: process.env.NODE_ENV === 'development',
//   },

//   // ─── Your existing config (unchanged) ───────────────────────────
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'randomuser.me',
//         pathname: '/api/portraits/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'cloudflare-ipfs.com',
//         pathname: '/ipfs/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'avatars.githubusercontent.com',
//         pathname: '/u/**',
//       },
//       { protocol: 'https', hostname: 'picsum.photos' },
//       { protocol: 'https', hostname: 'flagcdn.com' },
//       { protocol: 'https', hostname: 'utfs.io' },
//       { protocol: 'https', hostname: 'images.unsplash.com' },
//       {
//         protocol: 'https',
//         hostname: 's3.amazonaws.com',
//         pathname: '/redqteam.com/isomorphic-furyroad/public/**',
//       },
//       { protocol: 'https', hostname: 'isomorphic-furyroad.s3.amazonaws.com' },
//       { protocol: 'https', hostname: 'isomorphic-furyroad.vercel.app' },
//     ],
//   },
//   reactStrictMode: true,
//   transpilePackages: ['core'],
// };

// export default nextConfig;
