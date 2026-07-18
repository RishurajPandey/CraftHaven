const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const normalizedEmail = (email || '').trim().toLowerCase();

    if (!name || !normalizedEmail || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
      return;
    }

    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      res.status(400).json({
        success: false,
        message: 'User already exists'
      });
      return;
    }

    const user = await User.create({ name, email: normalizedEmail, password, role });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: 'A user with this email already exists.'
      });
      return;
    }
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = (email || '').trim().toLowerCase();

    if (!normalizedEmail || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
      return;
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user || !(await user.matchPassword(password))) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
