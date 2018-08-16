import Base from './Base';
import * as yup from 'yup';
import variantSchema from '@models/schemas/variant';
import Monetize from './plugins/monetize';

const monetize = Monetize({ price: 'priceInCents' });

export default class Variant extends monetize(Base) {
  static tableName = 'variants';
  static idColumn = 'id';
  static jsonAttributes = ['options'];
  static yupSchema = variantSchema.concat(yup.object().shape({
    id: yup.number().integer(),
    updatedAt: yup.date(),
    createdAt: yup.date()
  }));

  static relationMappings = {
    product: {
      relation: Base.BelongsToOneRelation,
      modelClass: __dirname + '/Product',
      join: {
        from: 'variants.product_id',
        to: 'products.id'
      }
    }
  };
}
