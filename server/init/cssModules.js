import { getEnv } from '@lib/env';
import { cssModulesIdentifier } from '@config';

if (getEnv('NODE_ENV', 'development') === 'development') {
  // In development, we compile css-modules on the fly on the server. This is
  // not necessary in production since we build renderer and server files with
  // webpack and babel.

  require('css-modules-require-hook')({
    extensions: ['.scss'],
    generateScopedName: cssModulesIdentifier,
    devMode: true
  });
}
