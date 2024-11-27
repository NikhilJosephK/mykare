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
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      // Disable HMR in production
      config.plugins = config.plugins.filter(
        plugin => plugin.constructor.name !== 'HotModuleReplacementPlugin'
      );
    }
    config.optimization.splitChunks = {
      chunks: 'all',
    }
    return config
  }
};

export default nextConfig;
