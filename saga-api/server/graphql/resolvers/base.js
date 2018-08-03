import { createResolver } from 'apollo-resolvers';
import { isInstance } from 'apollo-errors';
import { UnknownError } from '@graphql/errors';
import yn from 'yn';

const baseResolver = createResolver(
  null,
  // Only mask outgoing errors that aren't already apollo-errors, such as ORM
  // errors, etc
  (root, args, context, error) => {
    if (yn(process.env.DEBUG)) {
      console.error(error);
    }
    return isInstance(error) ? error : new UnknownError();
  }
);

export default baseResolver;
