const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs'); // https://www.npmjs.com/package/bcryptjs
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator'); //https://express-validator.github.io/docs/

const config = require('config'); // https://www.npmjs.com/package/config
const secret = config.get('jwtSecret');

const User = require('../models/User.js');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  body('name', 'Please add name').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Please enter a password 6 or more characters').isLength({
    min: 6,
  }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // get user object from body
    const { name, email, password, role} = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name, // this is the same as writing name: name
        email,
        password,
        role
      });

      // Password encryption. The 10 is default. It tells how secure the salt is.
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      // save object to database
      await user.save();

      // Json Web Token
      const payload = {
        user: {
          id: user.id,
          role: user.role
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
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
