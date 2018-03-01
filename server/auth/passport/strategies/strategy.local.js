import LocalStrategy from 'passport-local';
import { User } from '$models';

const callback = async function(email, password, done) {
  try {
    const user = await User.query.where('email', email);

    if (!user) {
      return done(null, null, {
        user: { email: 'Invalid username or email.' }
      });
    }

    const validPassword = await user.validatePassword(password);

    if (!validPassword) {
      return done(null, null, { user: { password: 'Incorrect password.' } });
    }

    // success!
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

export default new LocalStrategy({ usernameField: 'email' }, callback);
