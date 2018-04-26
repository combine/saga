import Base from './Base';
import { compose } from 'objection';
import { Authenticatable, Recoverable, Tokenable } from 'objection-auth';
import { omit } from 'lodash';
import { patchOptional } from '@schemas/lib';
import userSchema from '@schemas/user';
import Unique from 'objection-unique';
import yup from 'yup';

// 7 days (in minutes)
export const JWT_EXPIRATION = 10800;

// 1 hour
export const RECOVERABLE_EXPIRATION = 60;

const mixins = compose(
  Unique({
    fields: ['email', 'username'],
    identifiers: ['id']
  }),
  Authenticatable({ passwordField: 'password' }),
  Recoverable({
    tokenField: 'resetPasswordToken',
    tokenExpField: 'resetPasswordExp',
    expiresIn: RECOVERABLE_EXPIRATION
  }),
  Tokenable({
    expiresIn: JWT_EXPIRATION,
    secretOrPrivateKey: process.env.SECRET_TOKEN
  })
);

export default class User extends mixins(Base) {
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

  isAdmin = () => {
    return this.hasRole('admin');
  };

  $formatJson(json) {
    json = super.$parseJson(json);

    // strip out unwanted stuff like password
    return omit(json, ['password']);
  }
}
