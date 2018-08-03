import Base from './Base';
import { compose } from 'objection';
import { Authenticatable, Recoverable } from 'objection-auth';
import { omit } from 'lodash';
import { patchOptional } from '@models/schemas/lib';
import jwt from 'jsonwebtoken';
import userSchema from '@models/schemas/user';
import Unique from 'objection-unique';
import * as yup from 'yup';

const mixins = compose(
  Unique({
    fields: ['email', 'username'],
    identifiers: ['id']
  }),
  Authenticatable({ passwordField: 'password' }),
  Recoverable({
    tokenField: 'resetPasswordToken',
    tokenExpField: 'resetPasswordExp'
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

  generateJWT = () => {
    return jwt.sign(
      { id: this.id, email: this.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
  };

  $formatJson(json) {
    json = super.$parseJson(json);

    // strip out unwanted stuff like password
    return omit(json, ['password']);
  }
}
