import moment from 'moment';

module.exports = {
  cookieParams: {
    secure: ['development', 'test'].indexOf(process.env.NODE_ENV) === -1,
    maxAge: moment.duration(7, 'days').asMilliseconds()
  }
};
