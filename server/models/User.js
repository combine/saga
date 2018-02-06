import { Model } from 'objection';
import { Authenticatable, Recoverable } from 'objection-auth';

const AuthModel = Recoverable(Authenticatable(Model));

export default class User extends AuthModel {
  static modelPaths = [__dirname];
  static tableName = 'users';
  static jsonSchema = {
    type: 'object',
    required: ['firstName', 'lastName', 'password'],

    properties: {
      id: { type: 'integer' },
      firstName: { type: 'string', minLength: 1, maxLength: 255 },
      lastName: { type: 'string', minLength: 1, maxLength: 255 },
      email: { type: 'string', minLength: 3, maxLength: 255 },
      password: { type: 'string', minLength: 3, maxLength: 255 }
    }
  };

  static relationMappings = {
    favorites: {
      relation: Model.ManyToManyRelation,
      modelClass: 'Product',
      join: {
        from: 'users.id',
        through: {
          from: 'favorites.userId',
          to: 'favorites.productId'
        },
        to: 'products.id'
      }
    }
  };
}
