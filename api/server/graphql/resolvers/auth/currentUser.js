export default function currentUser(_, args, context) {
  if (context.user) {
    return context.user.toJSON();
  }

  return null;
}
