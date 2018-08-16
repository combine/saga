export const getEnv = (key, def = null) => {
  if (typeof process.env[key] === 'undefined') {
    return def;
  }

  return process.env[key];
};
