import Product from '$models/Product';
import { asyncWrapper } from '$middleware';
import { raw } from 'objection';
import { ApiError } from '$lib/errors';

export const index = asyncWrapper(async (req, res) => {
  let { q = '', page = 1, limit = 20 } = req.query;

  if (limit > 100) limit = 100;
  if (page < 1) page = 1;

  let products = await Product
    .query()
    .select(
      raw('*, count(*) OVER() AS fullCount')
    )
    .where(
      raw('LOWER(products.name)'), 'LIKE', `%${q.toLowerCase()}%`
    )
    .limit(limit)
    .offset(limit * (page - 1))
    .orderBy('createdAt', 'desc');

  res.send({
    products,
    meta: {
      total: products.length && parseInt(products[0].fullcount) || 0,
      page,
      limit,
      query: q
    }
  });
});

export const show = asyncWrapper(async (req, res) => {
  let { slug } = req.params;

  const product = await Product.query().where('slug', slug).first();

  if (!product) {
    throw new ApiError({ type: 'Not Found', data: 'Product not found.' });
  }

  res.send(product.toJSON());
});
