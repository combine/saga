import path from 'path';
import { template } from 'lodash';
import { Helmet } from 'react-helmet';
import { manifestFilename } from '@config';
import { safeRequire } from './helpers';

export default async function render(
  html,
  layout,
  initialState = {},
  bundles = []
) {
  const outputPath = process.env.PUBLIC_OUTPUT_PATH || 'dist/public';
  const module = path.join(__dirname, '..', '..', outputPath, manifestFilename);
  const assets = safeRequire(module);
  const compile = template(safeRequire(`@templates/layouts/${layout}.html`));
  const helmet = Helmet.renderStatic();
  const chunkCss = bundles.filter(bundle => bundle.file.match(/.css/));
  const chunkJs = bundles.filter(bundle => bundle.file.match(/.js/));

  return compile({
    html,
    helmet,
    assets,
    chunkCss,
    chunkJs,
    initialState
  });
}
