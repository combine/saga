// cache the main layout template with lodash
import { template } from 'lodash';
import { Helmet } from 'react-helmet';
import { getEnv } from '@shared/lib/env';
import { webpackStatsFilename } from '@config';
import { safeRequire } from './helpers';
import axios from 'axios';

const env = getEnv();
const getAssets = async () => {
  const path = `${process.env.PUBLIC_ASSET_PATH}${webpackStatsFilename}`;

  if (env === 'development') {
    // In dev, this file comes from the dev server, so we have to request it via
    // an http request.
    try {
      return (await axios.get(path)).data;
    } catch (err) {
      console.error(`Could not fetch asset manifest from ${path}:`, err);
    }
  } else {
    return Promise.resolve(safeRequire(path));
  }
};

export default async function render(
  html,
  layout,
  initialState = {},
  bundles = []
) {
  const compile = template(require(`@templates/layouts/${layout}.html`));
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
    assetPath: (asset) => `${process.env.PUBLIC_ASSET_PATH}${asset}`
  });
}
