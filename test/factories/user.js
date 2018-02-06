import { User } from 'models';
import faker from 'faker';

export const userParams = (params = {}) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  ...params
});

export default async (params = {}) => {
  return await User.query().insert(userParams(params));
};
