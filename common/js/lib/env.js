export const getEnv = (opts = { default: null }) => {
  return process.env['NODE_ENV'] || opts.default || 'development';
};
