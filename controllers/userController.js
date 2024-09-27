const Joi = require('joi');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//validation
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

//token
const generateToken = (getId) => {
  return jwt.sign({ getId }, 'DEFAULT_SECRET_KEY', {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = registerSchema.validate({ name, email, password });

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  try {
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return res
        .status(400)
        .json({ success: false, message: 'user email already exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ name, email, password: hashedPassword });

    if (user) {
      const token = generateToken(user?._id);
      res.cookie('token', token, {
        withCredentials: true,
        httpOnly: false,
      });

      return res.status(201).json({
        success: true,
        message: 'User created successfully',
        userData: {
          name: user.name,
          email: user.email,
          _id: user._id,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  try {
    const getUser = await User.findOne({ email });
    // console.log('getUser', getUser)
    if (!getUser) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect email/password' });
    }

    const confirmPassword = await bcrypt.compare(password, getUser.password);
    if (!confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect email/password' });
    }

    const token = generateToken(getUser?._id);
    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: false,
    });

    return res.status(201).json({
      success: true,
      message: 'User logged in',
      data: getUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

const logout = async (req, res) => {
  res.cookie('token', '', {
    withCredentials: true,
    httpOnly: false,
  });

  return res.status(200).json({
    success: true,
    message: 'Logout successfully',
  });
};

module.exports = { createUser, loginUser, logout };
