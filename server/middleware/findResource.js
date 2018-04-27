import { capitalize } from 'lodash';
import { ApiError, ResourceError } from '$lib/errors';
import * as models from '$models';

/** Middleware to find the resource based on the parameters supplied
 * @param {String} resourceName - name in lowercase, singular, e.g. 'product'
 * @param {String} options.column - The column to find by. default: 'id'
 * @param {String} options.param - The request parameter to use. default: 'id'
 */
export default (resourceName, options = {}) => {
  const opts = Object.assign({ column: 'id', param: 'id' }, options);

  return async (req, res, next) => {
    const modelName = capitalize(resourceName);
    const Model = models[modelName];

    if (!Model) {
      throw new ResourceError({
        type: 'InvalidResource',
        message: `Cannot find resource: model ${modelName} does not exist.`
      });
    }

    const resource = await Model.query()
      .where(opts.column, req.params[options.param])
      .first();

    if (!resource) {
      return next(new ApiError({
        type: 'Not Found',
        data: `${modelName} not found.`
      }));
    }

    req[resourceName] = resource;
    req.currentResource = resource;

    return next();
  };
};
