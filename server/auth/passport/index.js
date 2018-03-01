import passport from 'passport';
import { User } from '$models';

module.exports = (app => {
  require('./strategies');

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.query().where('id', id);
    done(null, user);
  });

  app.use(passport.initialize());
  app.use(passport.session());

  return app;
});
