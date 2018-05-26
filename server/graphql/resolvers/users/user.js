import { User } from '$models';

export default function user(_, args) {
  return User.query()
    .where(args)
    .first();
}
