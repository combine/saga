import Base from './Base';
import { Authenticatable, Recoverable, Tokenable } from 'objection-auth';

const AuthModel = Authenticatable(Recoverable(Tokenable(Base)));

export default class User extends AuthModel {
  static modelPaths = [__dirname];
  static tableName = 'users';
  static jsonSchema = {
    type: 'object',
    required: ['username', 'email', 'password'],

    properties: {
      id: { type: 'integer' },
      firstName: { type: 'string', minLength: 1, maxLength: 255 },
      lastName: { type: 'string', minLength: 1, maxLength: 255 },
      username: { type: 'string', minLength: 1, maxLength: 255 },
      email: { type: 'string', minLength: 3, maxLength: 255 },
      password: { type: 'string', minLength: 3, maxLength: 255 },
      resetPasswordToken: { type: 'string', minLength: 20, maxLength: 255 },
      resetPasswordExp: { type: 'string', format: 'date-time' }
    }
  };

  static relationMappings = {
    favorites: {
      relation: Base.ManyToManyRelation,
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
