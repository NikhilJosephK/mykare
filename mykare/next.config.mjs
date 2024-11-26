/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'mykare-logos.s3.ap-south-1.amazonaws.com',
            pathname: '/mykare/**',
          },
        ],
      }
};

export default nextConfig;
