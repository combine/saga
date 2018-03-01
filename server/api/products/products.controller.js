import Product from '$models/Product';
import { asyncWrapper } from '$middleware';

export const index = asyncWrapper(async (req, res) => {
  const products = await Product.query();

  res.send(products);
});
