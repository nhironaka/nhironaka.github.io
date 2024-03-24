const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { whenDev, getLoader, loaderByName } = require('@craco/craco');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, '../components'),
      '@services': path.resolve(__dirname, '../services'),
      '@config': path.resolve(__dirname, '../config'),
      '@shared': path.resolve(__dirname, '../shared'),
      '@styles': path.resolve(__dirname, '../styled-system'),
    },
    configure(webpackConfig) {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName('postcss-loader'),
      );

      if (isFound) {
        match.loader.options.postcssOptions.plugins = [
          ...match.loader.options.postcssOptions.plugins,
          require('@pandacss/dev/postcss')({
            configPath: 'src/config/panda.config.ts',
          }),
        ];
      }

      return webpackConfig;
    },
    ...whenDev(() => [new CircularDependencyPlugin()], []),
  },
  babel: {
    presets: [],
    plugins: [
      // Add your babel plugins here if needed
    ],
  },
  eslint: {
    config: './eslint.config.js',
  },
  jest: {
    configure: {
      // Jest configuration options can be added here
    },
  },
};
