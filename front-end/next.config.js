// const withImages = require('next-images')
// module.exports = withImages()
// const withCSS = require('@zeit/next-css');
// module.exports = withCSS({});
module.exports = {
  images: {
    domains: ['http://localhost:8000'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  }
};
