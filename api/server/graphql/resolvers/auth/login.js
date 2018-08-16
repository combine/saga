import { User } from '@models';
import { isAlreadyAuthenticatedResolver } from '../acl';
import { ValidationError } from '@graphql/errors';
import { cookieParams } from '@config';

export default isAlreadyAuthenticatedResolver.createResolver(
  async (_, { usernameOrEmail, password }, { res }) => {
    const user = await User.query()
      .where('username', usernameOrEmail)
      .orWhere('email', usernameOrEmail)
      .first();

    if (!user) {
      throw new ValidationError({
        data: {
          usernameOrEmail: [{ message: global.__('errors.auth.username') }]
        }
      });
    }

    const validPassword = await user.verifyPassword(password);

    if (!validPassword) {
      throw new ValidationError({
        data: {
          password: [{ message: global.__('errors.auth.password') }]
        }
      });
    }

    const token = user.generateJWT();

    // set cookie
    res.cookie('jwt', token, cookieParams);

    return {
      token,
      currentUser: user.toJSON()
    };
  }
);
