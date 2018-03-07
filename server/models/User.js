import Base from './Base';
import { Authenticatable, Recoverable, Tokenable } from 'objection-auth';
import { omit } from 'lodash';
import Joi from 'joi';

// 7 days
export const JWT_EXPIRATION = 604800;

const AuthModel = Authenticatable(Recoverable(Tokenable(Base, {
  expiresIn: JWT_EXPIRATION
})));

const UniqueAuthModel = require('objection-unique')({
  fields: ['email', 'username'],
  identifiers: ['id']
})(AuthModel);

export default class User extends UniqueAuthModel {
  static modelPaths = [__dirname];
  static tableName = 'users';
  static schema = Joi.object().keys({
    id: Joi.number().optional(),
    firstName: Joi.string()
      .min(2)
      .optional(),
    lastName: Joi.string()
      .min(2)
      .optional(),
    username: Joi.string()
      .regex(/^[a-zA-Z0-9]+([_]?[a-zA-Z0-9])*$/)
      .min(3)
      .max(30),
    password: Joi.string().min(8).max(64),
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

  hasRole = (role) => {
    return role === this.role;
  }

  $formatJson(json) {
    json = super.$parseJson(json);

    // strip out unwanted stuff like password
    return omit(json, ['password']);
  }
}
