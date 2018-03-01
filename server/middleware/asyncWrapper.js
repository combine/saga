// Route any caught exceptions to error handling middleware
const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncMiddleware;
