import path from 'path';
import moduleAlias from 'module-alias';
import { _moduleAliases } from '../../package.json';
import { mapValues } from 'lodash';

// Add module aliases, but for server aliases (prefix by the `$` symbol), change
// the directory to match the current build directory (e.g. /dist)
// This ensures that all alises are properly referencing the babel-built
// server files
const aliases = mapValues(_moduleAliases, (aliasPath) => {
  return path.join(__dirname, '..', '..', aliasPath);
});

moduleAlias.addAliases(aliases);
