module.exports = function (req, res, next) {
  // Status code of 401 is Unauthorized
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  // A okay
  next();
};
