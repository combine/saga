import { isAlreadyAuthenticatedResolver } from '../acl';
import { ValidationError } from '@graphql/errors';
import { cookieParams } from '@config';
import { User } from '@models';

export default isAlreadyAuthenticatedResolver.createResolver(
  async (_, { username, email, password }, { res }) => {
    const params = { username, email, password };

    try {
      const user = await User.query().insertAndFetch(params);
      const token = user.generateJWT();

      res.cookie('jwt', token, cookieParams);

      return {
        token,
        currentUser: user.toJSON()
      };
    } catch (error) {
      throw new ValidationError(error);
    }
  }
);
