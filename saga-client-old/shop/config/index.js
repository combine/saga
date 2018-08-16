module.exports = {
  // Enable or disable server-side rendering
  enableSSR: true,

  // Enable or disable dynamic imports (code splitting)
  enableDynamicImports: false,

  // The env vars to expose on the client side. If you add them here, they will
  // be available on the client as process.env[VAR_NAME], same as they would be
  // in node.js.
  //
  // **WARNING**: Be careful not to expose any secrets here!
  clientEnv: [
    'NODE_ENV',
    'APPLICATION_BASE_URL',
    'ALGOLIA_APP_ID',
    'ALGOLIA_SEARCH_KEY'
  ],

  /* The identifier to use for css-modules.
   */
  cssModulesIdentifier: '[name]__[local]__[hash:base64:5]',

  // Webpack stats asset file. This file is created by webpack after asset
  // compilation and allows the server to reference the correct bundles.
  // The file is located relative to `webpack.config.output.path`. In dev mode,
  // this file is availble on the dev server.
  manifestFilename: 'webpack-manifest.json',
};
