import { Product } from '$models';
import { raw } from 'objection';
import { first, last } from 'lodash';
import moment from 'moment';

export default async function findProducts(root, args) {
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
}
