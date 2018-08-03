import path from 'path';

export default function(moduleName) {
  return function(req, res, next) {
    const module = require(path.join(__dirname, '..', moduleName));

    if (module.default) {
      return module.default(req, res, next);
    }

    return module(req, res, next);
  };
}
