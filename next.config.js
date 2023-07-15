/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.module.rules.push({
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              noEmit: false,
            },
          },
        },
      });
      
      return config;
    },
    experimental: {
      appDir: true,
    },
    images: {
      domains: ["loremflickr.com", "res.cloudinary.com"],
    },
  }
  
  module.exports = nextConfig
