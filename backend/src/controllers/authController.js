const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { createNotification } = require('../services/notificationService');

// Helper to generate JWT token
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'samadhan_connect_jwt_super_secret_key_jharkhand_2026_sih',
    {
      expiresIn: process.env.JWT_EXPIRE || '30d'
    }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role = 'citizen',
      phone,
      location,
      bio,
      skills,
      university,
      organization,
      profileImage
    } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role,
      phone: phone || '',
      location: location || 'Ranchi, Jharkhand',
      bio: bio || '',
      skills: Array.isArray(skills) ? skills : typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : [],
      university: university || '',
      organization: organization || '',
      profileImage: profileImage || ''
    });

    const token = generateToken(user._id, user.role);

    // Welcome notification
    await createNotification({
      user: user._id,
      title: 'Welcome to Samadhan Connect!',
      message: `Hello ${user.name}, thank you for joining Jharkhand's collaborative innovation platform as a ${user.role}.`,
      type: 'success'
    });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: userObj
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    // Find user by email with password included
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user._id, user.role);

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: userObj
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get currently logged in user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      message: 'User profile retrieved successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear token response
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: 'User logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  logout
};
