const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. Missing token.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'foodflow-super-secret-key-change-me');
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. Invalid token.',
    });
  }
};

const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Access denied for this role.',
    });
  }

  return next();
};

module.exports = {
  protect,
  authorizeRoles,
};
