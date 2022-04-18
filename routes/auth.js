const express = require('express');
const cors = require('cors');
const { CORS_OPTIONS } = require('../middleware/cors');
const router = express.Router();
router.use(cors(CORS_OPTIONS));

const bcrypt = require('bcryptjs'); // https://www.npmjs.com/package/bcryptjs
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator'); //https://express-validator.github.io/docs/

const config = require('config'); // https://www.npmjs.com/package/config
const secret = config.get('jwtSecret');

const User = require('../models/User.js');

// @route   GET api/auth
// @desc    Get logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // rq.user.id was added in middleware/auth.js
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Login: Auth user & get token
// @access  Public
router.post(
  '/',
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // Json Web Token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        secret,
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
