const { override } = require(`customize-cra`);
const cspHtmlWebpackPlugin = require(`csp-html-webpack-plugin`);

const cspConfigPolicy = {
  'default-src': `'none'`,
  'base-uri': `'self'`,
  'object-src': `'none'`,
  'script-src': [`'self'`],
  'style-src': [`'self'`],
};

function addCspHtmlWebpackPlugin(config) {
  if (process.env.NODE_ENV === `production`) {
    config.plugins.push(new cspHtmlWebpackPlugin(cspConfigPolicy)); //eslint-disable-line
  }

  return config;
}

module.exports = {
  webpack: override(addCspHtmlWebpackPlugin),
};
