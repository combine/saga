import { map } from 'lodash';

export default class ApiError extends Error {
  static types = {
    'Bad Request': 400,
    'Unauthorized': 401,
    'Payment Required': 402,
    'Forbidden': 403,
    'Not Found': '404',
    'Unprocessable': 422
  };

  constructor({ type, message = null, statusCode = null, data = {}}) {
    super(message || dataToMessage(data));

    if (!Object.keys(this.constructor.types).includes(type)) {
      throw new Error(`Invalid error type ApiError::${type}`);
    }

    this.type = type || 'Bad Request';
    this.statusCode = statusCode || this.constructor.types[type];
    this.message = message;
    this.data = data;
  }
}

function dataToMessage(data) {
  return map(data, (val, key) => {
    return `${key}: ${val}`;
  }).join(', ');
}
