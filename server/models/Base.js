import { Model } from 'objection';

export default class Base extends Model {
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
