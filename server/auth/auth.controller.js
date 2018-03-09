import passport from 'passport';
import { asyncWrapper } from '$middleware';
import User, { JWT_EXPIRATION } from '$models/User';
import { ApiError } from '$lib/errors';

/** login()
 * Uses passport local authentication to authentiate a user
 */
export function login(req, res, next) {
  const opts = { session: false };

  return passport.authenticate('local', opts, function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (user) {
      return passportLogin(req, res, user);
    } else {
      throw new ApiError({ type: 'Unauthorized', data: info });
    }
  })(req, res, next);
}

/** logout()
 * Deletes the user's JWT cookie.
 */
export function logout(req, res) {
  res.clearCookie('jwt');
  res.status(200).send({ success: true });
}

/** signup()
 * @param {Object} user: the user form data such as email, password, etc.
 */
export const signup = asyncWrapper(async function signup(req, res) {
  const { username, email, password } = req.body;
  const params = { username, email, password };
  const user = await User.query().insertAndFetch(params);

  return passportLogin(req, res, user);
});

// Utility methods
function passportLogin(req, res, user) {
  return req.login(user, async function(err) {
    if (err) {
      throw new ApiError({ type: 'Unprocessable', data: err });
    } else {
      const currTime = new Date();
      const exp = new Date(currTime.getTime() + JWT_EXPIRATION * 1000);
      const token = await user.generateJWT();
      const cookie = {
        secure: ['development', 'test'].indexOf(process.env.NODE_ENV) === -1,
        maxAge: exp.getTime()
      };

      // set cookie
      res.cookie('jwt', token, cookie);

      return res.status(200).json({ ...user.toJSON(), token });
    }
  });
}
