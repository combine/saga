import Base from './Base';
import Variant from './Variant';
import slugify from 'objection-slugify';
import * as yup from 'yup';
import productSchema from '@models/schemas/product';

const slugged = slugify({
  sourceField: 'name',
  unique: true,
  update: false
});

export default class Product extends slugged(Base) {
  static tableName = 'products';
  static idColumn = 'id';
  static yupSchema = productSchema.concat(
    yup.object().shape({
      id: yup.number().integer(),
      slug: yup.string(),
      updatedAt: yup.date(),
      createdAt: yup.date()
    })
  );

  static relationMappings = {
    master: {
      relation: Base.BelongsToOneRelation,
      modelClass: Variant,
      join: {
        from: 'variants.productId',
        to: 'products.id'
      },
      modify: (query) => {
        return query.where('isMaster', true);
      }
    },
    variants: {
      relation: Base.HasManyRelation,
      modelClass: Variant,
      join: {
        from: 'products.id',
        to: 'variants.productId'
      },
      modify: (query) => {
        return query.where('isMaster', false);
      }
    }
  };

  async $afterInsert(queryContext) {
    await super.$afterInsert(queryContext);

    return this.createMaster();
  }

  createMaster() {
    return this.$relatedQuery('variants').insert({
      isMaster: true
    });
  }
}
