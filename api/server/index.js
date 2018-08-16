require('./init');

// This check is required to prevent test environments from starting the server
// over and over again.
if (!module.parent) {
  require('./startServer').default();
}
