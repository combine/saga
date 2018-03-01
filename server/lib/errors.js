export default (error, req, res) => {
  return res.json({ error: error.message });
};
