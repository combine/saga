import { Product } from '@models';
import { NotFoundError } from '@graphql/errors';
import baseResolver from '../base';

export default baseResolver.createResolver(async (_, args, context) => {
  const { slug, id } = args;

  if (!slug && !id) {
    throw new NotFoundError();
  }

  let product = await Product.query()
    .modify(query => {
      ['id', 'slug'].forEach(col => {
        if (args[col]) query.where(col, args[col]);
      });
    })
    .first();

  if (!product) {
    throw new NotFoundError();
  }

  context.product = product;
});
