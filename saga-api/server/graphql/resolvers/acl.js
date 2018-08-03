import baseResolver from './base';
import {
  AuthenticatedError,
  UnauthorizedError,
  ForbiddenError
} from '@graphql/errors';

// Throws an error if the user is not authenticated
export const isAuthenticatedResolver = baseResolver.createResolver(
  (root, args, { user }) => {
    if (!user) {
      throw new UnauthorizedError();
    }
  }
);

// Throws an error is the user is already authenticated
export const isAlreadyAuthenticatedResolver = baseResolver.createResolver(
  (root, args, { user }) => {
    if (user) {
      throw new AuthenticatedError();
    }
  }
);

// Throws an error if the user is not an admin. Must also be authenticated.
export const isAdminResolver = isAuthenticatedResolver.createResolver(
  (root, args, { user }) => {
    if (!user.isAdmin()) {
      throw new ForbiddenError();
    }
  }
);

export default {
  isAuthenticatedResolver,
  isAlreadyAuthenticatedResolver,
  isAdminResolver
};
