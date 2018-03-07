import Base from './Base';
import { Authenticatable, Recoverable, Tokenable } from 'objection-auth';
import Joi from 'joi';

const AuthModel = Authenticatable(Recoverable(Tokenable(Base)));
const unique = require('objection-unique')({
  fields: ['email', 'username'],
  identifiers: ['id']
});

export default class User extends unique(AuthModel) {
  static modelPaths = [__dirname];
  static tableName = 'users';
  static schema = Joi.object().keys({
    id: Joi.number().optional(),
    firstName: Joi.string()
      .alphanum()
      .min(2)
      .optional(),
    lastName: Joi.string()
      .alphanum()
      .min(2)
      .optional(),
    username: Joi.string()
      .regex(/^[a-zA-Z0-9]+([_]?[a-zA-Z0-9])*$/)
      .min(3)
      .max(30),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/),
    email: Joi.string().email(),
    role: Joi.string()
      .valid('admin', 'user')
      .default('user')
      .optional(),
    resetPasswordExp: Joi.date().optional(),
    resetPasswordToken: Joi.string().optional()
  });

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
