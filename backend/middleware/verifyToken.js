const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      console.warn(`[auth] rejected ${req.method} ${req.originalUrl}: missing bearer token`);
      return res.status(401).json({ err: 'Invalid token.' });
    }
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    console.log(`[auth] accepted ${req.method} ${req.originalUrl} user=${req.user._id}`);
    next();
  } catch (err) {
    console.warn(`[auth] rejected ${req.method} ${req.originalUrl}: invalid or expired token`);
    res.status(401).json({ err: 'Invalid token.' });
  }
}

module.exports = verifyToken;
