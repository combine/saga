import { User } from '$models';
import passport from 'passport';
import { asyncWrapper } from '$middleware';

// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;
//
//   if (!email) return errorHandler.message(res, 'Email must be provided.', 422);
//
//   let err,
//     user = await User.findOne({ where: { email } });
//
//   if (!user)
//     return errorHandler.error(res, {
//       email: 'No user with that email was found.'
//     });
//
//   [err, user] = await to(user.generatePasswordResetToken());
//   if (err)
//     return errorHandler.error(res, {
//       email: 'Unable to reset password. Please contact support.'
//     });
//
//   // send email
//   new UserMailer().forgotPassword(user).send();
//
//   // All good!
//   return res.status(200).send({ success: true });
// };

// export const resetPassword = async (req, res) => {
//   const { token, password } = req.body;
//   let err, user;
//
//   // find user via token
//   const where = {
//     resetPasswordToken: token,
//     resetPasswordExp: {
//       [Op.gte]: Date.now()
//     }
//   };
//   [err, user] = await to(User.findOne({ where }));
//
//   if (!user)
//     return errorHandler.error(
//       res,
//       {
//         error: 'Could not reset your password. Your token may have expired.'
//       },
//       401
//     );
//
//   // token accepted, change the password
//   [err, user] = await to(user.update({ password }, { include: ['company'] }));
//   if (err) return errorHandler.resource(res, 'user', err);
//
//   return passportLogin(req, res, user);
// };

/** login()
 * Uses passport local authentication to authentiate a user
 */
export function login(req, res, next) {
  const { body: { email, password } } = req;

  if (!email) {
    throw new Error({
      status: 422,
      error: { user: { password: 'Missing email.' } }
    });
  }

  if (!password) {
    throw new Error({
      status: 422,
      error: { user: { password: 'Missing password.' } }
    });
  }

  return passport.authenticate('local', { session: false }, function(
    err,
    user,
    info
  ) {
    if (err) {
      return next(err);
    }

    if (user) {
      return passportLogin(req, res, user);
    } else {
      throw new Error({ status: 422, error: info });
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
  const userData = req.body;

  if (!userData) {
    throw new Error({
      status: 400,
      message: 'Unable to register, missing fields.'
    });
  }

  const { username, email, password } = userData;
  const params = { username, email, password };
  const user = await User.query().insertAndFetch(params);

  return passportLogin(req, res, user);
});

// Utility methods
function passportLogin(req, res, user) {
  return req.login(user, async function(err) {
    if (err) {
      throw new Error({ status: 422, error: err });
    } else {
      const token = await user.generateJWT(res);

      return res.status(200).json({ ...user.toJSON(), token });
    }
  });
}
