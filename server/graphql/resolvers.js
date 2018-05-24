import { User, Product } from '$models';
import { raw } from 'objection';
import { first, last } from 'lodash';
import moment from 'moment';
import jwt from 'jsonwebtoken';

const resolvers = {
  Query: {
    // currentUser
    currentUser(_, args, context) {
      if (context.user) {
        return context.user.toJSON();
      }

      return null;
    },

    // authentication
    async login(_, { usernameOrEmail, password }, { res }) {
      const user = await User.query()
        .where('username', usernameOrEmail)
        .orWhere('email', usernameOrEmail)
        .first()
        .debug();

      if (!user) {
        throw new Error(global.__('errors.auth.username'));
      }

      const validPassword = await user.verifyPassword(password);

      if (!validPassword) {
        throw new Error(global.__('errors.auth.password'));
      }

      const token = jwt.sign({
        id: user.id,
        email: user.email
      }, process.env.JWT_SECRET, { expiresIn: '7d' });

      const cookie = {
        secure: ['development', 'test'].indexOf(process.env.NODE_ENV) === -1,
        maxAge: moment.duration(7, 'days').asMilliseconds()
      };

      // set cookie
      res.cookie('jwt', token, cookie);

      return token;
    },

    user(_, args) {
      return User.query()
        .where(args)
        .first();
    },

    product(_, args) {
      return Product.query()
        .where(args)
        .first();
    },

    async findProducts(root, args) {
      const { after = null, count = 15, query } = args;

      let q = Product.query()
        .select(raw('*, count(*) OVER() AS fullCount'))
        .where(raw('LOWER(products.name)'), 'LIKE', `%${query.toLowerCase()}%`)
        .limit(count)
        .orderBy('updatedAt', 'desc');

      if (after) {
        q = q.where('createdAt', '>', moment(after).format());
      }

      const products = await q;

      return {
        products,
        meta: {
          total: (() => {
            const p = first(products);
            return (p && parseInt(p.fullcount)) || 0;
          })(),
          after: (() => {
            const p = last(products);
            return p && moment(p.createdAt).unix();
          })(),
          count,
          q: query
        }
      };
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
