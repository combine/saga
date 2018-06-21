import path from 'path';
import { template } from 'lodash';
import { Helmet } from 'react-helmet';
import { manifestFilename } from '@config';
import { safeRequire } from './helpers';

const output = process.env.PUBLIC_OUTPUT_PATH || 'dist/public';
const manifestPath = path.join(__dirname, '../..', output, manifestFilename);

const getAssets = (layout, chunks = []) => {
  const manifest = safeRequire(manifestPath);
  const isLayout = f => f.match(new RegExp(layout));
  const isVendor = f => f.match(/vendor/);
  const isCss = f => f.match(/.css/);
  const isJs = f => f.match(/.js/);
  const assetPath = k => manifest[k];

  const keys = Object.keys(manifest);

  // vendors go first.
  const bundles = [ ...keys.filter(isVendor), ...keys.filter(isLayout) ];

  return {
    css: [
      ...bundles.filter(isCss).map(assetPath),
      ...chunks.map(b => b.file).filter(isCss)
    ],
    js: [
      ...bundles.filter(isJs).map(assetPath),
      ...chunks.map(b => b.file).filter(isJs)
    ]
  };
};

export default async function render(html, layout, state = {}, chunks = []) {
  const assets = getAssets(layout, chunks);
  const compile = template(safeRequire(`@templates/layouts/${layout}.html`));
  const helmet = Helmet.renderStatic();

  return compile({
    html,
    helmet,
    assets,
    state
  });
}
