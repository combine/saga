import yup from 'yup';

export default yup.object().shape({
  productId: yup.number().integer(),
  isMaster: yup.boolean().default(false),
  priceInCents: yup.number().integer().default(0),
  sku: yup.string(),
  barcode: yup.string(),
  options: yup.string()
});
