const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');

exports.authenticate = (req, res, next) => {
  const auth = req.headers.authorization;
  
  if (auth) {
    const BEARER = 'BEARER';
    const [ scheme, token ] = auth.split(' ');

    if (scheme.toUpperCase() === BEARER && token) {
      jwt.verify(token, jwtSecret, (error, decoded) => {
        if (error) {
          res.status(401).json({
            message: "Token could not be verified.",
            success: false
          });
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      res.status(401).json({
        message: "Scheme is invalid or token is missing.",
        success: false
      });
    }
  } else {
    res.status(401).json({
      message: "Authorization header is missing.",
      success: false
    });
  }
};

exports.generateToken = load => {
  const options = {
    expiresIn: '1hr'
  };

  return jwt.sign(load, jwtSecret, options);
};