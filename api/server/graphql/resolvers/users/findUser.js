import { User } from '@models';
import { NotFoundError } from '@graphql/errors';
import baseResolver from '../base';

export default baseResolver.createResolver(async (_, args, context) => {
  const { id, username, email } = args;

  if (!id && !username && !email) {
    throw new NotFoundError();
  }

  let user = await User.query()
    .modify(query => {
      ['id', 'username', 'email'].forEach(col => {
        if (args[col]) query.where(col, args[col]);
      });
    })
    .first();

  if (!user) {
    throw new NotFoundError();
  }

  context.userResource = user;
});
