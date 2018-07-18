import nodeExternals from 'webpack-node-externals';
import merge from 'webpack-merge';
import path from 'path';
import config from '../config';
import babelOpts from './babel.config.ssr';
import { enableDynamicImports } from '../config';
import baseConfig, { basePlugins, analyzeBundle } from './base.client';
import { filter } from 'lodash';

const allowedPlugin = (plugin, key) => {
  switch (key) {
    case 'reactLoadablePlugin':
      return enableDynamicImports;
    case 'bundleAnalyzerPlugin':
      return analyzeBundle;
    case 'manifestPlugin':
      return false;
    default:
      return true;
  }
};

export default merge.strategy({
  entry: 'replace',
  plugins: 'replace',
  module: 'replace',
  optimization: 'replace'
})(baseConfig, {
  context: null,
  mode: 'development',
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true
    }
  },
  target: 'node',
  entry: ['./server/renderer/middleware.js'],
  externals: [
    // html files are required directly
    /\.(html|png|gif|jpg)$/,
    // treat all node modules as external to keep this bundle small
    nodeExternals()
  ],
  output: {
    path: path.join(__dirname, '..', process.env.OUTPUT_PATH, 'renderer'),
    filename: 'middleware.built.js',
    libraryTarget: 'commonjs'
  },
  plugins: [...filter(basePlugins, allowedPlugin)],
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOpts
        }
      },
      {
        test: /\.scss$/,
        exclude: [
          path.resolve(__dirname, '../node_modules'),
          path.resolve(__dirname, '../common/css/base')
        ],
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              minimize: false,
              importLoaders: 0,
              localIdentName: config.cssModulesIdentifier
            }
          },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './common/css/resources/*.scss'
            }
          }
        ]
      }
    ]
  }
});
