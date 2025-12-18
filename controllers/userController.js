const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Helper: generate JWT
function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}

// ✅ Signup (POST /api/user/signup)
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.json({ code: 400, message: 'Missing required fields', body: null });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.json({ code: 400, message: 'User already exists', body: null });
    }

    const user = new User({
      username,
      email,
      password,
      guapBalance: 0 // default
    });
    await user.save();

    const token = generateToken(user._id);

    return res.json({
      code: 200,
      message: 'Signup successful',
      body: {
        token,
        userInfo: {
          _id: user._id,
          email: user.email,
          username: user.username,
          password: '', // don’t send password
        }
      }
    });
  } catch (error) {
    console.error(error);
    return res.json({ code: 500, message: 'Signup failed', body: null });
  }
};

// ✅ Login (POST /api/user/login)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ code: 400, message: 'Missing email or password', body: null });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ code: 401, message: 'Invalid credentials', body: null });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ code: 401, message: 'Invalid credentials', body: null });
    }

    const token = generateToken(user._id);

    return res.json({
      code: 200,
      message: 'Login successful',
      body: {
        token,
        _id: user._id,
        firstName: user.username, // Photon nickname in Unity
        user: {
          username: user.username,
          email: user.email,
          guapBalance: user.guapBalance ?? 0,
          password: '' // blank for safety
        }
      }
    });
  } catch (error) {
    console.error(error);
    return res.json({ code: 500, message: 'Login failed', body: null });
  }
};
