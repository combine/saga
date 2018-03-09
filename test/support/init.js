const { setup } = require('./db');

// This files runs via 'npm pretest' and is run automatically before test
setup().then(() => {
  process.exit(0);
});
