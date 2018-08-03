import * as auth from './auth';
import * as products from './products';
import * as users from './users';

export default {
  Query: {
    ...auth.queries,
    ...users.queries,
    ...products.queries
  },
  Mutation: {
    ...auth.mutations,
    ...products.mutations
  }
};
