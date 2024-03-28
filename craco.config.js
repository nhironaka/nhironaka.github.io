const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { whenDev } = require('@craco/craco');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@services': path.resolve(__dirname, './src/services'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@scss': path.resolve(__dirname, './src/scss'),
    },
    ...whenDev(() => [new CircularDependencyPlugin()], []),
  },
  eslint: {
    config: path.resolve(__dirname, './eslint.config.js'),
  },
};
