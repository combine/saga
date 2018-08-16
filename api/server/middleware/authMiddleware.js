import jwt from 'express-jwt';
import express from 'express';
import { User } from '@models';

const authMiddleware = express();

authMiddleware.use(jwt({
  // turn this off so that we can check for the user in the request object
  // inside of our graphql resolvers
  credentialsRequired: false,
  secret: process.env.JWT_SECRET,
  getToken: (req) => {
    // Extract from cookie
    if (req.cookies && req.cookies['jwt']) {
      return req.cookies['jwt'];
    }

    // Extract from headers
    if (req.headers.authorization) {
      const [type, token] = req.headers.authorization.split(' ');

      if (type === 'Bearer') {
        return token;
      }
    }

    // Extract from query string
    if (req.query && req.query.token) {
      return req.query.token;
    }

    return null;
  }
}), async (req, res, next) => {
  const { user: userJson } = req;

  // set req.user to full User object
  if (userJson) {
    const user = await User.query().where('email', userJson.email).first();
    req.user = user;
  }

  next();
});

export default authMiddleware;
