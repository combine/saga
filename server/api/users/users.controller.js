import { User } from '$models/index';

export const show = async (req, res) => {
  const user = await User
    .query()
    .where('id', req.params.id)
    .eager('favorites');

  res.send(user);
};
