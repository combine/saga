import { createResolver } from 'apollo-resolvers';
import { isInstance } from 'apollo-errors';
import { UnknownError } from '$graphql/errors';

const baseResolver = createResolver(
  null,
  // Only mask outgoing errors that aren't already apollo-errors, such as ORM
  // errors, etc
  (root, args, context, error) => {
    console.log(error);
    return isInstance(error) ? error : new UnknownError();
  }
);

export default baseResolver;
