const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { success, error } = require('../utils/response');

function generateToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}

exports.register = async (req, res) => {
  try {
    const { username, email, password, displayName } = req.body;
    if (!username || !password) return error(res, 'username and password are required', 400);

    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) return error(res, 'User already exists', 400);

    const user = new User({ username, email, password, displayName });
    await user.save();

    const token = generateToken(user);
    return success(res, { token, user: { id: user._id, username: user.username, email: user.email, displayName: user.displayName } }, 'Registered', 201);
  } catch (err) {
    console.error(err);
    return error(res, 'Registration failed', 500);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return error(res, 'username and password are required', 400);

    const user = await User.findOne({ username });
    if (!user) return error(res, 'Invalid credentials', 401);

    const match = await user.comparePassword(password);
    if (!match) return error(res, 'Invalid credentials', 401);

    const token = generateToken(user);
    return success(res, { token, user: { id: user._id, username: user.username, email: user.email, displayName: user.displayName } }, 'Logged in', 200);
  } catch (err) {
    console.error(err);
    return error(res, 'Login failed', 500);
  }
};
