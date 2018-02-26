import Product from '$models/Product';

export const index = async (req, res) => {
  const products = await Product.query();
  res.send(products);
};
