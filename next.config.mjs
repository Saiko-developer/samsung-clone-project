import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.samsung.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pfb-group.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'brightsparks.com.sg',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'au2-images.shop.samsung.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rukminim2.flixcart.com',
        pathname: '/**',
      },
    ],
  },
};

export default withFlowbiteReact(nextConfig);