// const withImages = require('next-images')
// module.exports = withImages()

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  }
};
