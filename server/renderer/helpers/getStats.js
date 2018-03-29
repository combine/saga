// Get stats from react-loadable.json if needed
export default function getStats(enableDynamicImports = false) {
  // This is a small 'hack' to tell webpack to avoid resolving the below file
  // during compilation, since react-loadable.json may or may not exist.
  const requireFunc = typeof __webpack_require__ === 'function'
    ? __non_webpack_require__
    : require;

  if (enableDynamicImports) {
    return requireFunc('../../react-loadable.json');
  }

  return null;
}
