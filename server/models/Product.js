import Base from './Base';

export default class Product extends Base {
  static tableName = 'products';
  static jsonSchema = {
    type: 'object',
    required: ['name'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string', minLength: 1, maxLength: 255 },
      description: { type: ['string', 'null'] }
    }
  };
}
