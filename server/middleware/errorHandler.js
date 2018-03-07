import { ValidationError } from 'objection';

export default function errorHandler(err, req, res, _) {
  let statusCode = err.statusCode || err.status || 500;
  let json = {};

  if (err instanceof ValidationError) {
    switch (err.type) {
      case 'ModelValidation':
        json = {
          type: 'ModelValidation',
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
  }

  res.status(statusCode).json(json);
}
