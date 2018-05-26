import { User } from '$models';
import { isAlreadyAuthenticatedResolver } from './acl';
import { ValidationError } from '$graphql/errors';
import moment from 'moment';
import jwt from 'jsonwebtoken';

export default isAlreadyAuthenticatedResolver.createResolver(
  async (_, { usernameOrEmail, password }, { res }) => {
    const user = await User.query()
      .where('username', usernameOrEmail)
      .orWhere('email', usernameOrEmail)
      .first()
      .debug();

    if (!user) {
      throw new ValidationError({
        data: {
          errors: {
            usernameOrEmail: global.__('errors.auth.username')
          }
        }
      });
    }

    const validPassword = await user.verifyPassword(password);

    if (!validPassword) {
      throw new ValidationError({
        data: {
          errors: {
            password: global.__('errors.auth.password')
          }
        }
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const cookie = {
      secure: ['development', 'test'].indexOf(process.env.NODE_ENV) === -1,
      maxAge: moment.duration(7, 'days').asMilliseconds()
    };

    // set cookie
    res.cookie('jwt', token, cookie);

    return {
      token,
      currentUser: user.toJSON()
    };
  }
);
