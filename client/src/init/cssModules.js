import { getEnv } from '@lib/env';
import { cssModulesIdentifier } from '@config';

if (getEnv('NODE_ENV', 'development') === 'development') {
  // Only compile css modules on the fly in development mode.
  require('css-modules-require-hook')({
    extensions: ['.scss'],
    generateScopedName: cssModulesIdentifier,
    devMode: true
  });
}
