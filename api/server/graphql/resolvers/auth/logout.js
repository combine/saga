export default function logout(_, args, { res }) {
  res.clearCookie('jwt');
  return { success: true };
}
