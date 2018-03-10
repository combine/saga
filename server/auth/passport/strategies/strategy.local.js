import LocalStrategy from 'passport-local';
import { User } from '$models';

const callback = async function(username, password, done) {
  try {
    const user = await User.query()
      .where('username', username)
      .first();

    if (!user) {
      return done(null, null, {
        username: [{
          message: global.__('errors.auth.username')
        }]
      });
    }

    const validPassword = await user.verifyPassword(password);

    if (!validPassword) {
      return done(null, null, {
        password: [{ message: global.__('errors.auth.password') }]
      });
    }

    // success!
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

export default new LocalStrategy({ usernameField: 'username' }, callback);
