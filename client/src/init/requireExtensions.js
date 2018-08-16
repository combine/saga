/* Add custom require extensions here.
 *
 */

import fs from 'fs';

require.extensions['.html'] = (module, filename) => {
  // Allow HTML files to be read in as a string
  module.exports = fs.readFileSync(filename, 'utf8');
};
