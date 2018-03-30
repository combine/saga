import Product from '$models/Product';
import { asyncWrapper } from '$middleware';
import { raw } from 'objection';

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
