import { createError } from 'apollo-errors';

export const UnknownError = createError('UnknownError', {
  message: 'An unknown error has occurred.'
});

export const UnauthorizedError = createError('UnauthorizedError', {
  message: 'You must be logged in to do that.'
});

export const AuthenticatedError = createError('AuthenticatedError', {
  message: 'You already logged in.'
});

export const ForbiddenError = createError('ForbiddenError', {
  message: 'Access forbidden.'
});

export const ValidationError = createError('ValidationError', {
  message: 'There was a validation error with some of the data.',
  options: {
    showPath: true
  }
});

export const NotFoundError = createError('NotFoundError', {
  message: 'Could not find the requested resource.'
});
