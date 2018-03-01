import glob from 'glob';
import passport from 'passport';

// Require and use all strategy files.
glob.sync('./strategy.*.js', { cwd: __dirname }).forEach(function(file) {
  passport.use(require(file).default);
});
