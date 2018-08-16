import findUser from './findUser';

export default findUser.createResolver(
  async (_, args, { userResource: user }) => {
    return user.toJSON();
  }
);
