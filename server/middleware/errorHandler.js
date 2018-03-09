import { ValidationError } from 'objection';
import { ApiError } from '$lib/errors';

export default function errorHandler(err, req, res, _) {
  let statusCode = err.statusCode || err.status || 500;
  let json = {};

  if (err instanceof ValidationError) {
    switch (err.type) {
      case 'ModelValidation':
        json = {
          type: err.type,
          errors: err.data
        };
        break;
      default:
        json = {
          type: 'UnknownValidationError',
          errors: {}
        };
        break;
    }
  } else if (err instanceof ApiError) {
    json = {
      type: err.type,
      errors: err.data
    };
  } else {
    console.error(err);
  }

  res.status(statusCode).json(json);
}
