import { login, logout, signup, currentUser } from './auth';
import { product, updateProduct, findProducts } from './products';
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
    logout,
    signup,
    updateProduct
  }
};

export default resolvers;
