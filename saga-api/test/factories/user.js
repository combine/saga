import User from '@models/User';
import faker from 'faker';

export const userParams = (params = {}) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  ...params
});

export default (params = {}) => {
  return User.query().insert(userParams(params));
};
