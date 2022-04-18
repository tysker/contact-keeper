const jwt = require('jsonwebtoken');

const config = require('config'); // https://www.npmjs.com/package/config
const secret = config.get('jwtSecret');

// Writing middleware for use in Express apps
// Middleware functions are functions that have access to the request object (req), the response object (res), and the next function.
// https://expressjs.com/en/guide/writing-middleware.html
module.exports = function (req, res, next) {
  // get token from the header
  const token = req.header('x-auth-token');
  console.log('token:', token);
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    console.log('decoded:', decoded);

    // add user to the request object
    req.user = decoded.user;
    console.log('Decoded User: ', decoded.user);
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
