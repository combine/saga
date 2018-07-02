import Base from './Base';
import yup from 'yup';

export default class OptionType extends Base {
  static tableName = 'option_types';
  static idColumn = 'id';
  static yupSchema = yup.object().shape({
    id: yup.number().integer(),
    name: yup.string(),
    values: yup.string(),
    createdAt: yup.date(),
    updatedAt: yup.date()
  });

  static relationMappings = {
    product: {
      relation: Base.BelongsToOneRelation,
      modelClass: 'Product',
      join: {
        from: 'option_types.productId',
        to: 'products.id'
      }
    }
  };
}
