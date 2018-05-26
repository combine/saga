import { Product } from '$models';

export default function product(_, args) {
  return Product.query()
    .where(args)
    .first();
}
