import { Product } from '$models';
import { NotFoundError } from '$graphql/errors';
import baseResolver from '../base';

export default baseResolver.createResolver(
  async (_, { slug, id }, context) => {
    let product = Product.query();

    if (slug) {
      product.where('slug', slug);
    }

    if (id) {
      product.where('id', id);
    }

    product = await product.first();

    if (!product) {
      throw new NotFoundError();
    }

    context.product = product;
  }
);
