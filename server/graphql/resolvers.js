import { User, Product } from '$models';

const resolvers = {
  Query: {
    user(root, args) {
      return User.query().where(args).first();
    },
    allProducts() {
      return Product.query();
    }
  },
  User: {},
  Product: {
    variants(product) {
      return product.$relatedQuery('variants');
    }
  }
};

export default resolvers;
