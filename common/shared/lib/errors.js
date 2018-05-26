import { isEmpty, mapValues } from 'lodash';

const mapErrors = (err) => {
  return mapValues(err, (fields) => {
    return fields.map(field => field.message).join('\n');
  });
};

// @param error {Object}: The error object from GraphQL
// @param gqlPath {String|Array}: The path, or an array of paths to format
export const getValidationErrors = (error, gqlPath = null) => {
  const { graphQLErrors } = error;
  const isArr = Array.isArray(gqlPath);

  if (!isEmpty(graphQLErrors)) {
    // filter out errors that are validation errors and, if a path is specified,
    // only the errors for that path.
    const errors = graphQLErrors.filter(gqlError => {
      const { name, path } = gqlError;
      const isValidation = name === 'ValidationError';

      if (gqlPath) {
        return isArr
          ? (isValidation && gqlPath.includes(path[0]))
          : (isValidation && path[0] === gqlPath);
      }

      return isValidation;
    });

    // format for ease of use
    if (errors.length) {
      if (gqlPath && !isArr) {
        return mapErrors(errors[0].data);
      }

      return errors.map((err) => {
        return { path: err.path[0], errors: mapErrors(err.data) };
      });
    }
  }

  return [];
};
