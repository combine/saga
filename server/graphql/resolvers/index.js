import { login, logout, currentUser } from './auth';
import { product, findProducts } from './products';
import { user } from './users';

const resolvers = {
  Query: {
    currentUser,
    user,
    product,
    findProducts
  },
  Mutation: {
    login,
    logout
  }
};

export default resolvers;
