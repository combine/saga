import path from 'path';
import moduleAlias from 'module-alias';
import { mapValues } from 'lodash';

// Enable module aliases referenced in package.json
const cwd = process.cwd();
const { _moduleAliases } = require(path.join(cwd, '..', 'package.json'));

moduleAlias.addAliases(
  mapValues(_moduleAliases, aliasPath => path.join(cwd, aliasPath))
);
