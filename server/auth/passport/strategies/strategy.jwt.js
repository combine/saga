import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '$models';

const opts = {
  jwtFromRequest: (req) => {
    if (req && req.cookies && req.cookies['jwt']) {
      return req.cookies['jwt'];
    } else {
      return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    }
  },
  secretOrKey: process.env.SECRET_TOKEN || 'secret'
};

export default new Strategy(opts, async function(payload, done) {
  try {
    const user = await User.query().where('id', payload.id).first();

    if (user) {
      return done(null, user);
    } else {
      return done(null, null, { message: 'User not found.' });
    }
  } catch (err) {
    return done(err);
  }
});
