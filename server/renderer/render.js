// cache the main layout template with lodash
import { template } from 'lodash';
import { Helmet } from 'react-helmet';
import { getEnv } from '@shared/lib/env';

const env = getEnv();

export default function render(html, layout, initialState = {}, bundles = []) {
  if (env === 'development') {
    global.ISOTools.refresh();
  }

  const compile = template(require(`@templates/layouts/${layout}.html`));
  const assets = global.ISOTools.assets();
  const helmet = Helmet.renderStatic();
  const appJs = assets.javascript[layout];
  const appCss = assets.styles[layout];
  const vendorJs = assets.javascript.vendor;
  const vendorCss = assets.styles.vendor;
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
    initialState
  });
}
