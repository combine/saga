import Base from './Base';
import { Slugify } from 'objection-slugify';

const SluggedModel = Slugify(Base, { sourceField: 'name', unique: true });

export default class Product extends SluggedModel {
  static tableName = 'products';
  static jsonSchema = {
    type: 'object',
    required: ['name'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string', minLength: 1, maxLength: 255 },
      slug: { type: 'string', minLength: 1, maxLength: 255 },
      description: { type: ['string', 'null'] }
    }
  };
}
