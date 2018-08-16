// When using webpack on the server, we may need to use the native require()
// method to dynamic require a file, usually a .json file like a manifest.
export default function safeRequire(path) {
  const requireFunc = typeof __webpack_require__ === 'function'
    ? __non_webpack_require__
    : require;

  return requireFunc(path);
}
