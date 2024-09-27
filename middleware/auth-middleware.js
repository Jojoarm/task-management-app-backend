const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuthVerification = async (req, res) => {
  console.log('request', req);
  const token = req.cookies.token;
  console.log(token, 'token');

  if (!token) {
    return res.json({
      success: false,
      message: 'Token is not available or Invalid token',
    });
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      const userInfo = await User.findById(decoded.getId);

      if (userInfo) {
        return res.status(200).json({
          success: true,
          userInfo,
        });
      }
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }
  }
};

module.exports = userAuthVerification;
