import path from 'path';
import { template } from 'lodash';
import { Helmet } from 'react-helmet';
import { getEnv } from '@shared/lib/env';
import { webpackStatsFilename } from '@config';
import { safeRequire } from './helpers';
import axios from 'axios';

const env = getEnv();
const publicAssetPath = process.env.PUBLIC_ASSET_PATH || '/assets/';
const outputPath = process.env.PUBLIC_OUTPUT_PATH || 'dist/public';

const getAssets = async () => {
  if (env === 'development') {
    // In dev, this file comes from the dev server, so we have to request it via
    // an http request.
    const uri = `${publicAssetPath}${webpackStatsFilename}`;

    try {
      return (await axios.get(uri)).data;
    } catch (err) {
      console.error(`Could not fetch asset manifest from ${uri}:`, err);
    }
  } else {
    // In production, just require() the JSON stats file since the manifest is
    // hosted on the same server.
    const module = path.join('..', '..', outputPath, webpackStatsFilename);
    return Promise.resolve(
      safeRequire(module)
    );
  }
};

export default async function render(
  html,
  layout,
  initialState = {},
  bundles = []
) {
  const compile = template(safeRequire(`@templates/layouts/${layout}.html`));
  const helmet = Helmet.renderStatic();
  const assets = await getAssets();
  const appJs = assets[layout].js;
  const appCss = assets[layout].css;
  const vendorJs = assets.vendor.js;
  const vendorCss = assets.vendor.css;
  const chunkCss = bundles.filter(bundle => bundle.file.match(/.css/));
  const chunkJs = bundles.filter(bundle => bundle.file.match(/.js/));

  return compile({
    html,
    helmet,
    appCss,
    appJs,
    vendorJs,
    vendorCss,
    chunkCss,
    chunkJs,
    initialState,
    assetPath: asset => `${publicAssetPath}${asset}`
  });
}
