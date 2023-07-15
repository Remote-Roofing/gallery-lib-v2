/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
      appDir: true,
    },
    images: {
      domains: ["loremflickr.com", "res.cloudinary.com"],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.module.rules.push({
        test: /\.tsx?$/, // For .ts and .tsx files
        exclude: /node_modules/,
        use: {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                noEmit: false,
              },
            },
        },
      });

      return config;
    },
  }
  
  module.exports = nextConfig
