import yn from 'yn';
import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { ReactLoadablePlugin } from 'react-loadable/webpack';
import { mapValues, keyBy, filter } from 'lodash';
import { _moduleAliases } from '../package.json';
import babelOpts from './babel.config.client';
import * as config from '../config';

const isDev = process.env.NODE_ENV === 'development';
const cwd = process.cwd();
const { enableDynamicImports, clientEnv, cssModulesIdentifier } = config;

if (isDev) require('dotenv').load();

export const isSSR = yn(process.env.SSR) || false;
export const analyzeBundle = yn(process.env.ANALYZE) || false;
export const basePlugins = {
  reactLoadablePlugin: new ReactLoadablePlugin({
    filename: path.join(__dirname, '..', 'react-loadable.json')
  }),
  miniExtractPlugin: new MiniCssExtractPlugin({
    filename: '[name].[chunkhash].css'
  }),
  definePlugin: new webpack.DefinePlugin({
    'process.env': mapValues(keyBy(clientEnv), env => {
      return JSON.stringify(process.env[env]);
    })
  }),
  bundleAnalyzerPlugin: new BundleAnalyzerPlugin(),
  manifestPlugin: new ManifestPlugin({
    fileName: config.manifestFilename
  })
};

const allowedPlugin = (plugin, key) => {
  switch (key) {
    case 'reactLoadablePlugin':
      return enableDynamicImports;
    case 'miniExtractPlugin':
      return !isSSR;
    case 'bundleAnalyzerPlugin':
      return analyzeBundle;
    default:
      return true;
  }
};

export default {
  context: path.resolve(__dirname, '..'),
  mode: isDev ? 'development' : 'production',
  entry: {
    app: ['./client/app'],
    admin: ['./client/admin']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'all',
          reuseExistingChunk: true,
          priority: 1,
          enforce: true,
          // extract to vendor chunk if it's in /node_modules
          test: module => /node_modules/.test(module.context)
        }
      }
    }
  },
  output: {
    path: path.join(__dirname, '..', process.env.PUBLIC_OUTPUT_PATH),
    filename: '[name].bundle.js',
    publicPath: process.env.PUBLIC_ASSET_PATH || '/assets/',
    chunkFilename: enableDynamicImports ? '[name].bundle.js' : undefined
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: mapValues(_moduleAliases, aliasPath =>
      path.join(cwd, ...aliasPath.split('/'))
    )
  },
  plugins: filter(basePlugins, allowedPlugin),
  module: {
    rules: [
      {
        test: /\.jsx$|\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: babelOpts
      },
      {
        // For all .scss files that should be modularized. This should exclude
        // anything inside node_modules and everything inside common/css/base
        // since they should be globally scoped.
        test: /\.scss$/,
        exclude: [
          path.resolve(__dirname, '../node_modules'),
          path.resolve(__dirname, '../common/css/base')
        ],
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              minimize: false,
              importLoaders: 1,
              localIdentName: cssModulesIdentifier
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
      },
      {
        // for .scss modules that need to be available globally, we don't pass
        // the files through css-loader to be modularized.
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, '../node_modules'),
          path.resolve(__dirname, '../common/css/base')
        ],
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { modules: false } },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './common/css/resources/*.scss'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        ]
      },
      {
        // Load fonts using file-loader
        test: /\.(ttf|eot|woff2?)$/,
        loader: 'file-loader'
      }
    ]
  }
};
