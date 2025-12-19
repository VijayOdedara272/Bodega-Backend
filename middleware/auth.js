const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { error } = require('../utils/response');

module.exports = async function(req, res, next) {
  // const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  // if (!authHeader) return error(res, 'No authorization header', 401);

  // const parts = authHeader.split(' ');
  // if (parts.length !== 2 || parts[0] !== 'Bearer') return error(res, 'Invalid authorization header', 401);

  // const token = parts[1];

  // try {
  //   const payload = jwt.verify(token, process.env.JWT_SECRET);
  //   // attach user id to req
  //   req.user = { id: payload.id };
  //   // optionally fetch user from DB
  //   req.currentUser = await User.findById(payload.id).select('-password');
  //   next();
  // } catch (err) {
  //   return error(res, 'Invalid or expired token', 401);
  // }
  req.user = { id: "6916ad6f66229a11b6d7b720" };
    // optionally fetch user from DB
    req.currentUser = await User.findById("6916ad6f66229a11b6d7b720").select('-password');
    next();
};
