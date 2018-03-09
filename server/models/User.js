import Base from './Base';
import { Authenticatable, Recoverable, Tokenable } from 'objection-auth';
import { omit } from 'lodash';
import userSchema from '@schemas/user';
import { patchOptional } from '@schemas/lib';
import yup from 'yup';

// 7 days
export const JWT_EXPIRATION = 604800;

const AuthModel = Authenticatable(
  Recoverable(
    Tokenable(Base, {
      expiresIn: JWT_EXPIRATION
    })
  )
);

const UniqueAuthModel = require('objection-unique')({
  fields: ['email', 'username'],
  identifiers: ['id']
})(AuthModel);

export default class User extends UniqueAuthModel {
  static modelPaths = [__dirname];
  static tableName = 'users';
  static yupSchema = userSchema.concat(
    yup.object().shape({
      id: yup.number().integer(),
      role: yup
        .string()
        .oneOf(['admin', 'user'])
        .default('user')
        .required()
        .when('$patch', patchOptional),
      resetPasswordExp: yup.date(),
      resetPasswordToken: yup.string()
    })
  );

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

  hasRole = role => {
    return role === this.role;
  };

  $formatJson(json) {
    json = super.$parseJson(json);

    // strip out unwanted stuff like password
    return omit(json, ['password']);
  }
}
