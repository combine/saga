export default (req, res, next) => {
  res.contentType('application/json');
  next();
};
