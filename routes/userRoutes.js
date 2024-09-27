const express = require('express');
const {
  createUser,
  loginUser,
  logout,
} = require('../controllers/userController');
const userAuthVerification = require('../middleware/auth-middleware');

const userRouter = express.Router();

userRouter.post('/register', createUser);
userRouter.post('/login', loginUser);
userRouter.post('/auth', userAuthVerification);
userRouter.post('/logout', logout);

module.exports = userRouter;
