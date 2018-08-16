// import path from 'path';
// import { template, difference } from 'lodash';
// import { Helmet } from 'react-helmet';
// import { manifestFilename } from '@config';
// import safeRequire from '@lib/safeRequire';

// const output = process.env.PUBLIC_OUTPUT_PATH || 'dist/public';
// const manifestPath = path.join(__dirname, '../..', output, manifestFilename);

// const getAssets = (layout, chunks = []) => {
//   const manifest = safeRequire(manifestPath);
//   const isLayout = f => f.match(new RegExp(layout));
//   const isVendor = f => f.match(new RegExp(`${layout}\\.vendor`));
//   const isCss = f => f.match(/.css/);
//   const isJs = f => f.match(/.js/);
//   const assetPath = k => manifest[k];
//   const keys = Object.keys(manifest);
//
//   // vendors go first.
//   const bundles = keys.filter(isLayout);
//   const vendors = keys.filter(isVendor);
//   const assets = [...vendors, ...difference(bundles, vendors)];
//
//   return {
//     css: [
//       ...assets.filter(isCss).map(assetPath),
//       ...chunks.map(b => b.file).filter(isCss)
//     ],
//     js: [
//       ...assets.filter(isJs).map(assetPath),
//       ...chunks.map(b => b.file).filter(isJs)
//     ]
//   };
// };

export default function render(html, layout, state = {}, chunks = []) {

  return `<html><body>${html}</body></html>`;

  // const assets = getAssets(layout, chunks);
  // const compile = template(safeRequire(`@templates/layouts/${layout}.html`));
  // const helmet = Helmet.renderStatic();
  //
  // return compile({
  //   html,
  //   helmet,
  //   assets,
  //   state
  // });
}
